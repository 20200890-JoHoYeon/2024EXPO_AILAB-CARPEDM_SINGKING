import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./immediate_feedback_analyze.css";
import "./wrongPart.css";
import "./common/root.css";
import Footer from "./common/Footer";

const WrongPart = () => {
  const location = useLocation();
  const { songTitle, artist, imagePath, mistakes } = location.state || {
    songTitle: "기본 제목",
    artist: "기본 가수",
    imagePath: "./img/songs/default.png",
    mistakes: [],
  };

  // 오디오 파일 경로
  const audioFilePath = `./mr/${artist}-${songTitle}.wav`;

  const [currentAudio, setCurrentAudio] = useState(null); // 현재 재생 중인 오디오
  const [currentTimes, setCurrentTimes] = useState(
    new Array(mistakes.length).fill(0)
  ); // 각 구간별로 멈춘 시간 저장
  const [isPlaying, setIsPlaying] = useState(
    new Array(mistakes.length).fill(false)
  ); // 각 구간의 재생 상태 관리

  const togglePlayPause = (index) => {
    if (isPlaying[index]) {
      // 재생 중이면 일시정지
      currentAudio.pause();
      const newCurrentTimes = [...currentTimes];
      newCurrentTimes[index] = currentAudio.currentTime; // 현재 재생 시간을 저장
      setCurrentTimes(newCurrentTimes);
      setCurrentAudio(null);
      updateIsPlaying(index, false);
    } else {
      // 다른 구간이 재생 중이면 멈춤
      if (currentAudio) {
        currentAudio.pause();
      }

      const newAudio = new Audio(audioFilePath); // 동일한 오디오 파일 사용

      // 특정 구간부터 재생
      newAudio.currentTime = mistakes[index][0]; // 시작 시간 설정

      setCurrentAudio(newAudio);
      newAudio.play();
      updateIsPlaying(index, true);

      // 오디오가 종료되거나 구간이 끝나면 상태 초기화
      newAudio.ontimeupdate = () => {
        if (newAudio.currentTime >= mistakes[index][1]) {
          newAudio.pause(); // 끝 구간에서 일시정지
          updateIsPlaying(index, false);
          setCurrentAudio(null);
        }
      };

      newAudio.onended = () => {
        updateIsPlaying(index, false);
        const newCurrentTimes = [...currentTimes];
        newCurrentTimes[index] = 0; // 끝나면 다시 처음으로 초기화
        setCurrentTimes(newCurrentTimes);
        setCurrentAudio(null);
      };
    }
  };

  // 상태 초기화 함수
  const updateIsPlaying = (index, playing) => {
    const newIsPlaying = new Array(mistakes.length).fill(false);
    if (playing) {
      newIsPlaying[index] = true;
    }
    setIsPlaying(newIsPlaying);
  };

  // 정지 버튼을 눌렀을 때(맨 처음으로 돌아가기)
  const handlePauseClick = (index) => {
    if (currentAudio) {
      currentAudio.pause();
      const newCurrentTimes = [...currentTimes];
      newCurrentTimes[index] = 0; // 항상 재생 위치를 처음으로 초기화
      setCurrentTimes(newCurrentTimes);
      setCurrentAudio(null); // 현재 오디오를 null로 설정
      updateIsPlaying(index, false);
    }
  };

  // 컴포넌트가 언마운트될 때 오디오 정지
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

  return (
    <div className="body">
      <div className="container">
        <div className="song_container">
          <div className="header_title">틀린 구간</div>
          {mistakes.map((segment, index) => (
            <div key={index} className="wrong_part_container">
              <div className="song_img">
                <img src={imagePath} alt={songTitle} />
              </div>
              <div>
                <div className="wrong_name">{songTitle}</div>
                <div className="wrong_artist">{artist} - 파트 {index + 1}</div>
              </div>

              <div className="wrong_play_Btn">
                {/* 재생 버튼 */}
                <img
                  className="wrong_play_img"
                  src={isPlaying[index] ? "/img/stopbtn.png" : "/img/playbtn.png"}
                  alt={isPlaying[index] ? "stop" : "play"}
                  onClick={() => togglePlayPause(index)}
                />
                {/* 정지 버튼 */}
                <img
                  className="wrong_pause_img"
                  src={"/img/pausebtn.png"}
                  alt="pause"
                  onClick={() => handlePauseClick(index)}
                />
              </div>
              {/* 틀린 구간 정보 */}
              <div className="wrong_segment">
                구간: {segment[0]}초 ~ {segment[1]}초
              </div>
            </div>
          ))}
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
};

export default WrongPart;
