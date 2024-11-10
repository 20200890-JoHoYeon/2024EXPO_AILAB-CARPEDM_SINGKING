import os
import librosa                                       # 음성 분석을 위함
import numpy as np
import soundfile as sf
import tensorflow as tf
import tensorflow_hub as hub
from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
import matplotlib
from pydub import AudioSegment
matplotlib.use('Agg')  # GUI 없는 백엔드 사용

import difflib
import speech_recognition as s_r
from bs4 import BeautifulSoup
import urllib
import json
import re
import requests
import Levenshtein
from flask import jsonify

import librosa
import soundfile as sf

import pandas as pd
from tensorflow import keras
from datetime import datetime
from keras.models import load_model
from keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity




class VocalAnalysis:
    def __init__(self, artist=None, title=None):
        self.title = title
        self.artist = artist
        self.artist_audio_path = f'assets/audio/artist/vocal/{self.artist}-{self.title}.wav'
        self.user_audio_path = f'assets/audio/user/{self.artist}-{self.title}.wav'
        self.lrc_path = f'assets/lrc/{self.artist}-{self.title}.lrc'

        self.sampling_rate = 16000
        self.model = self.model_load()

    def recording_result(self):
        audio_data, sample_rate = librosa.load(self.user_audio_path, sr=None)
        sf.write(self.user_audio_path, audio_data, sample_rate)

    def model_load(self):                           
        model_path = os.path.join(os.getcwd(), "models")  # 모델 경로
        
        if not os.path.exists(model_path):                # 모델 경로가 없으면 디렉토리 생성
            os.makedirs(model_path)
    
        print("모델 다운로드 중")
        model = hub.load("https://tfhub.dev/google/spice/2")
        tf.saved_model.save(model, model_path)
        return model
    
    def extract_pitches(self, audio_path, duration):
        model = self.model

        original_y, sr = librosa.load(audio_path, mono=True, duration=duration)                     # SPICE모델은 mono 타입의 오디오만 지원

        MAX_ABS_INT16 = 32768.0                                                                     # 16비트 PCM 형식에서 가능한 최대 절댓값을 나타내는 상수

        y = original_y/float(MAX_ABS_INT16)                                                         # -1과 1사이의 부동 소수점으로 정규화

        model_output = model.signatures["serving_default"](tf.constant(y, tf.float32))              # 음정과 신뢰도를 얻음

        pitch_outputs = model_output["pitch"].numpy()                                               # 음정만 추출
        
        original_duration = len(y) / sr                                                             # 원래 신호의 전체 시간 (초)

        pitch_time = np.linspace(0, original_duration, len(pitch_outputs))                          # 음정 출력의 시간 축 생성 (초 단위)
        resampled_time = np.linspace(0, original_duration, int(original_duration))                  # 원곡 시간 축 생성 (초 단위)

        interp_func = interp1d(pitch_time, pitch_outputs, kind='linear', fill_value="extrapolate")  # 보간 함수 생성
        
        resampled_pitch_outputs = interp_func(resampled_time)                                       # 보간법 적용하여 음정 출력을 원래 신호의 길이에 맞춤

        # file_path = audio_path.replace('.wav', '.npy')                                              # 오디오 파일명과 같은 이름으로 npy 파일 생성

        # np.save(file_path, resampled_pitch_outputs)                                                 # 오디오 배열 저장

        return pitch_outputs, resampled_pitch_outputs, original_y, sr
    
    def pitch_comparison(self):
        y, sr =  librosa.load(self.user_audio_path, mono=True)
        duration = len(y)/sr

        artist_original, artist_resampled, artist_y, _  = self.extract_pitches(self.artist_audio_path, duration)
        user_original, user_resampled, _, _ = self.extract_pitches(self.user_audio_path, duration)

        diff = artist_original - user_original         # 원곡 목소리와 사용자 음정 주파수 오차 계산
        resampled_diff = artist_resampled - user_resampled

        threshold = 0.03                               # 오차 인정 범위

        # 음정 차이에 따른 평가
        result = np.where(abs(diff) <= threshold, "Correct", 
                            np.where(diff > threshold, "Flat", 
                                    np.where(diff < -threshold, "Sharp", None)))
        
        resampled_result = np.where(abs(resampled_diff) <= threshold, "Correct", 
                            np.where(resampled_diff > threshold, "Flat", 
                                    np.where(resampled_diff < -threshold, "Sharp", None)))

        correct_score = round((np.sum(result=='Correct') / len(result)) *100, 2)

        plt.rcParams['font.family'] = 'Malgun Gothic' # 한국어 폰트 설정

        correct_indices = np.where(result == 'Correct')[0] # 배열이 Good인 위치 찾기 
        sharp_indices = np.where(result == 'Sharp')[0] # 배열이 high인 위치 찾기 
        flat_indices = np.where(result == 'Flat')[0] # 배열이 high인 위치 찾기 

        plt.figure(figsize=(15, 5)) # 그래프 크기 설정 그리기

        plt.plot(artist_original, label='original', color='blue') # 원곡 음성

        #plt.plot(cover, label='cover', color='orange') # 사용자 입력 음성


        plt.scatter(correct_indices, artist_original[correct_indices], color='orange', label='Good') # 음정 Good
        plt.scatter(sharp_indices, user_original[sharp_indices], color='hotpink', label='higher', marker="^") # 음정 높음
        plt.scatter(flat_indices, user_original[flat_indices], color='lightgrey', label='lower', marker="v") # 음정 낮음

        plt.title(f'원곡과 사용자 보컬의 음정 체크: {correct_score}점')
        plt.xlabel('오디오 프레임')
        plt.ylabel('원곡 파형 / Good / Bad')
        plt.legend()

        wrong_segments = self.find_wrong_segments(result)
        resampled_wrong_segments = self.find_wrong_segments(resampled_result, 1)
        print("틀린 구간 초(시작, 끝):", resampled_wrong_segments)

                                                            # 틀린 구간 강조 표시
        for start, end in wrong_segments:
            plt.axvspan(start, end, color='red', alpha=0.3)
            
        plt.savefig(f'assets/graph/{self.title}.png')       # 그래프 저장

        # 틀린 구간의 오디오 저장
        for index, s in enumerate(resampled_wrong_segments):
            audio_segment = artist_y[s[0]*sr:(s[1]+1)*sr]
            
            sf.write(f'{self.artist_audio_path.replace(".wav","")}_segment{index+1}.wav', audio_segment, sr)

        correct_score = round((np.sum(result=='Correct') / len(result))*100, 2)+30

        return correct_score, resampled_wrong_segments, artist_resampled, user_resampled

    def find_wrong_segments(self, result, status=0):                        # 틀린 구간 시작점과 끝점 찾는 함수 (2초를 초과하여 틀렸을 경우만)
        wrong_segments = []
        in_wrong_segment = False
        start_idx = None

        length = 2 if status == 1 else 15
        
        for i in range(len(result)):
            if result[i] != 'Correct':
                if not in_wrong_segment:
                    start_idx = i
                    in_wrong_segment = True
            else:
                if in_wrong_segment:
                    end_idx = i - 1
                    # 틀린 구간의 길이가 1초 초과인지 확인
                    if (end_idx - start_idx) > length:
                        wrong_segments.append((start_idx, end_idx))
                    in_wrong_segment = False

        # 마지막 구간이 틀린 구간으로 끝나는 경우
        if in_wrong_segment:
            end_idx = len(result) - 1
            if (end_idx - start_idx) > 1:
                wrong_segments.append((start_idx, end_idx))
        return wrong_segments
    
    def find_incorrect(self):                        # 틀린 구간의 가사를 찾아주는 함수 정의

        wrong_segment_file = []
        for s in os.listdir(f'assets/audio/artist/vocal'):
            if f'flower_segment' in s:
                wrong_segment_file.append(s)

        lyrics_path = f'assets/lyrics/{self.artist}-{self.title}.txt'
        
        incorrect_lyrics = []
        incorrect_similar = []
        for w in wrong_segment_file:
            audio_path = f'assets/audio/artist/vocal/{w}'
                
            r = s_r.Recognizer()
            
            song = s_r.AudioFile(audio_path)                                # 오디오 파일 로드

            with song as source:
                audio = r.record(source)

            result = r.recognize_google(audio_data=audio, language='ko-KR') # 음성을 텍스트로 변환

            f = open(lyrics_path, 'r', encoding='utf-8')                                      # 읽기 모드로 파일 준비
            lyrics = f.readlines()                                          # 각 줄을 element로 받는 리스트 반환
            lyrics = list(map(lambda x: x.replace('\n',''), lyrics))        # 각 리스트에서 \n 제외하고 리스트 반환

            threshold = 0.09                                                # 임계값

                                                                            # SequenceMatcher 방법
            lyrics_index = []
            lyrics_similarity = []
            
            for index, ly in enumerate(lyrics):
                answer_bytes = bytes(ly, 'utf-8')
                input_bytes = bytes(result, 'utf-8')
                answer_bytes_list = list(answer_bytes)
                input_bytes_list = list(input_bytes)
                
                sm = difflib.SequenceMatcher(None, answer_bytes_list, input_bytes_list)
                similar = sm.ratio()

                if similar not in lyrics_similarity:                        # 중복된 가사 아닐 경우
                    lyrics_index.append(index)
                    lyrics_similarity.append(similar)
                                                                            # 최대 유사도와 임계값 범위의 가사와 인덱스 추출 
            incorrect_section = [(index, similarity) for index, similarity in zip(lyrics_index, lyrics_similarity) if max(lyrics_similarity)-threshold<= similarity <= max(lyrics_similarity)]

            for index, similarity in incorrect_section:
                print(index, similarity)
                incorrect_lyrics.append(lyrics[index])
                incorrect_similar.append(similarity)

            
        for w in wrong_segment_file:                # 분석 후 틀린 구간 오디오 삭제
            os.remove(f'assets/audio/artist/{w}')

        return incorrect_lyrics, incorrect_similar

