import os
import librosa
import numpy as np
import matplotlib.pyplot as plt
from pydub import AudioSegment

# 그래프에서 한국어 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'

# 오디오 파일을 로드하는 함수
def load_audio(audio_path):
    # 오디오 파일 로드, y는 오디오 타임 시리즈, sr은 샘플링 레이트
    y, sr = librosa.load(audio_path, sr=None)
    return y, sr

# 오디오 파일에서 온셋(박자 시작점)을 추출하는 함수
def extract_onsets(y, sr):
    # 온셋 강도(에너지) 계산
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    # 온셋(박자 시작점) 검출
    onsets = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, units='time')
    return onsets, onset_env

# 원본 온셋과 커버 온셋을 비교하여 차이를 계산하는 함수
def compare_onsets(onsets_original, onsets_cover, threshold=0.1):
    differences = []  # 온셋 차이 리스트
    diff_status = []  # 온셋 상태 리스트 ('good', 'bad', 'early', 'late')
    
    for onset in onsets_original:
        # 커버 온셋이 없으면 무조건 bad로 처리
        if len(onsets_cover) == 0:
            differences.append(threshold + 1)
            diff_status.append('bad')
            continue

        # 원본 온셋에 가장 가까운 커버 온셋을 찾고 차이를 계산
        closest_onset = min(onsets_cover, key=lambda x: abs(x - onset))
        difference = closest_onset - onset

        # 차이가 threshold보다 크면 'bad', 작으면 'good'으로 분류
        if abs(difference) > threshold:
            differences.append(difference)
            if difference > 0:
                diff_status.append('late')
            else:
                diff_status.append('early')
        else:
            differences.append(difference)
            diff_status.append('good')
    
    # 'good'과 'bad' 개수 계산
    good_count = sum(1 for diff in differences if abs(diff) <= threshold)
    bad_count = len(differences) - good_count

    # 점수 계산
    score = {
        'good': good_count,
        'bad': bad_count,
        'accuracy': good_count / len(differences) * 100  # 정확도 계산
    }

    return differences, diff_status, score

