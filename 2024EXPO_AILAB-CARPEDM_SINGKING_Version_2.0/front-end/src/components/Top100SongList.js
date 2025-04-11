import React from 'react';
import Top100Song from './Top100Song';
import songs from '../data/songs';

const Top100SongList = () => {
  const currentSongs = songs.slice(0, 5);

  return (
    <div className="t_song_list">
      {currentSongs.map((song) => (
        <Top100Song
          key={song.id}
          title={song.title}
          artist={song.artist}
          imageUrl={song.imageUrl}
        />
      ))}
    </div>
  );
};

export default Top100SongList;