import React, { useState } from "react";
import "./common/root.css";
import "./join_member.css";
import { Link, useNavigate } from "react-router-dom";

function Join_member() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async () => {
    // 필드 검증
    if (!name || !id || !age || !gender || !password || !confirmPassword) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    //비밀번호와 비밀번호 확인 일치 여부
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id, password, age, gender }),
      });

      const data = await response.json();
      console.log(data); // Log response for debugging

      if (data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login_member");
        }, 2000); // 2초 후 이동
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      setError("서버와의 통신에 실패했습니다.");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="join_member_main">
          <div className="join_member_logo">
            <img className="join_member_logo_img" src={"/img/logo.png"} alt="logo" />
          </div>

          <div className="join_member_area">
            <h2>JOIN</h2>

            <div className="join_member_id">
              <input type="text" id="id" placeholder="ID | 아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)} />
              <br />
            </div>

            <div className="join_member_name">
              <input type="text" id="name" placeholder="NAME | 이름을 입력해주세요" value={name} onChange={(e) => setName(e.target.value)} />
              <br />
            </div>

            <div className="join_member_age">
              <input type="text" id="age" placeholder="AGE | 나이를 입력해주세요" value={age} onChange={(e) => setAge(e.target.value)} />
              <br />
            </div>

            <div className="join_member_gender">
              <label className="gender-selection-label">성별을 선택해주세요</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="m"
                className="gender-option"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male" className="gender-label">
                남
              </label>

              <input
                type="radio"
                id="female"
                name="gender"
                value="f"
                className="gender-option"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female" className="gender-label">
                여
              </label>
            </div>

            <div className="join_member_password">
              <input type="password" id="password" placeholder="PW | 비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
            </div>

            <div className="join_member_password">
              <input
                type="password"
                id="confirm_password"
                placeholder="PW | 비밀번호를 다시 입력해주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
            </div>
            <div className="join_member_user" onClick={handleJoin}>
              회원가입
            </div>
            {error && <div className="error_message">{error}</div>}
            {success && <div className="success_message">회원가입이 성공적으로 완료되었습니다!</div>}

            <div className="join_login_container">
              <Link to={"/login_member"}>
                <div className="join_login">로그인</div>
              </Link>
              &nbsp;|&nbsp;아이디 찾기&nbsp;|&nbsp;비밀번호 찾기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join_member;
