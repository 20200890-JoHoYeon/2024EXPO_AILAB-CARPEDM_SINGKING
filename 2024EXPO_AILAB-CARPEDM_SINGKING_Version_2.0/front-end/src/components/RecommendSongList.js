import React from 'react';
import RecommendSong from './RecommendSong';
import songs from '../data/songs';

const RecommendSongList = () => {
  const currentSongs = songs.slice(5, 9);

  return (
    <div className="r_song_list">
      {currentSongs.map((song) => (
        <RecommendSong
          key={song.id}
          title={song.title}
          artist={song.artist}
          imageUrl={song.imageUrl}
        />
      ))}
    </div>
  );
};

export default RecommendSongList;