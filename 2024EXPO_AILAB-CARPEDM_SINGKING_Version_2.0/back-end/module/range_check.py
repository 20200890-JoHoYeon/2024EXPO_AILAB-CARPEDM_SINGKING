import librosa
import numpy as np

def extract_pitch(audio_file):
                                                            # 오디오 파일 불러오기
    y, sr = librosa.load(audio_file, duration=3.0)          # 3초만 로드

    pitches, magnitudes = librosa.core.piptrack(y=y, sr=sr) # 음정 추출 (pyin 알고리즘 사용)
    pitches_frequencies = []                                # 가장 높은 에너지의 음정 추출

    for t in range(pitches.shape[1]):
        index = magnitudes[:, t].argmax()
        pitch = pitches[index, t]
        if pitch > 0:  # 유효한 음정일 때만 저장
            pitches_frequencies.append(pitch)

                                                            # 추출된 주파수의 중간값 계산 (노이즈 제거를 위해)
    if pitches_frequencies:
        median_pitch = np.median(pitches_frequencies)
        print(f"추출된 주파수의 중간값: {median_pitch:.2f} Hz")
        return round(median_pitch, 2)
    else:
        print("유효한 음정을 찾지 못했습니다.")
        return {'message':'error'}

if __name__ == "__main__":    
    audio_path = 'back-end/uploads/range/range_test.wav'        # 오디오 파일 경로
    
    extract_pitch(audio_path)