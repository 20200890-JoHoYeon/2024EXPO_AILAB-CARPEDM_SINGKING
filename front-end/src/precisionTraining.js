import {useNavigate } from "react-router-dom";
import Footer from "./common/Footer";
import "./common/root.css";
import "./training.css";

const PrecisionTraining = () => {
  const navigate=useNavigate();
  
  // 노래 클릭 시 제목, 가수, 이미지 경로 정보를 전달하는 함수
  const handleSongClick = (songTitle, artist, imagePath) => {
    navigate("/immediate_feedback_analyze", {
      state: { songTitle, artist, imagePath },
    });
  };

  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="ai_training">
            <div className="header_title">최근 연습한 노래</div>

            <div className="drag_menu_component">
              
              <div className="drag_menu_component_1" onClick={() =>handleSongClick("안아줘", "정준일", "./img/songs/cover_hug.png")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_hug.png" alt="안아줘" />
                <div className="ai_text">
                  <p className="ai_text_1">안아줘</p>
                  <p className="ai_text_2">정준일</p>
                </div>
              </div>

              <div className="drag_menu_component_1" onClick={() =>handleSongClick("너였다면", "정승환", "./img/songs/cover_if_it_is_you.png")}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_if_it_is_you.png" alt="안아줘" />
                <div className="ai_text">
                  <p className="ai_text_1">너였다면</p>
                  <p className="ai_text_2">정승환</p>
                </div>
              </div>

              <div className="drag_menu_component_1" onClick={() =>handleSongClick("흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야","장범준","./img/songs/cover_wobbly_flowers.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_wobbly_flowers.png" alt="흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야" />
                <div className="ai_text">
                  <p className="ai_text_1">흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야</p>
                  <p className="ai_text_2">장범준</p>
                </div>
              </div>

              {/* <div className="drag_menu_component_1" onClick={() =>handleSongClick("기억해줘요내모든날과그때를","거미","./img/songs/cover_remember.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_remember.png" alt="기억해줘요내모든날과그때를" />
                <div className="ai_text">
                  <p className="ai_text_1">기억해줘요내모든날과그때를</p>
                  <p className="ai_text_2">거미</p>
                </div>
              </div> */}

              <div className="drag_menu_component_1" onClick={() =>handleSongClick("아모르 파티","김연자","./img/songs/cover_amo.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_amo.png" alt="아모르 파티" />
                <div className="ai_text">
                  <p className="ai_text_1">아모르 파티</p>
                  <p className="ai_text_2">김연자</p>
                </div>
              </div>

              <div className="drag_menu_component_1" onClick={() =>handleSongClick("사랑, 결코 시들지 않는","서문탁","./img/songs/cover_love_never.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_love_never.png" alt="흔들사랑, 결코 시들지 않는" />
                <div className="ai_text">
                  <p className="ai_text_1">사랑, 결코 시들지 않는</p>
                  <p className="ai_text_2">서문탁</p>
                </div>
              </div>

              <div className="drag_menu_component_1" onClick={() =>handleSongClick("밤편지","아이유","./img/songs/cover_letter_at_night.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_letter_at_night.png" alt="밤편지" />
                <div className="ai_text">
                  <p className="ai_text_1">밤편지</p>
                  <p className="ai_text_2">아이유</p>
                </div>
              </div>

              <div className="drag_menu_component_1" onClick={() =>handleSongClick("Supernova","에스파","./img/songs/cover_supernova.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_supernova.png" alt="Supernova" />
                <div className="ai_text">
                  <p className="ai_text_1">Supernova</p>
                  <p className="ai_text_2">에스파</p>
                </div>
              </div>

              <div className="drag_menu_component_1" onClick={() =>handleSongClick("사랑은 늘 도망가","임영웅","./img/songs/cover_love_run.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_love_run.png" alt="사랑은 늘 도망가" />
                <div className="ai_text">
                  <p className="ai_text_1">사랑은 늘 도망가</p>
                  <p className="ai_text_2">임영웅</p>
                </div>
              </div>
            </div>

            <div className="header_title">추천 곡</div>

            <div className="drag_menu_component">
            <div className="drag_menu_component_1" onClick={() =>handleSongClick("밤편지","아이유","./img/songs/cover_letter_at_night.png" )}>
                <img className="ai_diagnosis_img" src=".\img\songs\cover_letter_at_night.png" alt="밤편지" />
                <div className=" ai_text">
                  <p className="ai_text_1">밤편지</p>
                  <p className="ai_text_2">아이유</p>
                </div>
              </div>
              <div className="drag_menu_component_1" onClick={() =>handleSongClick("아모르 파티","김연자","./img/songs/cover_amo.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_amo.png" alt="아모르 파티" />
                <div className="ai_text">
                  <p className="ai_text_1">아모르 파티</p>
                  <p className="ai_text_2">김연자</p>
                </div>
              </div>
              {/* <div className="drag_menu_component_1" onClick={() =>handleSongClick("기억해줘요내모든날과그때를","거미","./img/songs/cover_remember.png" )}>
                <img className="ai_diagnosis_img" src="./img/songs/cover_remember.png" alt="기억해줘요내모든날과그때를" />
                <div className="ai_text">
                  <p className="ai_text_1">기억해줘요내모든날과그때를</p>
                  <p className="ai_text_2">거미</p>
                </div>
              </div> */}
              {/* <div className="drag_menu_component_1" onClick={() =>handleSongClick("야생화","박효신","./img/songs/cover_wild_flower.png" )}>
                <img className="ai_diagnosis_img" src=".\img\songs\cover_wild_flower.png" alt="야생화" />
                <div className=" ai_text">
                  <p className="ai_text_1">야생화</p>
                  <p className="ai_text_2">박효신</p>
                </div>
              </div> */}
              {/* <div className="drag_menu_component_1" onClick={() =>handleSongClick("흰수염고래","YB","./img/songs/cover_a_blue_whale.png" )}>
                <img className="ai_diagnosis_img" src=".\img\songs\cover_a_blue_whale.png" alt="흰수염고래" />
                <div className=" ai_text">
                  <p className="ai_text_1">흰수염고래</p>
                  <p className="ai_text_2">YB</p>
                </div>
              </div> */}
            </div>

            <div className="header_title">인기있는 가수</div>

            <div className="drag_menu_component drag_menu_component_ai">
              <div className="drag_menu_component_1 drag_menu_component_1_short">
                <img className="ai_precise_img" src=".\img\singers\cover_iu.png" alt="아이유" />
                <div className=" ai_text">
                  <p className="ai_text_1">아이유</p>
                </div>
              </div>
              <div className="drag_menu_component_1 drag_menu_component_1_short">
                <img className="ai_precise_img" src=".\img\singers\cover_jung_seung_hwan.png" alt="정승환" />
                <div className=" ai_text">
                  <p className="ai_text_1">정승환</p>
                </div>
              </div>
              <div className="drag_menu_component_1 drag_menu_component_1_short">
                <img className="ai_precise_img" src=".\img\singers\cover_Jung_Joon_il.png" alt="정준일" />
                <div className=" ai_text">
                  <p className="ai_text_1">정준일</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer activeTab="training" />
      </div>
    </div>
  );
};

export default PrecisionTraining;
