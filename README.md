# 2024EXPO_AILAB-CARPEDM_SINGKING

This is the entry for the 2024 EXPO AILAB-CARPEDM Club's graduation work MYSING project.

# development stack :question:

AI: Tensorflow <br />
Front-End: JavaScript, React <br />
Back-End: Python3, Flask <br />
Server: AWS EC2 <br />
Database: AWS RDS, MySQL <br />

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

### 🎤 씽킹(SingKing): 인공지능 기반의 보컬 트레이닝 서비스
[작성자 출처](https://github.com/9dongb/ai_vocal_training/blob/main/README.md)

### 📅 개발기간
- 2024.07.03 ~ 2024.10.18
  
<br />
1. 보컬 분석 리포트 - 사용자로부터 음성 데이터를 입력받았을 때 Python 음성 분석 라이브러리인 Librosa를 통해 입력받은 음성 데이터에 대해 FFT(Fast Fourier Transform) 변환을 진행한 뒤 음정과 박자를 분석하여 원곡과 비교 후 음정, 박자, 발음의 정확도와 분석 결과 리포트를 제공한다.
<br /><br />
2. AI 사용자 음색 분석 및 노래 추천 - Librosa를 통해 사용자의 음성 데이터를 MFCC(Mel-Frequency Cepstral Coeffi cient)를 통해 음성의 특징값들을 알아낸 뒤 딥러닝 기법 중 하나인 CNN (Convolutional Neural Network) 알고리즘을 통해 학습된 모델에 입력시켜 사용자가 가진 음색을 예측하여 분류하고, 분류된 음색 정보를 바탕으로 해당 음색과 유사한 노래들을 사용자에게 추천한다.
<br /><br />
3. AI 기초 음역 진단 시스템 - 사용자로부터 최고음과 최저음에 대한 음성 데이터를 입력받아 Librosa를 통해 입력받은 음성 데이터에 대해 FFT 변환을 진행하여 음정을 파악한 뒤 사용자의 음이 불안정하지 않고 안 정적으로 소리를 낼 수 있는 최고음과 최저음을 파악하여 사용자에게 최고 음정, 최저 음정 정 보를 제공하여 사용자가 안정적으로 가창할 수 있는 음역대를 파악할 수 있다.
<br /><br />
<!--
4. AI 노래 커버 - 사용자 가창 데이터가 5회 이상 축적되었을 경우 AI 음성 합성 기술 중 하나인 RVC(Re trieval-based Voice Conversion) 모델을 사용해 원곡 음원에 사용자의 목소리를 학습시 켜 음성 합성을 진행한 후 사용자에게 제공하여 사용자가 가창 실력이 향상되었을 경우를 미리 보여준다. (미구현)
<br /><br />
5. 씽킹 배틀 - 관리자가 매주 3개의 배틀 곡을 선정해 배틀 곡을 가창한 사용자들의 노래를 평가하여 순위를 매기고 각 배틀 곡에서 점수가 가장 높은 1등을 선정해 3명에게 상품을 제공한다. 이로 인한 사용자들 간의 경쟁 심리를 이용해 앱 사용도를 높일 수 있다. (미구현)
-->

## 1. 개요
보컬 트레이닝을 필요로 하지만 소모되는 시간과 비용이 부담스러운 음치 및 박치 직장인, 학생에게 시·공간적인 제약 없이 사용자의 노래 가창 요소(발성, 음정, 박자, 가사 전달력)에 대한 **음성 데이터 분석**과 **인공지능 모델**을 활용해 사용자 맞춤형 피드백을 통해 노래 실력 향상에 도움을 기여할 수 있는 인공지능 기반의 보컬 코칭 서비스입니다. 영상만 재생시켜 주는 기존 보컬 코칭 서비스와는 달리 음성 데이터 분석과 인공지능을 활용하여 차별화된 서비스를 제공하는 것을 목적으로 개발하였습니다.

<img src="https://github.com/user-attachments/assets/536160ce-7cd2-45e4-9d47-dd57290cec04" width="70%" height="70%"/>

## 2. 페이지 소개
**■ 메인 페이지**

<img src="https://github.com/user-attachments/assets/dcad708d-b5cc-4e71-b1cf-3b512242af0e" width="20%" height="20%"/>

- 최상단에서 사용자 정보 확인 가능하도록 구현
- 두 번째 행에서 최근 정밀 트레이닝 기록 확인 가능하도록 구현
- 세 번째 행에서 이전 정밀 트레이닝 점수와 현재 점수 비교 가능하도록 구현
- 네 번째 행에서는 정밀 트레이닝 점수의 주간 랭킹 확인 가능하도록 구현

**■ 트레이닝 페이지**

<img src="https://github.com/user-attachments/assets/c6d7aa9d-c9ef-481d-89d3-f7cf2c9feb7f" width="20%" height="20%"/>

- 4가지를 핵심 기능을 이용할 수 있도록 구현

**■ 트레이닝 페이지 - AI 음색 진단**

<img src="https://github.com/user-attachments/assets/4fe03808-d1e4-4be1-b76c-a4c21256ce0b" width="20%" height="20%"/>


<img src="https://github.com/user-attachments/assets/625e38a3-6b19-494b-a4e9-b4a524a55d35" width="20%" height="20%"/>


- 사용자가 마이크 버튼을 눌러 음성을 녹음할 수 있는 기능 구현
- 입력된 목소리가 **네 개의 음색 정보**(발라드, 댄스, 락, 트로트) 중 가장 어울리는(유사한) 음색을 사용자에게 부여하도록 구현
- `모델 학습은 음성 데이터를 목소리의 특성 정보를 알 수 있는 MFCC로 변환하여 CNN을 통해 학습`


**■ 트레이닝 페이지 - 정밀 트레이닝**

<img src="https://github.com/user-attachments/assets/9cceae9a-cbfc-4656-961a-3c62b8dbd509" width="19%" height="19%"/>
<img src="https://github.com/user-attachments/assets/b965e78c-4be9-4101-824a-de1c59b697e8" width="19%" height="19%"/>
<img src="https://github.com/user-attachments/assets/5722ec76-cec1-4f8c-abbc-336baa6281a6" width="19%" height="19%"/>
<img src="https://github.com/user-attachments/assets/401ba3bf-9ba2-454e-a170-e06760d33c82" width="19%" height="19%"/>
<img src="https://github.com/user-attachments/assets/82197c44-afbd-4ace-8198-708f060332d7" width="19%" height="19%"/>

- 원하는 곡을 선정한 후 노래 가창 기능 구현
- 사용자 노래의 **음정과 박자**를 원곡 가수의 노래와 비교하여 점수 산정 기능 구현
- 사용자와 원곡 가수의 음정과 박자를 비교하여 두가지 **그래프로 표시** 기능 구현
- **틀린 구간을 선별**해 가사와 반주를 실행해 반복 연습 가능 구현

**■ 트레이닝 페이지 - 음역대 진단**

<img src="https://github.com/user-attachments/assets/c48378c5-ad99-4d79-b4f5-7259cd6844bf" width="20%" height="20%"/>

- 피아노 건반을 눌러서 재생되는 음정을 따라 음을 내면 사용자가 소리낸 음정과 주파수를 보여주는 기능 구현
- `1옥타브 ~ 3옥타브까지 확인 가능`

**■ 매칭 페이지**

<img src="https://github.com/user-attachments/assets/84711f62-c9e5-4fb3-8b0c-232a9d062839" width="20%" height="20%"/>
<!--<img src="https://github.com/user-attachments/assets/87e46a35-395a-4bbd-a6b0-e57f4e109b85" width="20%" height="20%"/>-->

- 사용자 간의 멘토 멘티 매칭 (예정)
- 전문가와의 멘토 멘티 매칭 (예정)
- 사용자 멘토는 레벨 5이상부터 등록 가능 

**■ 마이 페이지**

<img src="https://github.com/user-attachments/assets/dd010647-f565-43e1-8ef3-c4321c95b49f" width="20%" height="20%"/>

- 음색 정보 확인 기능 구현
- 보컬 데이터 확인 기능 (예정)
- 트레이닝 기록 확인 기능 (예정)

## 3. 핵심 트러블 슈팅

<details>
<summary>Flask의 session 정보 유지 불가 문제 </summary>
  
  - 문제 정의
    - Flask의 session에 정보를 저장했을 때, 다른 엔드 포인트에서 session 정보를 인식하지 못하는 문제가 발생했다.
  - 사실 수집
    - 엔드포인트 하나 하나 session을 설정해보았지만, 해당 session을 설정했던 엔드포인트에서만 session 정보를 인식하고 나머지는 모두 인식하지 못한다.
  - 원인추론
    - 새로운 폴더와 HTML 파일 만들어 간단히 session 기능을 테스트해보니 문제가 없다.
    - 같은 코드를 js 파일과 함께 실행하면 session 정보를 인식하지 못한다.
    - js 파일에서 session 정보를 저장하는 것에 문제가 생긴 것 아닐까?
  - 조치 방안과 결과
    - (1) Flask 서버에서 CORS(Cross-Origin Resource Sharing) 허용 코드를 추가한다.
    
      `CORS(app, supports_credentials=True)`
    - (2) js파일의 Fetch 메서드에 쿠키 값 공유 허용 코드를 추가한다.
    
      `credentials: "include"`
    - 위 두가지 설정 이후 session 정보 공유 문제는 모두 해결되었다.
</details>


## 4. 그 외 트러블 슈팅

<details>
<summary> AWS EC2 서버 녹음 장치 문제 </summary>

  - 일부 녹음이 Python 파일 자체로 진행되었는데, 그대로 AWS EC2 서버에 업로드하니 녹음 장치를 찾을 수 없다는 오류가 발생했다.
  - 녹음과 관련된 부분은 전부 프론트엔드 처리하고 녹음 받은 mp3 파일만 서버로 전송히여 서버에서는 mp3 파일을 받아 사용하는 방식으로 변경해 해결되었다.
</details>
## Development Story :question:
📅 2024.07.03 ~ 2024.10.18
I participated in the expo with my club graduation work.
I was in charge of front-end and design work. <br />


## Footer :exclamation:

<!-- Click [here](https://edumalaysia.kr/) to visit my project. -->
![이미지](https://github.com/user-attachments/assets/302b98e7-0708-4c24-853f-a5ae1b3dc8a9)
![2024EXPO_CARPEDM_SINGKING_gif1](https://github.com/user-attachments/assets/9bd5e748-a7d9-463e-bc44-aad285e2212f)  



Finally, I will register a photo showing the progress of the project. Thank you for your review. 😘
