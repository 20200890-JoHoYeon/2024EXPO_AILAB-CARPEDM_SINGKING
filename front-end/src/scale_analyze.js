import React, { useState, useEffect, useRef } from "react";
import "./scale_analyze.css";
import "./common/root.css";
import "./main.css";
import Footer from "./common/Footer";

function ScaleAnalyze() {
  const notes = [
    // 1옥타브(C3 ~ B3)
    { name: "C3", frequency: 130.81, info: "1옥타브 도", min: 123.47, max: 138.59, nk: "C" },
    { name: "C_3", frequency: 138.59, info: "1옥타브 도#", min: 130.81, max: 146.83, nk: "C_" },
    { name: "D3", frequency: 146.83, info: "1옥타브 레", min: 138.59, max: 155.56, nk: "D" },
    { name: "D_3", frequency: 155.56, info: "1옥타브 레#", min: 146.83, max: 164.81, nk: "D_" },
    { name: "E3", frequency: 164.81, info: "1옥타브 미", min: 155.56, max: 174.61, nk: "E" },
    { name: "F3", frequency: 174.61, info: "1옥타브 파", min: 164.81, max: 185.0, nk: "F" },
    { name: "F_3", frequency: 185.0, info: "1옥타브 파#", min: 174.61, max: 196.0, nk: "F_" },
    { name: "G3", frequency: 196.0, info: "1옥타브 솔", min: 185.0, max: 207.65, nk: "G" },
    { name: "G_3", frequency: 207.65, info: "1옥타브 솔#", min: 196.0, max: 220.0, nk: "G_" },
    { name: "A3", frequency: 220.0, info: "1옥타브 라", min: 207.65, max: 233.08, nk: "A" },
    { name: "A_3", frequency: 233.08, info: "1옥타브 라#", min: 220.0, max: 246.94, nk: "A_" },
    { name: "B3", frequency: 246.94, info: "1옥타브 시", min: 233.08, max: 261.63, nk: "B" },

    // 2옥타브(C4 ~ B4)
    { name: "C4", frequency: 261.63, info: "2옥타브 도", min: 247.57, max: 277.17, nk: "C" },
    { name: "C_4", frequency: 277.18, info: "2옥타브 도#", min: 261.64, max: 293.65, nk: "C_" },
    { name: "D4", frequency: 293.66, info: "2옥타브 레", min: 277.19, max: 311.12, nk: "D" },
    { name: "D_4", frequency: 311.13, info: "2옥타브 레#", min: 293.67, max: 329.62, nk: "D_" },
    { name: "E4", frequency: 329.63, info: "2옥타브 미", min: 311.14, max: 349.22, nk: "E" },
    { name: "F4", frequency: 349.23, info: "2옥타브 파", min: 329.64, max: 369.98, nk: "F" },
    { name: "F_4", frequency: 369.99, info: "2옥타브 파#", min: 349.24, max: 391.99, nk: "F_" },
    { name: "G4", frequency: 392.0, info: "2옥타브 솔", min: 370.0, max: 415.29, nk: "G" },
    { name: "G_4", frequency: 415.3, info: "2옥타브 솔#", min: 392.01, max: 439.99, nk: "G_" },
    { name: "A4", frequency: 440.0, info: "2옥타브 라", min: 415.31, max: 466.15, nk: "A" },
    { name: "A_4", frequency: 466.16, info: "2옥타브 라#", min: 440.01, max: 493.87, nk: "A_" },
    { name: "B4", frequency: 493.88, info: "2옥타브 시", min: 466.17, max: 523.25, nk: "B" },

    // 3옥타브(C5 ~ B5)
    { name: "C5", frequency: 523.25, info: "3옥타브 도", min: 493.89, max: 554.36, nk: "C" },
    { name: "C_5", frequency: 554.37, info: "3옥타브 도#", min: 523.26, max: 587.32, nk: "C_" },
    { name: "D5", frequency: 587.33, info: "3옥타브 레", min: 554.38, max: 622.25, nk: "D" },
    { name: "D_5", frequency: 622.26, info: "3옥타브 레#", min: 587.34, max: 659.25, nk: "D_" },
    { name: "E5", frequency: 659.26, info: "3옥타브 미", min: 622.27, max: 698.45, nk: "E" },
    { name: "F5", frequency: 698.46, info: "3옥타브 파", min: 659.27, max: 739.99, nk: "F" },
    { name: "F_5", frequency: 740.0, info: "3옥타브 파#", min: 698.47, max: 783.99, nk: "F_" },
    { name: "G5", frequency: 784.0, info: "3옥타브 솔", min: 740.01, max: 830.61, nk: "G" },
    { name: "G_5", frequency: 830.62, info: "3옥타브 솔#", min: 784.01, max: 880.0, nk: "G_" },
    { name: "A5", frequency: 880.0, info: "3옥타브 라", min: 830.63, max: 932.32, nk: "A" },
    { name: "A_5", frequency: 932.33, info: "3옥타브 라#", min: 880.01, max: 987.75, nk: "A_" },
    { name: "B5", frequency: 987.76, info: "3옥타브 시", min: 932.34, max: 1046.5, nk: "B" },
  ];

  // 1옥타브 음계 (C4 ~ B4) 인덱스: 0 ~ 11
  const [octave, setOctave] = useState(12);
  const [octaveNotes, setOctaveNotes] = useState(notes.slice(octave, octave + 12)); // 첫 12개 요소 선택

  const [activeNote, setActiveNote] = useState(notes[0]); // 현재 활성화된 음 (처음에는 C4)
  const [noteIndex, setNoteIndex] = useState(0); // 현재 음의 인덱스

  const [noteMessage, setNoteMessage] = useState(""); // 텍스트창 메세지
  const [isRecording, setIsRecording] = useState(false);

  const highestNoteRef = useRef(null);

  // console.log("초기 noteIndex : ", noteIndex);

  // 주어진 주파수의 음을 재생하는 함수
  function playTone(frequency, duration) {
    return new Promise((resolve) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine"; // 피아노 소리에 가까운 sine 파형 사용
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // 주파수 설정
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // 볼륨 설정 (0에서 1 사이)

      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration); // 지정한 시간(duration) 동안 재생

      // 음 재생이 끝나면 Promise 완료
      oscillator.onended = () => {
        console.log("음 재생 완료");
        resolve();
      };
    });
  }

  // 음 이름으로 재생하는 함수 (C4, D4, 등)

  async function playNoteByName(noteName, duration) {
    const note = notes.find((note) => note.name === noteName); // 눌린 음의 정보를 찾음
    const frequency = note?.frequency; // 해당 음의 주파수를 가져옴
    if (frequency) {
      setActiveNote(noteName); // 눌린 음 시각화
      await playTone(frequency, duration); // 주어진 음계의 주파수를 사용해 재생

      const index = notes.indexOf(note); // 눌린 음의 인덱스를 찾음
      setNoteIndex(index); // noteIndex 상태를 업데이트함

      console.log("current noteName : ", noteName, "frequency : ", frequency);

      setNoteMessage(`현재 건반 음역대: ${note.info}`);
      recordAudio(); // 녹음 시작
    } else {
      console.log("해당 음을 찾을 수 없습니다.");
    }
  }

  // 옥타브 내리기
  function downOctaveList() {
    if (octave >= 12) {
      setOctave(octave - 12);
    }
  }

  // 옥타브 올리기
  function upOctaveList() {
    if (octave <= 12) setOctave(octave + 12);
  }

  useEffect(() => {
    // octaveSet이 변경될 때마다 octaveNotes를 업데이트
    setOctaveNotes(notes.slice(octave, octave + 12));
    console.log("현재 옥타브 수 : ", octave);
  }, [octave]);

  // 음을 올리는 함수
  // function increaseNote() {
  //   if (noteIndex < notes.length - 1) {
  //     console.log("음 올리는 noteIndex : ", noteIndex);
  //     const nextIndex = noteIndex + 1;
  //     setNoteIndex(nextIndex);
  //     playNoteByName(notes[nextIndex].name, 1);
  //     console.log("음 올리는 noteIndex : ", noteIndex);
  //   }
  // }

  // 음을 내리는 함수
  // function decreaseNote() {
  //   if (noteIndex > 0) {
  //     console.log("음 내리는 noteIndex : ", noteIndex);
  //     const prevIndex = noteIndex - 1;
  //     setNoteIndex(prevIndex);
  //     playNoteByName(notes[prevIndex].name, 1);
  //     console.log("음 내리는 noteIndex : ", noteIndex);
  //   }
  // }

  // 음 시작
  // function playNote() {
  //   console.log("시작하는 noteIndex : ", noteIndex);
  //   playNoteByName(notes[noteIndex].name, 1);
  // }

  // 실시간으로 5초간 녹음 후 음역대 진단
  const recordAudio = async () => {
    try {
      setIsRecording(true);
      const mediaRecorder = new MediaRecorder(await navigator.mediaDevices.getUserMedia({ audio: true }));
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.start();
      console.log("녹음 시작");
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);

      mediaRecorder.onstop = () => {
        setIsRecording(false);
        console.log("녹음 끝");

        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        console.log("녹음된 데이터 audioBlob: ", audioBlob);
        uploadToServer(audioBlob);
      };
    } catch (error) {
      console.error("녹음 중 오류 발생 : ", error);
      setIsRecording(false);
    }
  };

  const uploadToServer = async (audioBlob) => {
    // 파일 형식이 'audio/wav'인지 확인
    if (audioBlob.type !== "audio/wav") {
      console.error("올바르지 않은 파일 형식입니다. WAV 파일만 전송 가능합니다.");
      return; // WAV 파일이 아니면 전송하지 않음
    }

    const formData = new FormData();
    formData.append("audio", audioBlob, "user_tone.wav"); // 서버에 파일로 전송
    console.log("formData: ", formData);

    try {
      const response = await fetch("http://localhost:5000/range_check", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("서버 응답:", result);
      console.log("음역대 결과 : ", result.frequency);
      const closestNote = findClosestNote(result.frequency);
      findHighestNote(result.frequency);
      const highestNote = findClosestNote(highestNoteRef.current);

      if (closestNote) {
        const message = `사용자의 주파수: ${result.frequency} Hz\n현재 음역대: ${closestNote.info}\n\n\n\n\n\n 최고 음역대: ${highestNote.info}`;
        setNoteMessage(message);
      }

      console.log("사용자 음역대 비교 결과 : ", closestNote);
    } catch (error) {
      console.error("서버로 파일 업로드 실패:", error);
    }
  };

  // 주파수를 비교하는 함수
  const findClosestNote = (userFrequency) => {
    let closestNote = null;
    let minDifference = Infinity;

    notes.forEach((note) => {
      const difference = Math.abs(userFrequency - note.frequency);
      if (difference < minDifference) {
        minDifference = difference;
        closestNote = note;
      }
    });

    return closestNote;
  };

  // 최고 주파수를 찾는 함수
  const findHighestNote = (userFrequency) => {
    if (!highestNoteRef.current || highestNoteRef.current < userFrequency) {
      highestNoteRef.current = userFrequency; // 최고 주파수 업데이트
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="main">
          <div className="octave_area">
            <div className="header_title">음역대 진단 페이지</div>
          </div>

          <div className="piano_set ">
            {/* <div className="piano_octave_arrow" onClick={downOctaveList}>
              <img src="./img/arrowL.png" />
            </div> */}
            <div className="piano ">
              {/* 흰 건반 */}
              {octaveNotes
                .filter((note) => !note.name.includes("_")) // '_'이 없는 흰 건반 필터링
                .map((note) => (
                  <div key={note.name} className={`white-key ${activeNote === note.name ? "key_active" : ""}`} onClick={() => playNoteByName(note.name, 1)}>
                    {/* {note.name} */}
                  </div>
                ))}

              {/* 검은 건반 */}
              {octaveNotes
                .filter((note) => note.name.includes("_")) // '_'이 있는 검은 건반 필터링
                .map((note) => (
                  <div
                    key={note.name}
                    className={`black-key key-${note.nk}-sharp ${activeNote === note.name ? "key_active" : ""}`}
                    onClick={() => playNoteByName(note.name, 1)}
                  ></div>
                ))}
            </div>

            {/* <div className="piano_octave_arrow" onClick={upOctaveList}>
              <img src="./img/arrowR.png" />
            </div> */}
          </div>

          <div className="scale_analyze_btn">
            {/* <div className="sa_btn" onClick={decreaseNote}>왼쪽</div> */}
            {/* <div className="sa_btn" onClick={downOctaveList}>이전</div> */}
            {/* <div className="sa_btn" onClick={playNote}>다시 듣기</div> */}
            {/* <div className="sa_btn" onClick={increaseNote}>오른쪽</div> */}
            {/* <div className="sa_btn" onClick={upOctaveList}>다음</div> */}
          </div>

          <div className="scale_analyze_btn">
            <div className="sa_btn sa_playing_btn piano_octave_arrow" onClick={downOctaveList}>
              <img src="./img/arrowL.png" style={{ width: "30px", height: "35px", marginBottom: "5px" }} />
              <p>옥타브 감소</p>
            </div>

            <div className="sa_btn sa_playing_btn" onClick={recordAudio}>
              <img src={isRecording ? "/img/pausebtn.png" : "/img/playbtn.png"} style={{ width: "40px" }} alt="Play or Pause Button" />
              <p>{isRecording ? "녹음중" : "시작"}</p>
            </div>
            <div className="sa_btn sa_playing_btn piano_octave_arrow" onClick={upOctaveList}>
              <img src="./img/arrowR.png" style={{ width: "30px", height: "35px", marginBottom: "5px" }} />
              <p>옥타브 증가</p>
            </div>
          </div>
          <div className="octave_title">
            {octave === 0 && "# 1옥타브"}
            {octave === 12 && "# 2옥타브"}
            {octave === 24 && "# 3옥타브"}
          </div>
          <div className="scale_analyze_btn"></div>
          <div className="scale_analyze_textarea">
            <div className="scale_analyze_text_1">{noteMessage}</div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ScaleAnalyze;
