import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./common/Footer";
import "./common/root.css";
import "./main.css";

const MyPage = () => {
  const [userData, setUserData] = useState({
    level: 5,
    pitch: 0,
    beat: 0,
    tone: "진단필요",
  });

  const [userName, setUserName] = useState("게스트");
  const navigate = useNavigate(); // To programmatically navigate

  // Fetch user data and user name when the component mounts
  useEffect(() => {
    // Fetch vocal data
    fetch("http://localhost:5000/my_page")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching vocal data:", error);
      });

      fetch("http://localhost:5000/index", {
        method: "GET",
        credentials: "include", // Include session credentials
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            // Update user data from the response
            setUserData({
              level: 5,
              pitch: data.pitch_score,
              beat: data.beat_score,
              tone: data.user_tone,
            });
            // Set user name
            setUserName(data.user_name);
          } else {
            console.error("Failed to fetch user data");
          }
        })
      .catch((error) => {
        console.error("Error fetching user name:", error);
      });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include", // Include credentials (if any like cookies)
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to login page on successful logout
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="singing_battle">
            <div className="singking_battle_title">MYPAGE</div>

            <div className="mypage_component">
              <div className="mypage_tone_area">
                <div>
                  <div className="battle_text_1">{userName}</div>
                  <div className="mypage_tone_logo"># {userData.tone}</div>
                </div>
                <img src=".\img\mypage_user_icon.png" className="mypage_user_icon" alt="배틀 이미지" />
              </div>
            </div>

            <div className="singking_grow">
              <div className="singking_grow_title">보컬 데이터 확인</div>
              <div className="grow_component">
                <div className="grow_component_1">
                  <br />
                  <span className="battle_text_1">레벨</span>
                  <br />
                  <div className="key_score graph_area">
                    <div className="graph_text">{userData.level}</div>
                    <div
                      className="graph_bar"
                      style={{
                        height: `${(userData.level / 100) * 100}%`, // Calculate height based on level
                      }}
                    ></div>
                  </div>
                </div>
                <div className="grow_component_1">
                  <br />
                  <span className="battle_text_1">음정</span>
                  <br />
                  <div className="beat_score graph_area">
                    <div className="graph_text">{userData.pitch}</div>
                    <div
                      className="graph_bar"
                      style={{
                        height: `${(userData.pitch / 100) * 100}%`, // Calculate height based on pitch
                      }}
                    ></div>
                  </div>
                </div>
                <div className="grow_component_1">
                  <br />
                  <span className="battle_text_1">박자</span>
                  <br />
                  <div className="pronun_score graph_area">
                    <div className="graph_text">{userData.beat}</div>
                    <div
                      className="graph_bar"
                      style={{
                        height: `${(userData.beat / 100) * 100}%`, // Calculate height based on beat
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="battle_component">
              <div className="battle_text">
                <span className="battle_text_1">트레이닝 기록</span>
                <span className="battle_text_2">음정 점수 기록, 박자 점수 기록, 발음 점수 기록</span>
              </div>
            </div>

            <div className="battle_component">
              <div className="battle_text">
                <span className="battle_text_1">설정</span>
                <span className="battle_text_2">회원정보, 멤버십, 공지사항, 고객센터</span>
              </div>
            </div>

            <div className="battle_component" onClick={handleLogout}>
              <div className="battle_text">
                <span className="battle_text_1">로그아웃</span>
                <span className="battle_text_2">서비스 사용 종료</span>
              </div>
            </div>
          </div>
        </div>

        <Footer activeTab="myPage" />
      </div>
    </div>
  );
};

export default MyPage;