# 음절 구분을 위한 에너지 기반 경계 추출 함수
def extract_syllable_boundaries(y, sr, hop_length=512, frame_length=2048):
    # STFT와 RMS 에너지 계산
    S = np.abs(librosa.stft(y, n_fft=frame_length, hop_length=hop_length))
    rms = librosa.feature.rms(S=S)[0]
    
    # 음절 경계를 찾기 위해 집합적으로 세그먼트 분할
    boundaries = librosa.segment.agglomerative(rms.reshape(1, -1), k=int(len(rms) // 50))
    times = librosa.times_like(rms, sr=sr, hop_length=hop_length)
    
    syllable_boundaries = []  # 음절 경계 리스트
    for i in range(len(boundaries) - 1):
        start = times[boundaries[i]]
        end = times[boundaries[i + 1] - 1]
        syllable_boundaries.append((start, end))
    
    return syllable_boundaries

# 틀린 구간을 합치는 함수 정의
def merge_bad_segments(syllable_boundaries, onsets_original, diff_status, merge_tolerance=0.5):
    bad_segments = []  # 틀린 구간 리스트
    current_start = None  # 현재 구간 시작점
    current_end = None  # 현재 구간 끝점

    for start, end in syllable_boundaries:
        # 온셋 상태가 'bad'인 경우 구간 병합
        if any(onset >= start and onset <= end for onset, status in zip(onsets_original, diff_status) if status in ['bad', 'early', 'late']):
            if current_start is None:
                current_start = start
                current_end = end
            else:
                # 현재 구간과 인접하면 병합
                if start - current_end <= merge_tolerance:
                    current_end = end
                else:
                    bad_segments.append((current_start, current_end))
                    current_start = start
                    current_end = end
        else:
            if current_start is not None:
                bad_segments.append((current_start, current_end))
                current_start = None
                current_end = None

    # 마지막 구간 추가
    if current_start is not None:
        bad_segments.append((current_start, current_end))

    # 추가된 코드: 인접한 구간을 다시 한번 확인하여 병합
    merged_segments = []
    current_start = None
    current_end = None

    for start, end in bad_segments:
        if current_start is None:
            current_start = start
            current_end = end
        else:
            if start - current_end <= merge_tolerance:
                current_end = end
            else:
                merged_segments.append((current_start, current_end))
                current_start = start
                current_end = end

    if current_start is not None:
        merged_segments.append((current_start, current_end))

    return merged_segments

# 틀린 구간을 잘라서 저장하는 함수
def save_bad_segments(audio_path, bad_segments, output_dir, output_prefix, padding=3.0):
    # 폴더 생성
    os.makedirs(output_dir, exist_ok=True)
    
    # 오디오 파일 로드
    audio = AudioSegment.from_wav(audio_path)
    for i, (start, end) in enumerate(bad_segments):
        # 시작 시간 (밀리초), 0보다 작을 수 없음
        start_ms = max((start - (padding - 1.25)) * 1000, 0)
        # 끝 시간 (밀리초), 오디오 길이를 초과할 수 없음
        end_ms = min((end + padding) * 1000, len(audio))
        # 오디오 구간 잘라내기
        segment = audio[start_ms:end_ms]
        # 잘라낸 구간 저장
        segment.export(os.path.join(output_dir, f"{output_prefix}_bad_segment_{i+1}.wav"), format="wav")

# 온셋 차이를 그래프로 시각화하는 함수
def plot_onset_differences(y_original, sr_original, onsets_original, bad_segments, diff_status):
    plt.figure(figsize=(15, 5))  # 그래프 크기 설정
    
    # 시간 축 생성
    time = np.linspace(0, len(y_original) / sr_original, num=len(y_original))
    # 원본 음원의 파형 표시
    plt.plot(time, y_original, label='원본 음원', color='blue', alpha=0.6)

    # 온셋 차이가 나는 부분을 범위로 표시
    for start, end in bad_segments:
        plt.axvspan(start, end, color='red', alpha=0.5, label='차이 나는 부분' if start == bad_segments[0][0] else "")

    # 온셋 상태에 따라 표시 (틀린 부분만 표시)
    early_plotted = False
    late_plotted = False
    for onset, status in zip(onsets_original, diff_status):
        if status in ['early', 'late']:
            for start, end in bad_segments:
                if start <= onset <= end:
                    if status == 'early':
                        if not early_plotted:
                            plt.axvline(onset, color='green', linestyle='--', label='early 박자')
                            early_plotted = True
                        else:
                            plt.axvline(onset, color='green', linestyle='--')
                    elif status == 'late':
                        if not late_plotted:
                            plt.axvline(onset, color='orange', linestyle='--', label='late 박자')
                            late_plotted = True
                        else:
                            plt.axvline(onset, color='orange', linestyle='--')

    # x축 라벨
    plt.xlabel('시간 (초)')
    # y축 라벨
    plt.ylabel('진폭')
    # 그래프 제목
    plt.title('원본 음원의 파형과 온셋 차이')
    # 범례 추가
    plt.legend()
    # 그리드 추가
    plt.grid(True)
    # 그래프 표시
    plt.show()

# 원본 음원과 커버 음원을 비교하여 점수를 매기고 시각화하는 함수
def score_cover(original_audio_path, cover_audio_path, threshold=0.1, merge_tolerance=0.5):
    # 오디오 파일 로드
    y_original, sr_original = load_audio(original_audio_path)
    y_cover, sr_cover = load_audio(cover_audio_path)
    
    # 온셋 추출
    onsets_original, onset_env_original = extract_onsets(y_original, sr_original)
    onsets_cover, onset_env_cover = extract_onsets(y_cover, sr=sr_cover)
    
    # 온셋 비교
    differences, diff_status, score = compare_onsets(onsets_original, onsets_cover, threshold)
    
    # 음절 경계 추출
    syllable_boundaries = extract_syllable_boundaries(y_original, sr_original)
    
    # 틀린 구간 합치기
    bad_segments = merge_bad_segments(syllable_boundaries, onsets_original, diff_status, merge_tolerance)
    
    # 차이 시각화
    plot_onset_differences(y_original, sr_original, onsets_original, bad_segments, diff_status)
    
    # 틀린 구간 저장
    save_bad_segments(original_audio_path, bad_segments, "original_bad_segments", "original")
    save_bad_segments(cover_audio_path, bad_segments, "cover_bad_segments", "cover")
    
    # 로그 출력
    print("Detected bad segments (with padding):")
    for start, end in bad_segments:
        print(f"Start: {start:.2f} s, End: {end:.2f} s")
    
    # 박자가 빠른지 느린지 출력 (틀린 부분만 출력)
    for onset, status in zip(onsets_original, diff_status):
        if status in ['early', 'late']:
            for start, end in bad_segments:
                if start <= onset <= end:
                    print(f"Onset at {onset:.2f} s is {status}")
    
    return score

title = '장범준-흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야'
# 사용 예제
original_audio_path = f'back-end/assets/audio/artist/test/{title}.wav'  # 원본 오디오 파일 경로
cover_audio_path = f'back-end/assets/audio/user/{title}.wav'  # 커버 오디오 파일 경로
threshold = 0.2  # 허용 오차 범위 (초 단위)
merge_tolerance = 0.6  # 인접 음절 합치기 허용 오차 (초 단위)

# 비교 및 점수화 함수 호출
score = score_cover(original_audio_path, cover_audio_path, threshold, merge_tolerance)
print(score)