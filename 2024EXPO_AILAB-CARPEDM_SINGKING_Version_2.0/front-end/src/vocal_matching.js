import React, { useState } from "react";
import Footer from "./common/Footer";
import "./common/root.css";
import "./matching.css";
import { Link } from "react-router-dom";

const vocal_matching = () => {
  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="header_title header_bottom">보컬 코치 매칭</div>
          <div className="matching_menu">
            <div className="match_left_side">
              <img className="match_user_img" src=".\img\match_user.jpg" />
            </div>
            <div className="match_bar"></div>
            <div className="match_right_side">
              <div className="match_content">
                <div className="battle_text_1">꽤꼬리</div>
                <div className="battle_text_2">보컬 코치 경험은 3년 정도 있으며</div>
                <div className="battle_text_2">현재 오프라인에서도 가르치고 있습니다.</div>
              </div>
              <div className="match_plus">
                더보기
              </div>
            </div>
          </div>
        </div>
        <Footer activeTab="matching" />
      </div>
    </div>
  );
};

export default vocal_matching;
