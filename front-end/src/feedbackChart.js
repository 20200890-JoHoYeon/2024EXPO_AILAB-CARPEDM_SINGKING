import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./feedback.css";
import "./common/root.css";
import Footer from "./common/Footer";
import Chart from "react-apexcharts";

function FeedbackChart() {
  const location = useLocation();
  const { artist, songTitle } = location.state || {
    artist: "기본 가수",
    songTitle: "기본 제목",
  };

  // artist와 songTitle 값 확인
  useEffect(() => {
    console.log("Artist: ", artist);
    console.log("SongTitle: ", songTitle);
  }, [artist, songTitle]);

  const [showTuneChart, setShowTuneChart] = useState(true);
  const [showBeatChart, setShowBeatChart] = useState(true);

  // 각 차트에 대한 평가 결과 상태
  const [artistData, setArtistData] = useState([]);
  const [vocalScores, setVocalScores] = useState({
    pitchScore: 0,
    beatScore: 0,
    pronunciationScore: 0,
    totalScore: 0,
  });
  

  //그래프 데이터 저장할 상태값 초기화
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


  // 데이터 가져오는 함수
  const fetchGraphData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/graph?artist=${artist}&songTitle=${songTitle}`, {
        method: "GET",
      });
      const data = await response.json();

      // 서버에서 받은 데이터를 차트에 적용
      setTuneChartData((prevData) => ({
        ...prevData,
        series: [
          { name: "원본 음성 데이터", data: data.artist_array}, //artist_array 데이터 사용
          { name: "사용자 음성 데이터", data: data.user_array },//user_array 데이터 사용
        ],
      }));
    // 서버에서 점수 받아오기
    const scoreResponse = await fetch("http://localhost:5000/vocal_analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const scoreData = await scoreResponse.json();

    // 콘솔에 점수 출력
    console.log("음정 점수:", scoreData["음정 점수"]);
    console.log("박자 점수:", scoreData["박자 점수"]);
    console.log("발음 점수:", scoreData["발음 점수"]);
    console.log("종합 점수:", scoreData["종합 점수"]);

    // 점수 상태에 저장
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

// 피드백 메시지 결정 함수
const getFeedbackMessage = (score) => {
  if (score < 60) {
    return { header: "부족합니다!", text: "조금 더 연습이 필요해요!" };
  } else if (score >= 60 && score < 80) {
    return { header: "좋습니다!", text: "계속해서 발전하세요!" };
  } else {
    return { header: "훌륭합니다!", text: "훌륭한 점수입니다!" };
  }
};

// 컴포넌트가 마운트될 때 데이터 불러오기
useEffect(() => {
  fetchGraphData();
}, [artist, songTitle]);


  return (
    <div className="body">
      <div className="container">
        <div className="feedback">
          {/* 음정 그래프 */}
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
                <img src={`http://localhost:5000/assets/graph/${songTitle}.png`} alt="음정 그래프 이미지" 
                  style={{width:'530px',height:'350px'}}/>

              )}
            </div>
            <div>
              {/* 음정 피드백 */}
              <div className="feedback_song_info_songname feedback_header">
                {getFeedbackMessage(vocalScores.pitchScore).header}
              </div>
              <div className="feedback_song_info_singer feedback_text">
                {getFeedbackMessage(vocalScores.pitchScore).text}
              </div>
            </div>
          </div>

          {/* 박자 그래프 (임시로 동일한 데이터 사용) */}
          <div className="feedback_chart_title">
            <div className="header_title">박자 그래프</div>
            {/* <button className="feedback_chart_toggle" onClick={() => setShowBeatChart(!showBeatChart)}>
              {showBeatChart ? "이미지 보기" : "그래프 보기"}
            </button> */}
          </div>
          <div className="feedback_component feedback_chart_component">
            <div className="feedback_chart">
              {showBeatChart ? (
                //구동빈
                //<Chart options={tuneChartData.options} series={tuneChartData.series} type="line" width={500} height={350} />
                <img src={`http://localhost:5000/assets/graph/${artist}-${songTitle}-beat.png`} alt="음정 그래프 이미지" 
                style={{width:'530px',height:'350px'}}/>
              ) : (
                <img src={`http://localhost:5000/assets/graph/${artist}-${songTitle}-beat.png`} alt="음정 그래프 이미지" 
                style={{width:'530px',height:'350px'}}/>
              )}
            </div>
            <div>
              {/* 박자 피드백 */}
              <div className="feedback_song_info_songname feedback_header">
                {getFeedbackMessage(vocalScores.beatScore).header}
              </div>
              <div className="feedback_song_info_singer feedback_text">
                {getFeedbackMessage(vocalScores.beatScore).text}
              </div>
            </div>
          </div>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
}

export default FeedbackChart;