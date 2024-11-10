const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001;
const fs = require('fs'); // 파일 시스템 모듈 추가

//JSON 데이터 파싱위한 미들웨어,CORS 설정
app.use(cors());
app.use(express.json());

// MySQL 연결 설정 ( 개인별로 변경 필요 )
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'singking'
});

// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL에 성공적으로 연결되었습니다.');
});

// 회원가입 API 엔드포인트
app.post('/register', async (req, res) => {
    const { id, name, age, gender, password  } = req.body;

     // 입력값 검증
     if (!id || !name || !age || !gender || !password) {
        return res.status(400).json({ message: '모든 필드를 입력해 주세요.' });
    }

    try {
        // 비밀번호 해시 처리
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 등록 SQL 쿼리
        const sql = 'INSERT INTO users (user_id, user_name, user_age, user_gender, user_pw) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [id, name, age, gender, hashedPassword], (err, result) => {
            if (err) {
                console.error('회원가입 중 오류 발생:', err);
                return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
            }
            res.json({ success: true, message: '회원가입이 성공적으로 완료되었습니다.' });
        });
    } catch (error) {
        console.error('회원가입 처리 중 오류:', error);
        return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});

//로그인 API 엔드포인트
app.post('/login', (req,res) =>{
    const {id,password}=req.body;

    //입력값 검증
    if(!id || !password){
        return res.status(400).json({message:'아이디와 비밀번호를 입력해주세요.'});
    }

    //사용자 검증
    const sql = 'SELECT * FROM users WHERE user_id= ?'
    db.query(sql, [id], async(err,result)=>{
        if(err){
            console.error('로그인 중 오류 발생:', err);
            return res.status(500).json({success:false,message:'서버 오류가 발생했습니다.'});
        }

        if(result.length === 0){
            //사용자가 존재하지 않음
            return res.status(400).json({success:false, message:'존재하지 않는 사용자입니다.'});
        }

        const user = result[0];

        //비밀번호 검증
        const match=await bcrypt.compare(password,user.user_pw);
        if(!match){
            return res.status(400).json({success:false,message:'비밀번호가 일치하지 않습니다.'});
        }

        //로그인 성공
        res.json({success:true,message:'로그인 성공'});
    })
})



// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 업로드 폴더 설정
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // 파일 이름을 현재 시간으로 설정하여 고유하게 만듭니다.
    },
});

const upload = multer({ storage: storage }); //multer 미들웨어 설정(storage 사용)



// 업로드 폴더가 없으면 생성
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 오디오 파일 업로드 API 엔드포인트
app.post('/uploads', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file); // 업로드된 파일 정보 로그 출력
    res.json({
        success: true,
        message: 'File uploaded successfully',
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`, // 클라이언트에서 접근 가능한 경로 반환
    });
});


// 정적 파일 제공
app.use('/uploads', express.static('uploads'));

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
