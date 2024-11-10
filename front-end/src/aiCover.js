import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./immediate_feedback_analyze.css";
import "./common/root.css";
import "./aiCover.css";
import Footer from "./common/Footer";

const AiCover = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const [isPaused, setIsPaused] = useState(false); // 일시 중지 상태
  const audioRef = useRef(null); // 오디오 요소 참조

  // 곡 정보 객체
  const songs = {
    hug_me: { title: "안아줘", artist: "정준일" },
    if_it_is_you: { title: "너였다면", artist: "정승환" },
    wobbly_flowers: { title: "흔들리는 꽃들 속에서 네 샴푸 향이 느껴진 거야", artist: "장범준" },
    letter_at_night: { title: "밤편지", artist: "아이유" },
    wild_flower: { title: "야생화", artist: "박효신" },
    a_blue_whale: { title: "흰수염고래", artist: "YB" },
  };

  const handleSongSelect = (song) => {
    if (selectedSong === song) {
      setSelectedSong(null); // Deselect if already selected
    } else {
      setSelectedSong(song); // Set the selected song
    }
  };

  // 오디오 재생
  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  // 오디오 일시정지
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  // 오디오 완전히 멈추기 (노래 처음으로 되돌리기)
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // 처음으로 돌아가게 설정
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="ai_training">
            <div className="header_title">AI COVER</div>

            <div className="drag_menu_component">
              <div className="drag_menu_component_1" onClick={() => handleSongSelect("hug_me")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_hug.png" alt="안아줘" />
                <div className="ai_text">
                  <p className="ai_text_1">안아줘</p>
                  <p className="ai_text_2">정준일</p>
                </div>

                {selectedSong === "hug_me" && (
                  <div className="overlay">
                    <p className="overlay_text">선택 중</p>
                  </div>
                )}
              </div>

              <div className="drag_menu_component_1" onClick={() => handleSongSelect("if_it_is_you")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_if_it_is_you.png" alt="너였다면" />
                <div className="ai_text">
                  <p className="ai_text_1">너였다면</p>
                  <p className="ai_text_2">정승환</p>
                </div>

                {selectedSong === "if_it_is_you" && (
                  <div className="overlay">
                    <p className="overlay_text">선택 중</p>
                  </div>
                )}
              </div>

              <div className="drag_menu_component_1" onClick={() => handleSongSelect("wobbly_flowers")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_wobbly_flowers.png" alt="흔들리는 꽃들 속에서 네 샴푸 향이 느껴진 거야" />
                <div className="ai_text">
                  <p className="ai_text_1">흔들리는 꽃들 속에서 네 샴푸 향이 느껴진 거야</p>
                  <p className="ai_text_2">장범준</p>
                </div>

                {selectedSong === "wobbly_flowers" && (
                  <div className="overlay">
                    <p className="overlay_text">선택 중</p>
                  </div>
                )}
              </div>
            </div>

            <div className="drag_menu_component">
              <div className="drag_menu_component_1" onClick={() => handleSongSelect("letter_at_night")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_letter_at_night.png" alt="밤편지" />
                <div className="ai_text">
                  <p className="ai_text_1">밤편지</p>
                  <p className="ai_text_2">아이유</p>
                </div>

                {selectedSong === "letter_at_night" && (
                  <div className="overlay">
                    <p className="overlay_text">선택 중</p>
                  </div>
                )}
              </div>

              <div className="drag_menu_component_1" onClick={() => handleSongSelect("wild_flower")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_wild_flower.png" alt="야생화" />
                <div className="ai_text">
                  <p className="ai_text_1">야생화</p>
                  <p className="ai_text_2">박효신</p>
                </div>

                {selectedSong === "wild_flower" && (
                  <div className="overlay">
                    <p className="overlay_text">선택 중</p>
                  </div>
                )}
              </div>

              <div className="drag_menu_component_1" onClick={() => handleSongSelect("a_blue_whale")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_a_blue_whale.png" alt="흰수염고래" />
                <div className="ai_text">
                  <p className="ai_text_1">흰수염고래</p>
                  <p className="ai_text_2">YB</p>
                </div>

                {selectedSong === "a_blue_whale" && (
                  <div className="overlay">
                    <p className="overlay_text">선택 중</p>
                  </div>
                )}
              </div>
            </div>

            <div className="training_ai_cover_component ai_message">
              <div className="ai_text">
                {/* 선택한 곡 정보 표시 */}
                <div className="ai_text_1">{selectedSong ? songs[selectedSong].title : "AI 커버"}</div>
                <p className="ai_text_2">{selectedSong ? songs[selectedSong].artist : ""}</p>
                <p className="ai_text_2">{selectedSong ? "선택 중" : "원하는 노래를 선택하면 AI 커버를 만들어줍니다"}</p>
              </div>
            </div>

            <div className="btn_container">
              {/* Play 버튼: 오디오 재생 */}
              <div className="playbtn_container">
                <img src={isPlaying ? "/img/stopbtn.png" : "/img/playbtn.png"} alt="Play or Pause Button" onClick={isPlaying ? handlePause : handleStart} />
                <p className="btn_text">{isPlaying ? "일시정지" : isPaused ? "재개" : "재생"}</p>
              </div>

              {/* Stop 버튼: 오디오 중지 */}
              <div className="stopbtn_container">
                <img src="/img/pausebtn.png" alt="Stop Button" onClick={handleStop} disabled={!isPlaying && !isPaused} />
                <p className="btn_text">정지</p>
              </div>
            </div>

            <audio ref={audioRef} src="./mr/hug_me.wav" />
          </div>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
};

export default AiCover;
