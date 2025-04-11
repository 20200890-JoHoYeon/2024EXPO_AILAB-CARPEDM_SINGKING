import React, { useState, useEffect } from "react";
import "./common/root.css";
import "./training_splash.css";
import Footer from "./common/Footer";

function Training_Splash({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(timer);
          return 0; // 카운트를 0으로 설정
        }
      });
    }, 1000);

    return () => clearInterval(timer); // 타이머를 정리하는 cleanup 함수
  }, []);

  useEffect(() => {
    if (count === 0) {
      onFinish(); // 카운트가 0일 때 onFinish 호출
    }
  }, [count, onFinish]); // count가 0이 되었을 때만 onFinish를 호출

  return (
    <div className="splash_div">
      <div className="countdown">{count === 0 ? "시작!" : count}</div>
      <div className="splash_Footer">
        <Footer activeTab="training"/>
      </div>
    </div>
  );
}

export default Training_Splash;
