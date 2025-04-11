import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer";
import "./common/root.css";
import "./training.css";
import "./toneDiagnostics.css";

const ToneDiagnostics = () => {
  const [isPlaying, setIsPlaying] = useState(false); // 녹음 상태
  const mediaRecorderRef = useRef(null); // MediaRecorder 참조
  const [recordedChunks, setRecordedChunks] = useState([]); // 녹음된 데이터 저장
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [result, setResult] = useState(null);

  // 녹음 시작 함수
  const handleStart = async () => {
    console.log("녹음이 시작되었습니다.");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder; // mediaRecorderRef에 녹음기 저장

      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setRecordedChunks(chunks);
        console.log("녹음된 데이터 Blob:", blob);
        uploadToServer(blob); // 녹음이 멈추면 서버로 업로드
      };

      recorder.start();
      setIsPlaying(true);
      console.log("녹음 및 재생 시작");
    } catch (error) {
      console.error("녹음 시작 오류:", error);
    }
  };

  // 녹음 종료 함수
  const handleStop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsPlaying(false);
      console.log("녹음이 종료되었습니다.");
      // useEffect를 사용해 result가 업데이트되면 navigate를 호출 // result가 변경될 때마다 실행
    }
  };

  // 재생 상태에 따른 토글 함수
  const handleToggle = () => {
    if (isPlaying) {
      // 녹음이 진행 중일 때 클릭하면 종료
      handleStop();
    } else {
      // 녹음이 멈춘 상태에서 클릭하면 시작
      handleStart();
    }
    setIsPlaying((prevState) => !prevState); // 토글 상태 전환
  };

  // 서버로 녹음된 파일 전송 함수
  const uploadToServer = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "tone.wav"); // 서버에 파일로 전송

    try {
      const response = await fetch("http://localhost:5000/uploads/tone", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      const result = await response.json();
      console.log("서버 응답:", result);
      setResult(result);
    } catch (error) {
      console.error("서버로 파일 업로드 실패:", error);
    }
  };

  useEffect(() => {
    if (result) {
      // result가 있을 경우에만 페이지를 이동
      navigate("/toneDiagnosticsResult", { state: { result } });
    }
  }, [result]);

  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="tone_diagnostics">
            <div className="header_title">AI 음색 진단</div>
            <div className="tone_diagnostics_component tone_diagnostics_mid_component">
              <div className="tone_diagnostics_lp_area">
                <img
                  className={`tone_diagnostics_lp ${isPlaying ? "tone_diagnostics_lp_animation" : ""}`}
                  src="./img/tone_diagnostics_lp.png"
                  alt="ai cover 이미지"
                />
                <img className="tone_diagnostics_player" src="./img/tone_diagnostics_player.png" alt="ai cover 이미지" />
                <p className="ai_text_2 tone_diagnostics_text">음색은 발라드, 락, 트로트, 댄스 4가지로 구분합니다</p>
              </div>
            </div>
            <p className="ai_text_2 tone_diagnostics_text">{isPlaying ? "AI 분석용 녹음이 진행 중입니다" : "버튼을 누르고 아무 노래 한 소절을 불러주세요"}</p>
            <div
              className="tone_diagnostics_component tone_recording_button"
              onClick={handleToggle} // 클릭하면 토글 함수 호출
            >
              <img className="tone_cover_img" src={isPlaying ? "/img/ai_precise_img_1_stop.png" : "/img/ai_precise_img_1.png"} alt="ai cover 이미지" />
            </div>
          </div>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
};

export default ToneDiagnostics;