import React from 'react';

const Top100Song = ({ title, artist, imageUrl }) => {
  return (
    <div className="t_list">
        <div className='t_list_more'>
            <div className='t_img'>
                <img src={imageUrl} alt={title}/>
            </div>
            <div className='t_info'>
                <h3 className='t_title'>{title}</h3>
                <p className='t_artist'>{artist}</p>
            </div>
        </div>
        <div className='t_play'>
            <img src='../img/playbtn.png'/>
        </div>
    </div>
  );
};

export default Top100Song;