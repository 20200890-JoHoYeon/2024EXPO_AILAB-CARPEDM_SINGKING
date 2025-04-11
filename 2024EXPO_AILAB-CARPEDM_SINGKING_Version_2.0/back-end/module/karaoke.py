import pyaudio
import numpy as np
from scipy.signal import lfilter

# 오디오 설정
CHUNK = 1024  # 오디오 스트림에서 읽을 프레임 수
FORMAT = pyaudio.paInt16  # 오디오 포맷 (16비트 정수)
CHANNELS = 1  # 모노
RATE = 44100  # 샘플링 레이트 (Hz)

# 리버브 설정
REVERB_DECAY = 3.8  # 리버브 감소율
REVERB_DELAY = int(0.03 * RATE)  # 리버브 지연 (30ms)

# 파형 처리를 위한 필터 계수
b = np.zeros(REVERB_DELAY + 1)
b[0] = 1
b[REVERB_DELAY] = REVERB_DECAY
a = 1

# PyAudio 객체 초기화
p = pyaudio.PyAudio()

# 입력 스트림 (마이크)
stream_input = p.open(format=FORMAT,
                      channels=CHANNELS,
                      rate=RATE,
                      input=True,
                      frames_per_buffer=CHUNK)

# 출력 스트림 (스피커)
stream_output = p.open(format=FORMAT,
                       channels=CHANNELS,
                       rate=RATE,
                       output=True,
                       frames_per_buffer=CHUNK)

print("실시간 리버브 효과가 시작되었습니다. Ctrl+C로 종료하세요.")

try:
    while True:
        # 마이크로부터 데이터 읽기
        data = stream_input.read(CHUNK)
        
        # 데이터를 numpy 배열로 변환
        audio_data = np.frombuffer(data, dtype=np.int16)
        
        # 리버브 필터 적용
        reverb_data = lfilter(b, a, audio_data)
        
        # 오디오 데이터를 다시 바이트로 변환
        reverb_data = reverb_data.astype(np.int16).tobytes()
        
        # 스피커로 출력
        stream_output.write(reverb_data)
except KeyboardInterrupt:
    print("프로그램이 종료됩니다.")

# 스트림 종료
stream_input.stop_stream()
stream_input.close()
stream_output.stop_stream()
stream_output.close()
p.terminate()
