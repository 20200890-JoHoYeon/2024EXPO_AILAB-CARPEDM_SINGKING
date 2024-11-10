import os
from module.db import Database

from flask import Flask, request, session, jsonify, redirect
from flask_cors import CORS, cross_origin  # Cross-Origin Resorce Sharing 
                                           # 서로 다른 도메인 간에 리소스를 주고 받는 것을 허용해주거나 차단하는 설정

from module.vocal_analysis import VocalAnalysis
from module.range_check import extract_pitch

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "Um_AI_Diary_Hungry_BBC_BBQ_Chicken"

UPLOAD_FOLDER = 'assets/audio/user/'

TONE_UPLOAD_FOLDER = os.path.join(UPLOAD_FOLDER, 'tone')
RANGE_UPLOAD_FOLDER = os.path.join(UPLOAD_FOLDER, 'range')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TONE_UPLOAD_FOLDER'] = TONE_UPLOAD_FOLDER
app.config['RANGE_UPLOAD_FOLDER'] = RANGE_UPLOAD_FOLDER

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = Database()

artist = '정준일'
title = '안아줘'

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()

        user_id = data['id']
        user_password = data['password']

        login_data = db.db_login(user_id, user_password)
        return login_data
    else:
        return {"message":"로그인 에러"}

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        data = request.get_json()
    
        user_id = data['id']
        user_age = data['age']
        user_gender = data['gender']
        user_name = data['name']
        user_pw = data['password']

        register_data = db.db_register(user_id, user_name, user_age, user_gender, user_pw)
        print(register_data)
        return register_data

@app.route("/uploads", methods=["GET", "POST"])
def upload():
    # 업로드 폴더 경로 설정
    UPLOAD_FOLDER = 'uploads/'
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

       # 'audio_file'은 JavaScript에서 전송한 FormData key와 일치해야 합니다.
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part"}), 400

    file = request.files['audio']

    # 파일이 비어있지 않은지 확인
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # 파일 저장
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], artist+'-'+title+'.wav')
        file.save(file_path)
        
        va = VocalAnalysis(artist, title)
        va.recording_result()

        return jsonify({"message": "File saved successfully", "file_path": file_path}), 200
    
@app.route("/test", methods=["GET", "POST"])
def test():
    return {'title':session['title']}

# 가사 정보 반환
@app.route("/training", methods=["GET", "POST"])
def training():

    data = request.get_json()  # 프론트엔드에서 전달된 데이터 받기
    artist = data.get("artist")  # 가수명
    title = data.get("songTitle")  # 노래 제목

    session['artist'] = artist
    session['title'] = title

    print(session['artist'], session['title'])

    va = VocalAnalysis(artist, title)
    lrc = va.process_music_files()

    print(lrc)
    return jsonify({'lyrics':lrc})


@app.route("/vocal_analysis", methods=["GET", "POST"])
def vocal_analysis():
    va = VocalAnalysis('정준일', '안아줘')
    
    pitch_score, wrong_segments = va.pitch_comparison()
    
    print(pitch_score, wrong_segments)

    wrong_lyrics, _ = va.find_incorrect()


    beat_score = round(va.score_cover()['accuracy'], 2)

    pronunciation_score = va.pronunciation_score()

    if pronunciation_score is None:
        print("발음 점수를 계산할 수 없습니다.")
        pronunciation_score = 0.0  # 기본값으로 설정하거나 다른 처리를 할 수 있음

    return jsonify({
        '음정 점수': pitch_score,
        '박자 점수': beat_score,
        '발음 점수': float(pronunciation_score),
        '틀린 구간 초(시작, 끝)': wrong_segments,
        '틀린 가사': wrong_lyrics
    })

@app.route("/range_check", methods=["GET", "POST"])
def range_check():
    # audio_path = 'uploads/range/range_test.wav' # 음역대 녹음한 오디오 경로
    file_path = os.path.join(app.config["RANGE_UPLOAD_FOLDER"], 'user_range.wav')

    # 업로드 폴더 경로 설정
    if not os.path.exists(app.config["RANGE_UPLOAD_FOLDER"]):
        os.makedirs(app.config["RANGE_UPLOAD_FOLDER"])

    # 'audio_file'은 JavaScript에서 전송한 FormData key와 일치해야 합니다.
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part"}), 400

    file = request.files['audio']

    # 파일이 비어있지 않은지 확인
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # 파일 저장
    if file:
        file.save(file_path)
        print(f"File saved at: {file_path}")  # 파일 경로 출력
        # return jsonify({"message": "File saved successfully", "file_path": file_path}), 200
        frequency = extract_pitch(file_path)
        frequency = round(float(frequency),2)

        print(frequency)
        return jsonify({'frequency':frequency})

@app.route("/uploads/tone", methods=["GET", "POST"])
def tone_check():
    
    file_path = os.path.join(app.config["TONE_UPLOAD_FOLDER"], 'user_tone.wav')

    # 업로드 폴더 경로 설정
    if not os.path.exists(app.config["TONE_UPLOAD_FOLDER"]):
        os.makedirs(app.config["TONE_UPLOAD_FOLDER"])

    # 'audio_file'은 JavaScript에서 전송한 FormData key와 일치해야 합니다.
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part"}), 400

    file = request.files['audio']

    # 파일이 비어있지 않은지 확인
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # 파일 저장
    if file:
        file.save(file_path)
        print(f"File saved at: {file_path}")  # 파일 경로 출력
        return {'Result':'발라드'}

 #랭킹 데이터 -- 민지원
@app.route('/weekly_ranking', methods=['GET'])
def get_weekly_ranking():
    try:
        data = db.get_weekly_ranking()

        if data:
            return jsonify({'status': 'success', 'data': data}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'No ranking data found'}), 404
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)