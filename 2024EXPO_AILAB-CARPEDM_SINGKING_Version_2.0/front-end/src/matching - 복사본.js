import { useState, useEffect } from "react";
import Footer from "./common/Footer";
import "./common/root.css";
import "./main.css";

const Matching = () => {
  const [userData, setUserData] = useState({
    level: 0,
    pitch: 0,
    beat: 0,
    tone: "진단필요",
  });

  const [userName, setUserName] = useState("게스트");

  useEffect(() => {
    // Fetch vocal data and user name from index endpoint
    fetch("http://localhost:5000/index", {
      method: "GET",
      credentials: "include", // Include session credentials
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Update user data and user name
          setUserData({
            level: data.user_level || 0,
            pitch: data.pitch_score || 0,
            beat: data.beat_score || 0,
            tone: data.user_tone || "진단필요",
          });
          setUserName(data.user_name || "게스트");
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="singing_battle">
            <div className="singking_battle_title">MATCHING</div>

            <div className="mypage_component">
              <div className=" mypage_tone_area">
                <div>
                  <div className="battle_text_1">{userName}</div>
                  <div className="mypage_tone_logo"># {userData.tone}</div>
                </div>
                <img src=".\img\mypage_user_icon.png" className="mypage_user_icon" alt="배틀 이미지" />
              </div>
            </div>

            <div className="singking_battle_title">매칭 메뉴</div>
            <div className="battle_component">
              <div className="battle_text">
                <span className="battle_text_1">보컬 코치 매칭</span>
                <span className="battle_text_2">전문 보컬 코치가 내 노래를 코칭 해줍니다</span>
              </div>
            </div>

            <div className="battle_component">
              <div className="battle_text">
                <span className="battle_text_1">보컬 코치 등록</span>
                <span className="battle_text_2">전문 보컬 코치가 되어 노래를 가르칠 수 있습니다</span>
              </div>
            </div>

            <div className="battle_component">
              <div className="battle_text">
                <span className="battle_text_1">매칭 기록</span>
                <span className="battle_text_2">코칭을 진행한 매칭 기록을 확인할 수 있습니다</span>
              </div>
            </div>
          </div>
        </div>
        <Footer activeTab="matching" />
      </div>
    </div>
  );
};

export default Matching;
