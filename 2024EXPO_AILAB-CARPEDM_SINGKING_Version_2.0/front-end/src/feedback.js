import React, { useEffect, useState } from "react";
import "./feedback.css";
import "./common/root.css";
import Footer from "./common/Footer";
import { Link, useLocation } from "react-router-dom";

function Feedback() {
  const location = useLocation();
  const { songTitle, artist, imagePath } = location.state || {
    songTitle: "기본 제목",
    artist: "기본 가수",
    imagePath: "./img/songs/default.png", // 기본 이미지 경로
  };

  const [scores, setScores] = useState({
    total_score: 0,
    pitch_score: 0,
    beat_score: 0,
    pronunciation_score: 0,
    mistakes: [], // 틀린 구간 (mistakes)
  });

  const [loading, setLoading] = useState(true); // Loading state to show/hide the overlay

  useEffect(() => {
    // Fetch vocal analysis data from the backend
    const fetchScores = async () => {
      try {
        const response = await fetch("http://localhost:5000/vocal_analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        // Map the response to the state
        console.log("결과값 정보", data);
        setScores({
          total_score: data["종합 점수"].toFixed(2),
          pitch_score: data["음정 점수"].toFixed(2),
          beat_score: data["박자 점수"].toFixed(2),
          pronunciation_score: data["발음 점수"].toFixed(2),
          mistakes: data["틀린 구간 초(시작, 끝)"] || [],
          wrong_lyrics: data["틀린 가사"] || [],
        });
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching vocal analysis:", error);
        setLoading(false); // Stop loading in case of error as well
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="body">
      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-message">
            <p>음성 분석 중...</p>
          </div>
        </div>
      )}

      <div className="container">
        <div className="feedback">
          <div className="header_title">평가노래</div>
          <div className="feedback_song_info feedback_component">
            <div>
              <div className="feedback_song_info_songname feedback_header">{songTitle}</div>
              <div className="feedback_song_info_singer feedback_text">{artist}</div>
            </div>

            <div className="feedback_song_info_container">
              <img className="feedback_song_info_img" src={imagePath} alt={songTitle} />
            </div>
          </div>

          <div className="header_title">종합 점수</div>
          <div className="feedback_final_score feedback_component">
            <div>
              <div className="feedback_header">{scores.total_score}점</div>
              <div className="feedback_text">
                {scores.total_score < 60 && "좀 더 연습이 필요해요! 노력하세요."}
                {scores.total_score >= 60 && scores.total_score < 80 && "좋은 점수네요! 계속해서 발전하세요."}
                {scores.total_score >= 80 && "훌륭한 점수네요! 축하드립니다."}
              </div>
            </div>
          </div>

          <div className="header_section">
            <div className="header_title part_score">파트 점수</div>
            <div className="detail_label">
              <Link
                to="/feedbackChart"
                state={{ songTitle, artist, imagePath, mistakes: scores.mistakes || [], wrongLyrics: scores.wrong_lyrics || [],
                  pitchScore: scores.pitch_score,
                  beatScore: scores.beat_score,
                  pronunciationScore: scores.pronunciation_score,
                  totalScore: scores.total_score }} // state를 따로 전달
                className="detail_link"
              >
                자세히 보기
              </Link>
            </div>
          </div>

          <div className="grow_component">
            <div className="grow_component_1">
              <img src=".\img\key.png" alt="음정 아이콘"></img>
              <br />
              음정
              <br />
              <div className="key_score">{scores.pitch_score}점</div>
            </div>
            <div className="grow_component_1">
              <img src=".\img\beat.png" alt="박자 아이콘"></img>
              <br />
              박자
              <br />
              <div className="beat_score">{scores.beat_score}점</div>
            </div>
            <div className="grow_component_1">
              <img src=".\img\pronun.png" alt="발음 아이콘"></img>
              <br />
              발음
              <br />
              <div className="pronun_score">{scores.pronunciation_score}점</div>
            </div>
          </div>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
}

export default Feedback;