##################################################################################################################################

    def extract_artist_and_title(self, file_name):
        #
        base_name = os.path.splitext(file_name)[0]
        
        # 파일명에서 '-'로 구분된 아티스트와 곡명 추출
        if '-' in base_name:
            artist, title = base_name.split('-', 1)
            return artist.strip(), title.strip()
        else:
            return None, None

    # Bugs에서 아티스트와 트랙 ID 검색 (앨범명 없이 검색)
    def get_artist_track_id(self, artist_name, title):
        search_url = f'https://music.bugs.co.kr/search/track?q={artist_name} {title}'
        search_soup = BeautifulSoup(requests.get(search_url).text, 'html.parser')
        
        # 검색 결과에서 트랙 ID 추출
        track_tag = search_soup.select_one("tr[trackid]")
        if track_tag:
            track_id = track_tag.get('trackid')
            return track_id
        return None

    # 가사 다운로드
    def download_lyrics(self, track_id, file_path):
        lyrics_url = f'http://api.bugs.co.kr/3/tracks/{track_id}/lyrics?&api_key=b2de0fbe3380408bace96a5d1a76f800'

        urllib.request.urlretrieve(lyrics_url, f"{file_path}.lrc")

        with open(f'{file_path}.lrc', encoding='UTF8') as json_file:
            data = json.load(json_file)
        
        return data.get('result', {}).get('lyrics', None)

    # LRC 파일 생성
    def lrc_maker(self, file_path, lyrics_text):
        TIME = []
        LYRICS = []
        mm = []
        ss = []
        xx = []

        lyrics_lines = lyrics_text.replace("＃", "\n").split("\n")
        for line in lyrics_lines:
            time_marker, lyric = line.rsplit("|", 1)
            TIME.append(float(time_marker))
            LYRICS.append(lyric)

        for time in TIME:
            xx.append(f"{time % 1:.2f}"[1:])
            ss.append(f"{int(time) % 60:02}")
            mm.append(f"{int(time) // 60:02}")

        with open(f'{file_path}.lrc', 'w', encoding='UTF8') as file:
            for i in range(len(TIME)):
                file.write(f"[{mm[i]}:{ss[i]}{xx[i]}]{LYRICS[i]}\n")

        print(f"{file_path}.lrc 파일을 생성했습니다.")


    def process_music_files(self):
        artist = self.artist
        title = self.title
        file_path = 'assets/lrc/' + artist + '-' + title

        if os.path.isfile(file_path+'.lrc') != True:
                
            # Bugs에서 아티스트명과 곡명으로 트랙 ID 검색
            track_id = self.get_artist_track_id(artist, title)
            
            if track_id:
                    
                lyrics = self.download_lyrics(track_id, file_path)
                if lyrics:
                
                    self.lrc_maker(file_path, lyrics)
        lrc = self.read_lrc(file_path+'.lrc')
        return lrc
        
    # LRC 파일 읽기
    def read_lrc(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        lrc_data = []
        for line in lines:
            match = re.match(r'\[(\d+):(\d+\.\d+)\](.*)', line)
            if match:
                minutes = int(match.group(1))
                seconds = float(match.group(2))
                text = match.group(3).strip()
                lrc_data.append((minutes * 60 + seconds, text))
        return lrc_data
##################################################################################################################################

    def load_audio(self, audio_path):
        # 오디오 파일 로드, y는 오디오 타임 시리즈, sr은 샘플링 레이트
        y, sr = librosa.load(audio_path, sr=None)
        return y, sr

# 오디오 파일에서 온셋(박자 시작점)을 추출하는 함수
    def extract_onsets(self,y, sr):
        # 온셋 강도(에너지) 계산
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        # 온셋(박자 시작점) 검출
        onsets = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, units='time')
        return onsets, onset_env


    # 원본 온셋과 커버 온셋을 비교하여 차이를 계산하는 함수
    def compare_onsets(self, onsets_original, onsets_cover, threshold=0.1):
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
    def extract_syllable_boundaries(self, y, sr, hop_length=512, frame_length=2048):
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
    def merge_bad_segments(self, syllable_boundaries, onsets_original, diff_status, merge_tolerance=0.5):
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
    def save_bad_segments(self, audio_path, bad_segments, output_dir, output_prefix, padding=3.0):
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
    def plot_onset_differences(self, y_original, sr_original, onsets_original, bad_segments, diff_status):
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
        plt.savefig(f'assets/graph/{self.artist}-{self.title}-beat.png')

    # 원본 음원과 커버 음원을 비교하여 점수를 매기고 시각화하는 함수
    def score_cover(self, threshold=0.2, merge_tolerance=0.6):
        # threshold -> 허용 오차 범위 (초 단위) 
        # merge_tolerance -> 인접 음절 합치기 허용 오차 (초 단위)

        # 오디오 파일 로드
        y_original, sr_original = self.load_audio(self.artist_audio_path)
        y_cover, sr_cover = self.load_audio(self.user_audio_path)
        
        # 온셋 추출
        onsets_original, onset_env_original = self.extract_onsets(y_original, sr_original)
        onsets_cover, onset_env_cover = self.extract_onsets(y_cover, sr=sr_cover)
        
        # 온셋 비교
        differences, diff_status, score = self.compare_onsets(onsets_original, onsets_cover, threshold)
        
        # 음절 경계 추출
        syllable_boundaries = self.extract_syllable_boundaries(y_original, sr_original)
        
        # 틀린 구간 합치기
        bad_segments = self.merge_bad_segments(syllable_boundaries, onsets_original, diff_status, merge_tolerance)
        
        # 차이 시각화
        self.plot_onset_differences(y_original, sr_original, onsets_original, bad_segments, diff_status)
        
        # # 틀린 구간 저장
        # self.save_bad_segments(self.artist_audio_path, bad_segments, "original_bad_segments", "original")
        # self.save_bad_segments(self.user_audio_path, bad_segments, "cover_bad_segments", "cover")
        
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
#####################################################################################################################################################
    def remove_brackets_and_text(self, text):
        # 정규 표현식으로 [ ] 안의 텍스트와 괄호를 모두 제거
        result = re.sub(r'\[.*?\]', '', text)
        return result
    
    def calculate_levenshtein_similarity(self, target_string):
        file_path = f'assets/lyrics/{self.artist}-{self.title}.txt'
        # 텍스트 파일 불러오기
        with open(file_path, 'r', encoding='utf-8') as file:
            file_content = file.read()

        # 레벤슈타인 유사도 계산
        distance = Levenshtein.distance(file_content, target_string)
        
        # 레벤슈타인 거리를 유사도로 변환 (0~1 범위)
        max_len = max(len(file_content), len(target_string))
        similarity = round(1 - (distance / max_len), 2)

        return str(similarity)
    
    def pronunciation_score(self):
        r = s_r.Recognizer()  # 객체 생성
        text = ""  # 기본값 설정

        # 오디오 파일에서 음성을 인식
        with s_r.AudioFile(self.user_audio_path) as source:
            audio = r.record(source)

        try:
            # 구글 음성 API로 인식 (하루 제한 50회)
            text = r.recognize_google(audio, language="ko-KR")
            print("말하고 있는 음성: " + text)
        except s_r.UnknownValueError:
            print("음성 인식을 이해하는데 실패했습니다.")
        except s_r.RequestError as e:
            print("요청 실패: {0}".format(e))  # API Key 오류, 네트워크 문제 등

        if text:
            # `text`가 제대로 인식된 경우에만 Levenshtein 유사도 계산
            lyrics_score = self.calculate_levenshtein_similarity(text)
            print(lyrics_score)
            return float(lyrics_score)
        else:
            print("텍스트가 비어 있으므로 유사도를 계산할 수 없습니다.")
            return 0  # 적절한 기본값을 반환

    def change_pitch_without_speed(self, semitones):




        # 파일 경로
        inst_file = f"assets/audio/artist/inst/{self.artist}-{self.title}.wav"
        input = [self.artist_audio_path, inst_file]

        for i in input:
            y, sr = librosa.load(i)

            # Change pitch without changing speed
            y_shifted = librosa.effects.pitch_shift(y, sr=sr, n_steps=semitones)

            pm = '+'if semitones > 0 else '-'
            output_file = f"{i.replace('.wav','')}{pm}{semitones}.wav"

            # Save the pitch-shifted audio
            sf.write(output_file, y_shifted, sr)

    def extract_features(self, model, data):
        intermediate_layer_model = keras.Model(inputs=model.inputs, outputs=model.get_layer(index=-2).output)
        features = intermediate_layer_model.predict(data)
        return features
    
    def tone_classification(self):
        labels = ['발라드', '락', '트로트', '댄스']

        model = load_model('models/voice_char.h5')
        now = datetime.now()
        le = LabelEncoder()

        max_pad_len = 10000

        file_name = 'assets/audio/user/tone/user_tone.wav' # 변경할 부분
        y, sr = librosa.load(file_name, sr=None) 
        test_data = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)

        pad_width = max_pad_len - test_data.shape[1]

        if pad_width > 0:
            test_data = np.pad(test_data, pad_width=((0, 0), (0, pad_width)), mode='constant')
        else:
            test_data = test_data[:, :max_pad_len]

        n_columns = 10000
        n_row = 40
        n_channels = 1

        test_data = tf.reshape(test_data, [-1, n_row, n_columns, n_channels])

        # ------DB에서 데이터 읽어들이는 작업 필요--------
        # 지금은 샘플의 파일을 넣어 작성
        df = pd.read_pickle('models/voice_data.pkl')

        x = np.array(df.feature.tolist())
        y = np.array(df.label.tolist())
        yy = to_categorical(le.fit_transform(y))
        # -----------------------------------------------
        database_data = x
        database_labels = yy
        title = df.title.tolist()

        input_features = self.extract_features(model, test_data)
        database_features = self.extract_features(model, database_data)

        similarity_scores = cosine_similarity(input_features, database_features)

        recommended_indices = np.argsort(similarity_scores[0])[::-1]
        recommended_songs = [title[i] for i in recommended_indices[:5]]
        class_labels = int(np.argmax(model.predict(test_data)))
        
        label = labels[class_labels]

        recommend_dict = {'label' : label, 'recommend' : recommended_songs}

        return recommend_dict
