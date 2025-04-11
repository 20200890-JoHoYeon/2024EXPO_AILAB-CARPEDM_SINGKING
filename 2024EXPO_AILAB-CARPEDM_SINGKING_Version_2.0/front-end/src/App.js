import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Main from "./main.js";
import Training from "./training.js";
import PrecisionTraining from "./precisionTraining.js";
import ToneDiagnostics from "./toneDiagnostics.js";
import ToneDiagnosticsResult from "./toneDiagnosticsResult.js";
import AiCover from "./aiCover.js";
import Matching from "./matching.js";
import Vocal_matching from "./vocal_matching.js";
import MyPage from "./myPage.js";
import Login from "./login.js"; // Login 컴포넌트 임포트
import Immediate_feedback_analyze from "./immediate_feedback_analyze.js";
import Login_member from "./login_member.js";
import Join_member from "./join_member.js";
import Feedbacklist_member from "./feedbacklist_member.js";
import Feedback from "./feedback.js";
import WrongPart from "./wrongPart.js";
import FeedbackChart from "./feedbackChart.js";
import ScaleAnalyze from "./scale_analyze.js";
import Training_Splash from "./training_splash.js";
import Training_Tone from "./training_tone.js";

function App() {
  //임시 변수: 로그인 아닌 경우 메인페이지 이전에 로그인 페이지 실행되도록 하기 위함: 조호연
  //let loginYn = "N";

  // return <div className="App">{loginYn === "N" ? <Login /> : <Main />}</div>;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/login_member" element={<Login_member />}></Route>
          <Route path="/join_member" element={<Join_member />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/training" element={<Training />}></Route>
          <Route path="/precisionTraining" element={<PrecisionTraining />}></Route>
          <Route path="/toneDiagnostics" element={<ToneDiagnostics />}></Route>
          <Route path="/toneDiagnosticsResult" element={<ToneDiagnosticsResult />}></Route>
          <Route path="/aiCover" element={<AiCover />}></Route>
          <Route path="/matching" element={<Matching />}></Route>
          <Route path="/vocal_matching" element={<Vocal_matching />}></Route>
          <Route path="/myPage" element={<MyPage />}></Route>
          <Route path="/immediate_feedback_analyze" element={<Immediate_feedback_analyze />}></Route>
          <Route path="/Feedbacklist_member" element={<Feedbacklist_member />}></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/wrongPart" element={<WrongPart />}></Route>
          <Route path="/feedbackChart" element={<FeedbackChart />}></Route>
          <Route path="/scale_analyze" element={<ScaleAnalyze />}></Route>
          <Route path="/training_splash" element={<Training_Splash />}></Route>
          <Route path="/training_tone" element={<Training_Tone/>}></Route>
          <Route path="/" element={<Navigate to="/login" />} /> {/*기본 경로 /login으로 설정 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
