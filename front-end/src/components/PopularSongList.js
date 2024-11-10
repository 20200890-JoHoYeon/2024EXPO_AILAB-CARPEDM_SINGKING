import React from 'react';
import PopularSong from './PopularSong.js';

function PopularSongList({ songs, onSongClick }) {
  const popularSongs = songs.slice(0,3);

  return (
    <div className="song_list">
      {popularSongs.map((song, index) => (
        <PopularSong
          key={song.id}
          song={song}
          rank={index + 1}
          onClick={() => onSongClick(song.id)}
          blurred={index !== 0}
        />
      ))}
    </div>
  );
}

export default PopularSongList;