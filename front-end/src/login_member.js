import React, { useState } from "react";
import "./common/root.css";
import "./login_member.css";
import { Link, useNavigate } from "react-router-dom";

function Login_member() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 필드 검증
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.status === "success") {
        // 로그인 성공 시 메인 페이지로 이동
        navigate("/main");
      } else {
        // 로그인 실패 시 오류 메시지 표시
        setError(data.message);
        alert(data.message); // 경고창 표시
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      setError("서버와의 통신에 실패했습니다.");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="login_member_main">
          <div className="login_member_logo">
            <img className="login_member_logo_img" src={"/img/logo.png"} alt="logo" />
          </div>
          <div className="login_member_area">
            <h2>LOGIN</h2>
            <div className="login_member_username">
              <input type="text" id="username" placeholder="ID | 아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)} />
              <br />
            </div>
            <div className="login_member_password">
              <input type="password" id="password" placeholder="PW | 비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="login_member_user" onClick={handleLogin}>
              로그인
            </div>
            {error && <div className="error_message">{error}</div>}

            <div className="login_join_container">
              <Link to={"/join_member"}>
                <div className="login_join">회원가입</div>
              </Link>
              &nbsp;|&nbsp;아이디 찾기&nbsp;|&nbsp;비밀번호 찾기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login_member;
