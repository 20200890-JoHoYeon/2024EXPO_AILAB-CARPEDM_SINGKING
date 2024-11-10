import React, { useState, useEffect } from "react";
import Footer from "./common/Footer";
import { Link, useLocation } from "react-router-dom";
import "./common/root.css";
import "./training.css";
import "./toneDiagnostics.css";

const ToneDiagnosticsResult = () => {
  const location = useLocation();
  const result = location.state?.result; // 받아온 result

  // AI 결과와 이미지
  const ai_result = {
    ballade: { 
      result_img: "./img/singers/cover_jung_seung_hwan_big.png", 
      result_content: "따뜻하고 감성적인 발라드형 음색입니다." 
    },
    dance: { 
      result_img: "./img/singers/cover_hwasa_big.png", 
      result_content: "음색이 뚜렷한 댄스형 음색입니다." 
    },
    rock: { 
      result_img: "./img/singers/cover_yoon_do_hyun_big.png", 
      result_content: "음역대가 높고 안정적인 호흡의 락형 음색입니다." 
    },
    Trot: { 
      result_img: "./img/singers/cover_lim_young_woong_big.png", 
      result_content: "독특하고 간드러지는 음색의 트로트형 음색입니다." 
    },
  };

  const [selectedTone, setSelectedTone] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    if (result) {
      // result.result 값에 따라 tone 설정
      const toneMapping = {
        '발라드': 'ballade',
        '댄스': 'dance',
        '락': 'rock',
        '트로트': 'Trot'
      };
      const toneKey = toneMapping[result.result]; // result에서 tone 키 가져오기
      setSelectedTone(toneKey); // tone 설정
      setSelectedSong(result); // 추천 곡과 아티스트 설정
    }
  }, [result]);

  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="tone_diagnostics">
            <div className="header_title">AI 음색 진단 결과</div>
            <div className="tone_diagnostics_component tone_diagnostics_result_component tone_margin tone_border">
              {selectedTone && ai_result[selectedTone] ? (
                <>
                  <img
                    className="tone_diagnostics_result_img"
                    src={ai_result[selectedTone].result_img}
                    alt="AI cover 이미지"
                  />
                  <p className="ai_text_2 tone_diagnostics_text">
                    {ai_result[selectedTone].result_content}
                  </p>
                </>
              ) : (
                <p>로딩 중...</p>
              )}
            </div>
            <div className="header_title">AI 음색 추천 곡</div>
            <div className="tone_diagnostics_component tone_diagnostics_result_component tone_border">
              <div>
                {selectedSong ? ( 
                  <>
                    <div className="ai_text_1 tone_text_1">{selectedSong.recommend}</div>
                    <div className="ai_text_2">{selectedSong.artist}</div>
                    <img
                      className="tone_diagnostics_result_img"
                      src={selectedSong.image} 
                      alt={`${selectedSong.recommend} cover`}
                    />
                  </>
                ) : (
                  <p>추천 곡이 없습니다.</p>
                )}
              </div>
            </div>

            <div className="drag_menu_component drag_menu_component_ai">
              {/* <Link to="/immediate_feedback_analyze"> */}
                <div className="drag_menu_component_1 drag_menu_component_1_short tone_border">
                  <img
                    className="ai_precise_img"
                    src=".\img\ai_precise_img_1.png"
                    alt="정밀 이미지1"
                  />
                  <div className="ai_text">
                    <p className="ai_text_1">추천 곡 트레이닝</p>
                  </div>
                </div>
              {/* </Link> */}
              <Link to="/toneDiagnostics">
                <div className="drag_menu_component_1 drag_menu_component_1_short tone_border">
                  <img
                    className="ai_precise_img"
                    src=".\img\ai_precise_img_3.png"
                    alt="정밀 이미지3"
                  />
                  <div className="ai_text">
                    <p className="ai_text_1">재진단</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
};

export default ToneDiagnosticsResult;
