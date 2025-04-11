import Header from './common/Header';
import Footer from './common/Footer';
import './common/root.css';
import './feedbacklist_member.css';

function Feedbacklist_member(){
    return(
        <div className="body">
        <div className='container'>
            <Header />
            <div className='main'>
                <div className='list_container'>
                    <div className='image_container'>
                        <img src='./img/songs/supernova.png'alt='song_img'/>
                    </div>

                    <div className='content_container'>
                        <div className='top'>
                            TOP
                            <div className='top_num'>2</div>
                        </div>
                        <div className='song'>
                            <div className='song_container_1'>
                                <div className='song_title'>supernova</div>
                                <div className='song_singer'>aespa</div>
                            </div>
                            <div className='song_container_2'>
                                <div className='score'>SCORE</div>
                                <div className='score_number'>89.78</div>
                            </div>
                        </div>
                        <div className='date'>
                            2024.07.28
                        </div>
                    </div>
                </div>

                <div className='list_container'>
                    <div className='image_container'>
                        <img src='./img/songs/small_girl.png'alt='song_img'/>
                    </div>

                    <div className='content_container'>
                        <div className='top'>
                            TOP
                            <div className='top_num'>4</div>
                        </div>
                        <div className='song'>
                            <div className='song_container_1'>
                                <div className='song_title'>Small girl</div>
                                <div className='song_singer'>이영지</div>
                            </div>
                            <div className='song_container_2'>
                                <div className='score'>SCORE</div>
                                <div className='score_number'>67.28</div>
                            </div>
                        </div>
                        <div className='date'>
                            2024.07.26
                        </div>
                    </div>
                </div>

                <div className='list_container'>
                    <div className='image_container'>
                        <img src='./img/songs/sonagi.png'alt='song_img'/>
                    </div>

                    <div className='content_container'>
                        <div className='top'>
                            TOP
                            <div className='top_num'>2</div>
                        </div>
                        <div className='song'>
                            <div className='song_container_1'>
                                <div className='song_title'>소나기</div>
                                <div className='song_singer'>변우석</div>
                            </div>
                            <div className='song_container_2'>
                                <div className='score'>SCORE</div>
                                <div className='score_number'>89.78</div>
                            </div>
                        </div>
                        <div className='date'>
                            2024.07.25
                        </div>
                    </div>
                </div>

                <div className='list_container'>
                    <div className='image_container'>
                        <img src='./img/songs/time_of_our_life.png'alt='song_img'/>
                    </div>

                    <div className='content_container'>
                        <div className='top'>
                            TOP
                            <div className='top_num'>2</div>
                        </div>
                        <div className='song'>
                            <div className='song_container_1'>
                                <div className='song_title'>한 페이지가 될 수 있게</div>
                                <div className='song_singer'>aespa</div>
                            </div>
                            <div className='song_container_2'>
                                <div className='score'>SCORE</div>
                                <div className='score_number'>89.78</div>
                            </div>
                        </div>
                        <div className='date'>
                            2024.07.25
                        </div>
                    </div>
                </div>

                <div className='list_container'>
                    <div className='image_container'>
                        <img src='./img/songs/heya.png'alt='song_img'/>
                    </div>

                    <div className='content_container'>
                        <div className='top'>
                            TOP
                            <div className='top_num'>2</div>
                        </div>
                        <div className='song'>
                            <div className='song_container_1'>
                                <div className='song_title'>흰수염고래</div>
                                <div className='song_singer'>aespa</div>
                            </div>
                            <div className='song_container_2'>
                                <div className='score'>SCORE</div>
                                <div className='score_number'>89.78</div>
                            </div>
                        </div>
                        <div className='date'>
                            2024.07.24
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
     </div>



    );
}
export default Feedbacklist_member;