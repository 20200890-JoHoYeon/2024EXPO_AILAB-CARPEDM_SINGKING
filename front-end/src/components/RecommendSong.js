import React from 'react';

const RecommendSong = ({ title, artist, imageUrl }) => {
  return (
    <div className="r_list">
        <div className='r_list_more'>
            <div className='r_img'>
                <img src={imageUrl} alt={title}/>
            </div>
            <div className='r_info'>
                <p className='r_title'>{title} - {artist}</p>
            </div>
        </div>
    </div>
  );
};

export default RecommendSong;