import Footer from "./common/Footer";
import "./common/root.css";
import "./training.css";
import { Link } from "react-router-dom";
const Training = () => {
  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="ai_training">
            <div className="header_title">AI 기초 진단</div>

            <div className="drag_menu_component drag_menu_component_ai">
              <Link to="/toneDiagnostics">
                <div className="drag_menu_component_1 drag_menu_component_1_mid">
                  <img className="ai_diagnosis_img" src=".\img\ai_diagnosis_img_1.png" alt="AI 진단 이미지1" />
                  <div className=" ai_text">
                    <p className="ai_text_1">음색 진단하기</p>
                    <p className="ai_text_2">
                      AI가 어떤 음색인지 분석해주고 <br></br> 노래추천까지 해줍니다
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/scale_analyze">
                <div className="drag_menu_component_1 drag_menu_component_1_mid">
                  <img className="ai_diagnosis_img" src=".\img\ai_diagnosis_img_2.png" alt="AI 진단 이미지2" />
                  <div className=" ai_text">
                    <p className="ai_text_1">음역대 진단하기</p>
                    <p className="ai_text_2">
                      AI를 통해 사용자의 안정적인 <br></br> 음역대를 확인할 수 있습니다
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* <div className="header_title">AI 기초 트레이닝</div>

            <div className="drag_menu_component drag_menu_component_ai">
              <div className="drag_menu_component_1 drag_menu_component_1_long">
                <img className="ai_diagnosis_img" src=".\img\ai_training_img_1.png" alt="AI 트레이닝 이미지1" />
                <div className=" ai_text">
                  <p className="ai_text_1">복식 호흡 연습</p>
                  <p className="ai_text_2">
                    AI가 복식 호흡을 올바르게 <br></br> 하고 있는지 피드백 해줍니다
                  </p>
                </div>
              </div>
              <div className="drag_menu_component_1 drag_menu_component_1_long">
                <img className="ai_diagnosis_img" src=".\img\ai_training_img_2.png" alt="AI 트레이닝 이미지2" />
                <div className=" ai_text">
                  <p className="ai_text_1">발성 연습</p>
                  <p className="ai_text_2">
                    AI를 통해 사용자의 안정적인 <br></br> 음역대를 확인할 수 있습니다
                  </p>
                </div>
              </div>
            </div> */}

            <div className="header_title">정밀 트레이닝</div>
            <Link to="/precisionTraining">
              <div className="training_ai_cover_component " style={{marginBottom: '25px'}}>
                <img className="ai_cover_img" src=".\img\ai_precise_img_1.png" alt="정밀 트레이닝 이미지" />
                <p className="ai_text_2">노래를 선택하여 정밀 트레이닝을 받을 수 있습니다</p>
              </div>
            </Link>
            

            {/* <div className="drag_menu_component drag_menu_component_ai">
              <Link to="/precisionTraining">
                <div className="drag_menu_component_1 drag_menu_component_1_short">
                  <img className="ai_precise_img" src=".\img\ai_precise_img_1.png" alt="정밀 이미지1" />
                  <div className=" ai_text">
                    <p className="ai_text_1">실내 환경</p>
                  </div>
                </div>
              </Link>
              <Link to="/precisionTraining">
                <div className="drag_menu_component_1 drag_menu_component_1_short">
                  <img className="ai_precise_img" src=".\img\ai_precise_img_2.png" alt="정밀 이미지2" />
                  <div className=" ai_text">
                    <p className="ai_text_1">노래방 환경</p>
                  </div>
                </div>
              </Link>
            </div> */}

            <div className="header_title">AI COVER</div>
            <Link to="/aiCover">
              <div className="training_ai_cover_component ">
                <img className="ai_cover_img" src=".\img\ai_cover.png" alt="ai cover 이미지" />
                <p className="ai_text_2">AI가 유명 가수의 스타일로 커버해줍니다</p>
              </div>
            </Link>
          </div>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
};

export default Training;
