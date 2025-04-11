import './common/root.css';
import './immediate_feedback_final.css';
import Bar from './components/Bar.js';
import React, { useState, useEffect } from 'react';
import Header2 from './common/Header2.js';
import { Link } from 'react-router-dom';

function Immediate_feedback_final() {
    const [percent, setPercent] = useState(0);
    const [targetPercent, setTargetPercent] = useState(50);
  
    useEffect(() => {
      if (percent < targetPercent) {
        const interval = setInterval(() => {
          setPercent(prev => {
            const newPercent = Math.min(prev + 1, targetPercent);
            if (newPercent === targetPercent) {
              clearInterval(interval);
            }
            return newPercent;
          });
        }, 20); // 20ms 간격으로 1씩 증가
        return () => clearInterval(interval);
      }
    }, [targetPercent, percent]);
  
    const handleChange = (e) => {
      const value = Math.max(0, Math.min(100, e.target.value)); // 0에서 100 사이로 제한
      setTargetPercent(value);
    };

    return (
        <div className="body">
        <div className='container'>
            <Header2 />
            <div className='immediate_feedback_final'>
                <div id='feedback_final_score'>
                    <div className='score_title'>
                        SCORE
                    </div>
                    <div className='score'>
                        <div className='score_num'>
                            88
                        </div>
                        <div className='score_txt'>
                            점
                        </div>
                    </div>
                    <div className='score_rank'>
                        <img src='./img/bookmark.png'/>
                        <div className='rank_num'>
                            <div className='r_main'>TOP</div>
                            <div className='r_sub'>2</div>
                        </div>
                    </div>
                </div>
                <div id='feedback_final_feedback'>
                    <div className='feedback_title'>
                        FEEDBACK
                    </div>
                    <div className='feedback_list'>
                        <div className='feedback'>
                            <div className='f_title'>
                                음정
                            </div>
                            <div className='f_bar'>
                                <Bar initialPercent={88} />
                            </div>
                        </div>
                        <div className='feedback'>
                            <div className='f_title'>
                                박자
                            </div>
                            <div className='f_bar'>
                                <Bar initialPercent={92} />
                            </div>
                        </div>
                        <div className='feedback'>
                            <div className='f_title'>
                                발음
                            </div>
                            <div className='f_bar'>
                                <Bar initialPercent={88} />
                            </div>
                        </div>
                        <div className='feedback'>
                            <div className='f_title'>
                                템포
                            </div>
                            <div className='f_bar'>
                                <Bar initialPercent={91} />
                            </div>
                        </div>
                        <div className='feedback'>
                            <div className='f_title'>
                                볼륨
                            </div>
                            <div className='f_bar'>
                                <Bar initialPercent={81} />
                            </div>
                        </div>
                    </div>
                </div>
                <div id='feedback_final_best_part'>
                    <div className='best_part_title'>
                        BEST PART
                    </div>
                    <div className='best_part_list'>
                        <div className='best_part'>
                            <div className='b_title'>
                                원곡
                            </div>
                            <div className='b_bar'>
                                <img src='./img/musicbook.png'/>
                            </div>
                        </div>
                        <div className='best_part'>
                            <div className='b_title'>
                                사용자
                            </div>
                            <div className='b_bar'>
                                <img src='./img/musicbook.png'/>
                            </div>
                        </div>
                        <div className='best_part'>
                            <div className='b_title'>
                                유사도
                            </div>
                            <div className='b_bar'>
                                <Bar initialPercent={94} />
                            </div>
                        </div>
                    </div>
                    <div className='feedback_btn'>
                        <div className='f_btn_top'>
                            <div className='f_btn_1'>
                                다시 도전하기
                            </div>
                            <Link to={"/feedback_final"}>
                                <div className='f_btn_1'>
                                    순위
                                </div>
                            </Link>
                        </div>
                        <div className='f_btn_bottom'>
                            <Link to={"/main"}>
                                <div className='f_btn_2'>
                                    홈으로
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Immediate_feedback_final;