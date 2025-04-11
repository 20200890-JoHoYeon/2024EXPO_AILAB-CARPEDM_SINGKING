import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./immediate_feedback_analyze.css";
import "./wrongPart.css";
import "./common/root.css";
import Footer from "./common/Footer";

const WrongPart = () => {
  const location = useLocation();
  const { songTitle, artist, imagePath, mistakes, wrongLyrics } = location.state || {
    songTitle: "기본 제목",
    artist: "기본 가수",
    imagePath: "./img/songs/default.png",
    mistakes: [],
    wrongLyrics: [],
  };

  const [showLyrics, setShowLyrics] = useState(new Array(mistakes.length).fill(false));
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentTimes, setCurrentTimes] = useState(new Array(mistakes.length).fill(0));
  const [isPlaying, setIsPlaying] = useState(new Array(mistakes.length).fill(false));

  const audioFilePath = `./mr/${artist}-${songTitle}.wav`;

  const togglePlayPause = (index) => {
    if (isPlaying[index]) {
      currentAudio.pause();
      const newCurrentTimes = [...currentTimes];
      newCurrentTimes[index] = currentAudio.currentTime;
      setCurrentTimes(newCurrentTimes);
      setCurrentAudio(null);
      updateIsPlaying(index, false);
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const newAudio = new Audio(audioFilePath);
      newAudio.currentTime = mistakes[index][0];
      setCurrentAudio(newAudio);
      newAudio.play();
      updateIsPlaying(index, true);

      newAudio.ontimeupdate = () => {
        if (newAudio.currentTime >= mistakes[index][1]) {
          newAudio.pause();
          updateIsPlaying(index, false);
          setCurrentAudio(null);
        }
      };

      newAudio.onended = () => {
        updateIsPlaying(index, false);
        const newCurrentTimes = [...currentTimes];
        newCurrentTimes[index] = 0;
        setCurrentTimes(newCurrentTimes);
        setCurrentAudio(null);
      };
    }
  };

  const updateIsPlaying = (index, playing) => {
    const newIsPlaying = new Array(mistakes.length).fill(false);
    if (playing) {
      newIsPlaying[index] = true;
    }
    setIsPlaying(newIsPlaying);
  };

  const handlePauseClick = (index) => {
    if (currentAudio) {
      currentAudio.pause();
      const newCurrentTimes = [...currentTimes];
      newCurrentTimes[index] = 0;
      setCurrentTimes(newCurrentTimes);
      setCurrentAudio(null);
      updateIsPlaying(index, false);
    }
  };

  const toggleLyrics = (index) => {
    const updatedShowLyrics = [...showLyrics];
    updatedShowLyrics[index] = !updatedShowLyrics[index];
    setShowLyrics(updatedShowLyrics);
  };

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
              <div className="wrong_details">
                <div className="wrong_name">{songTitle}</div>
                <div className="wrong_artist">{artist} - 파트 {index + 1}</div>
              </div>

              <div className="wrong_play_Btn">
                <img
                  className="wrong_play_img"
                  src={isPlaying[index] ? "/img/stopbtn.png" : "/img/playbtn.png"}
                  alt={isPlaying[index] ? "stop" : "play"}
                  onClick={() => togglePlayPause(index)}
                />
                <img
                  className="wrong_pause_img"
                  src={"/img/pausebtn.png"}
                  alt="pause"
                  onClick={() => handlePauseClick(index)}
                />
                
                <div className="wrong_segment">
                  
                  구간: {segment[0]}초 ~ {segment[1]}초
                 
                </div>
                <button onClick={() => toggleLyrics(index)} className="more_button">
                  {showLyrics[index] ? "접기" : "더보기"}
                </button>
              </div>

              {showLyrics[index] && (
                <div className="wrong_lyrics">
                  {Array.isArray(wrongLyrics[index]) ? (
                    wrongLyrics[index].map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))
                  ) : (
                    <p>{wrongLyrics[index] || "가사가 없습니다."}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
};

export default WrongPart;