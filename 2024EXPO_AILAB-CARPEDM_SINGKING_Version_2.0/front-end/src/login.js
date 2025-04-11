import "./common/root.css";
import "./login.css";
import { Link } from "react-router-dom";

// 상세 영역 CSS는 피그마 디자인 변경 여부 존재해서 아직 주지않고 구조만 잡아줌: 조호연
// 필요한 요소만 넣어둔 상황: 조호연 (버튼은 컴포넌트화 시켜서 로그인 버튼으로 진행)
// 로그인 로직 및 유효성 검사 미구현

function Login() {
  return (
    <div className="body">
      <div className="container">
        <div className="login_main">
          <div className="login_logo">
            <img className="login_logo_img" src={"/img/logo.png"} />
          </div>
          <div className="login_area">
            <Link to={"/login_member"}>
              <div className="login_user">
                <img className="login_icon" src={"/img/user.png"} />
                회원 로그인
              </div>
            </Link>
            <div className="login_kakao">
              <img className="login_icon" src={"/img/kakao.png"} />
              카카오 로그인
            </div>
            <div className="login_google">
              <img className="login_icon" src={"/img/google.png"} />
              구글 로그인
            </div>
            <div className="login_naver">
              <img className="login_icon" src={"/img/naver.png"} />
              네이버 로그인
            </div>
            <div className="login_facebook">
              <img className="login_icon" src={"/img/facebook.png"} />
              페이스북 로그인
            </div>
            <div className="login_join_container">
              아이디 찾기&nbsp;|&nbsp;비밀번호 찾기&nbsp;|&nbsp;
              <Link to={"/join_member"}>
                <div className="login_join">회원가입</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
