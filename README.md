# 2024EXPO_AILAB-CARPEDM_SINGKING

This is the entry for the 2024 EXPO AILAB-CARPEDM Club's graduation work MYSING project.

# development stack :question:

Front-End: React <br />
Back-End: Flask <br />
Database: MySQL

# SINGKING Project Results :exclamation:

SINGKING Project = Complete :laughing: <br />
<!-- Deploy Web Site: -->

## Project Start
```zsh
$ cd back-end
$ conda create singking
$ pip install (Module Name)
$ conda activate singking
$ python app.py
```

```zsh
$ cd front-end
$ npm install 
$ npm start
```

## User Connect
```zsh
localhost:3000/
```

## poroject Overview :question:
<br />
1. 보컬 분석 리포트 - 사용자로부터 음성 데이터를 입력받았을 때 Python 음성 분석 라이브러리인 Librosa를 통해 입력받은 음성 데이터에 대해 FFT(Fast Fourier Transform) 변환을 진행한 뒤 음정과 박자를 분석하여 원곡과 비교 후 음정, 박자, 발음의 정확도와 분석 결과 리포트를 제공한다.
<br /><br />
2. AI 사용자 음색 분석 및 노래 추천 - Librosa를 통해 사용자의 음성 데이터를 MFCC(Mel-Frequency Cepstral Coeffi cient)를 통해 음성의 특징값들을 알아낸 뒤 딥러닝 기법 중 하나인 CNN (Convolutional Neural Network) 알고리즘을 통해 학습된 모델에 입력시켜 사용자가 가진 음색을 예측하여 분류하고, 분류된 음색 정보를 바탕으로 해당 음색과 유사한 노래들을 사용자에게 추천한다.
<br /><br />
3. AI 기초 음역 진단 시스템 - 사용자로부터 최고음과 최저음에 대한 음성 데이터를 입력받아 Librosa를 통해 입력받은 음성 데이터에 대해 FFT 변환을 진행하여 음정을 파악한 뒤 사용자의 음이 불안정하지 않고 안 정적으로 소리를 낼 수 있는 최고음과 최저음을 파악하여 사용자에게 최고 음정, 최저 음정 정 보를 제공하여 사용자가 안정적으로 가창할 수 있는 음역대를 파악할 수 있다.
<br /><br />
4. AI 노래 커버 - 사용자 가창 데이터가 5회 이상 축적되었을 경우 AI 음성 합성 기술 중 하나인 RVC(Re trieval-based Voice Conversion) 모델을 사용해 원곡 음원에 사용자의 목소리를 학습시 켜 음성 합성을 진행한 후 사용자에게 제공하여 사용자가 가창 실력이 향상되었을 경우를 미 리 보여준다. (미구현)
<br /><br />
5. 씽킹 배틀 - 관리자가 매주 3개의 배틀 곡을 선정해 배틀 곡을 가창한 사용자들의 노래를 평가하여 순위 를 매기고 각 배틀 곡에서 점수가 가장 높은 1등을 선정해 3명에게 상품을 제공한다. 이로 인 한 사용자들 간의 경쟁 심리를 이용해 앱 사용도를 높일 수 있다. (미구현)

## Development Story :question:

I participated in the expo with my club graduation work.
I was in charge of front-end and design work. <br />


## Footer :exclamation:

<!-- Click [here](https://edumalaysia.kr/) to visit my project. -->
![2024EXPO_CARPEDM_SINGKING_gif1](https://github.com/user-attachments/assets/9bd5e748-a7d9-463e-bc44-aad285e2212f)
![이미지](https://github.com/user-attachments/assets/302b98e7-0708-4c24-853f-a5ae1b3dc8a9)

Finally, I will register a photo showing the progress of the project. Thank you for your review. 😘
