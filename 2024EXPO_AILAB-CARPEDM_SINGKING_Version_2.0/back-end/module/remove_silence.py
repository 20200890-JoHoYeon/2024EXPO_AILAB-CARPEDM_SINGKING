import librosa
import numpy as np
import soundfile as sf

def remove_leading_silence(y, sr, threshold=0.01, frame_length=2048, hop_length=512):
    """
    오디오의 앞부분 공백(무음 구간)을 제거합니다.
    :param y: 오디오 신호 (numpy array)
    :param sr: 샘플링 레이트 (int)
    :param threshold: RMS 에너지 값의 임계값 (float)
    :param frame_length: 프레임 길이 (int)
    :param hop_length: 홉 길이 (int)
    :return: 앞부분 공백이 제거된 오디오 신호
    """
    # RMS 에너지 계산
    rms = librosa.feature.rms(y=y, frame_length=frame_length, hop_length=hop_length)[0]

    # 에너지가 임계값보다 큰 첫 번째 인덱스 찾기
    non_silent_indices = np.where(rms > threshold)[0]

    if len(non_silent_indices) > 0:
        # 무음이 아닌 부분의 시작점 계산
        start_sample = non_silent_indices[0] * hop_length
        y_trimmed = y[start_sample:]  # 무음 구간을 제거한 오디오 신호
    else:
        # 무음만 있는 경우, 그대로 반환
        y_trimmed = y

    return y_trimmed

# 음원 파일 불러오기
audio_path = '장범준-흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야-TJ.wav'
y, sr = librosa.load(audio_path, mono=True)

# 앞부분 공백 제거
y_trimmed = remove_leading_silence(y, sr)

# 새로운 파일로 저장
output_path = 'test_trimmed.wav'
sf.write(output_path, y_trimmed, sr)

print(f"앞부분 공백이 제거된 파일이 저장되었습니다: {output_path}")
