import React, { useState } from "react";
import "./common/root.css";
import "./training_tone.css";
import "./training_splash.css";
import Footer from "./common/Footer";
import Training_Splash from "./training_splash";

function Training_Tone({ onFinish, onPitchChange}) { // onFinish prop 추가
  const [tone, setTone] = useState(0);
  const [showAdjuster, setShowAdjuster] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showImmediateFeedback, setShowImmediateFeedback] = useState(false);

  const increaseTone = () => {
    setTone(prevTone => Math.min(prevTone + 1, 7));
  };

  const decreaseTone = () => {
    setTone(prevTone => Math.max(prevTone - 1, -7));
  };

  const handleConfirm = () => {
    onPitchChange(tone);
  };

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    setShowImmediateFeedback(true);
    onFinish();
  };

  if (showAdjuster) {
    return (
      <div className="splash_div">
        <div className="tone_adjuster">
          <div>키 음역대 설정</div>
          <div className="tone_Btn">
            <div className="minustoneBtn" onClick={decreaseTone}>-</div>
            <div className="tone">{tone}</div>
            <div className="addtoneBtn" onClick={increaseTone}>+</div>
          </div>
          <button className="confirmBtn" onClick={handleConfirm}>확인</button>
        </div>
        <div className="splash_Footer">
          <Footer activeTab="training"/>
        </div>
      </div>
    );
  }

  if (showCountdown) {
    return <Training_Splash onFinish={handleCountdownFinish} />;
  }

  return null;  //기본 반환값
}

export default Training_Tone;