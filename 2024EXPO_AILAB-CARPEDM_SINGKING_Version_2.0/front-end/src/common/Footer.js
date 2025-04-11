import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer({ activeTab: propActiveTab }) {
  const [activeTab, setActiveTab] = useState(propActiveTab || "home");

  return (
    <div className="footer">
      <Link to="/main" onClick={() => setActiveTab("home")}>
        <div className={`home icon_area ${activeTab === "home" ? "active" : "inactive"}`}>
          <img className="icon_img" src="./img/footer_icon/home.png" alt="홈" />
          <p className="icon_name">홈</p>
        </div>
      </Link>
      <span className="icon_line"></span>
      <Link to="/training" onClick={() => setActiveTab("training")}>
        <div className={`training icon_area ${activeTab === "training" ? "active" : "inactive"}`}>
          <img className="icon_img" src="./img/footer_icon/training.png" alt="트레이닝" />
          <p className="icon_name">트레이닝</p>
        </div>
      </Link>
      <span className="icon_line"></span>
      <Link to="/matching" onClick={() => setActiveTab("matching")}>
        <div className={`matching icon_area ${activeTab === "matching" ? "active" : "inactive"}`}>
          <img className="icon_img" src="./img/footer_icon/matching.png" alt="매칭" />
          <p className="icon_name">매칭</p>
        </div>
      </Link>
      <span className="icon_line"></span>
      <Link to="/myPage" onClick={() => setActiveTab("myPage")}>
        <div className={`myPage icon_area ${activeTab === "myPage" ? "active" : "inactive"}`}>
          <img className="icon_img" src="./img/footer_icon/myPage.png" alt="마이페이지" />
          <p className="icon_name">마이페이지</p>
        </div>
      </Link>
    </div>
  );
}

export default Footer;