import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./feedback.css";
import "./common/root.css";
import Footer from "./common/Footer";
import Chart from "react-apexcharts";

function FeedbackChart() {
  const location = useLocation();
  const { artist, songTitle, imagePath, mistakes } = location.state || {
    artist: "기본 가수",
    songTitle: "기본 제목",
    imagePath: "./img/songs/default.png", // 기본 이미지 경로
    mistakes: [], // Default empty array for mistakes
  };

  const [showTuneChart, setShowTuneChart] = useState(true);
  const [showBeatChart, setShowBeatChart] = useState(true);

  const [vocalScores, setVocalScores] = useState({
    pitchScore: 0,
    beatScore: 0,
    pronunciationScore: 0,
    totalScore: 0,
  });

  const [tuneChartData, setTuneChartData] = useState({
    series: [
      { name: "원본 음성 데이터", data: [] },
      { name: "사용자 음성 데이터", data: [] },
    ],
    options: {
      chart: { zoom: { enabled: true } },
      dataLabels: { enabled: true },
      stroke: { curve: "smooth" },
      fill: { opacity: [0.4, 1] },
      xaxis: {},
      tooltip: { enabled: true },
    },
  });

  const fetchGraphData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/graph?artist=${artist}&songTitle=${songTitle}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      setTuneChartData((prevData) => ({
        ...prevData,
        series: [
          { name: "원본 음성 데이터", data: data.artist_array },
          { name: "사용자 음성 데이터", data: data.user_array },
        ],
      }));

      const scoreResponse = await fetch("http://localhost:5000/vocal_analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const scoreData = await scoreResponse.json();

      setVocalScores({
        pitchScore: scoreData["음정 점수"],
        beatScore: scoreData["박자 점수"],
        pronunciationScore: scoreData["발음 점수"],
        totalScore: scoreData["종합 점수"],
      });
    } catch (error) {
      console.error("Error fetching graph or score data:", error);
    }
  };

  const getFeedbackMessage = (score) => {
    if (score < 60) {
      return { header: "부족합니다!", text: "조금 더 연습이 필요해요!" };
    } else if (score >= 60 && score < 80) {
      return { header: "좋습니다!", text: "계속해서 발전하세요!" };
    } else {
      return { header: "훌륭합니다!", text: "훌륭한 점수입니다!" };
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, [artist, songTitle]);

  return (
    <div className="body">
      <div className="container">
        <div className="feedback">
          <div className="feedback_chart_title">
            <div className="header_title">음정 그래프</div>
            <button className="feedback_chart_toggle" onClick={() => setShowTuneChart(!showTuneChart)}>
              {showTuneChart ? "이미지 보기" : "그래프 보기"}
            </button>
          </div>
          <div className="feedback_component feedback_chart_component">
            <div className="feedback_chart">
              {showTuneChart ? (
                <Chart options={tuneChartData.options} series={tuneChartData.series} type="line" width={500} height={350} />
              ) : (
                <img src={`http://localhost:5000/assets/graph/${songTitle}.png`} alt="음정 그래프 이미지" style={{ width: "530px", height: "350px" }} />
              )}
            </div>
            <div>
              <div className="feedback_song_info_songname feedback_header">{getFeedbackMessage(vocalScores.pitchScore).header}</div>
              <div className="feedback_song_info_singer feedback_text">{getFeedbackMessage(vocalScores.pitchScore).text}</div>
            </div>
          </div>

          <div className="feedback_chart_title">
            <div className="header_title">박자 그래프</div>
            <button className="feedback_chart_toggle" onClick={() => setShowBeatChart(!showBeatChart)}>
              {showBeatChart ? "이미지 보기" : "그래프 보기"}
            </button>
          </div>
          <div className="feedback_component feedback_chart_component">
            <div className="feedback_chart">
              {showBeatChart ? (
                <Chart options={tuneChartData.options} series={tuneChartData.series} type="line" width={500} height={350} />
              ) : (
                <img
                  src={`http://localhost:5000/assets/graph/${artist}-${songTitle}-beat.png`}
                  alt="박자 그래프 이미지"
                  style={{ width: "530px", height: "350px" }}
                />
              )}
            </div>
            <div>
              <div className="feedback_song_info_songname feedback_header">{getFeedbackMessage(vocalScores.beatScore).header}</div>
              <div className="feedback_song_info_singer feedback_text">{getFeedbackMessage(vocalScores.beatScore).text}</div>
            </div>
          </div>

          <Link to="/wrongPart" state={{ songTitle, artist, imagePath, mistakes }} className="detail_link">
            <div className="header_title">틀린 구간</div>
            <div className="wrong_part feedback_component">
              <div>
                <div className="feedback_header">확인 및 연습</div>
                <div className="feedback_text">부족한 부분을 다시 연습해보세요</div>
              </div>
            </div>
          </Link>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
}

export default FeedbackChart;
