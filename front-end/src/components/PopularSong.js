import React from 'react';


function PopularSong({ song, onClick, blurred }) {
  return (
    <div className={`song ${blurred ? 'blurred' : ''}`} onClick={onClick}>
      <div className="song_info">
        <img src={song.imageUrl} alt={song.title} />
        <h4>{song.id}) {song.title}</h4>
        <hr/>
        <p>{song.artist}</p>
      </div>
    </div>
  );
}

export default PopularSong;