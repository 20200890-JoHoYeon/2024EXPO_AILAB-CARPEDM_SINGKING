import Footer from "./common/Footer";
import "./common/root.css";
import "./matching.css";
import React from 'react';
import { Link } from "react-router-dom";

const Matching = () => {
  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="header_title header_bottom">MATCHING</div>
          <div className="mypage_component">
              <div className="mypage_tone_area">
                <div>
                  <div className="battle_text_1">구동빈</div>
                  <div className="mypage_tone_logo"># 발라드</div>
                </div>
                <img src=".\img\mypage_user_icon.png" className="mypage_user_icon" alt="배틀 이미지" />
              </div>
            </div>
          <div className="header_title header_bottom">매칭 메뉴</div>
          <Link to="/vocal_matching">
            <div className="battle_component">
                <div className="battle_text">
                  <div className="battle_text_1">보컬 코치 매칭</div>
                  <div className="battle_text_2">전문 보컬 코치가 내 노래를 코칭합니다</div>
              </div>
            </div>
          </Link>
          <div className="battle_component">
              <div className="battle_text">
                <div className="battle_text_1">보컬 코치 등록</div>
                <div className="battle_text_2">전문 보컬 코치가 되어 노래를 가르칠 수 있습니다.</div>
              </div>
          </div>
          <div className="battle_component">
              <div className="battle_text">
                <div className="battle_text_1">매칭 기록</div>
                <div className="battle_text_2">코칭을 진행한 매칭 기록을 확인할 수 있습니다.</div>
            </div>
          </div>
        </div>
        <Footer activeTab="matching" />
      </div>
    </div>
  );
};

export default Matching;
