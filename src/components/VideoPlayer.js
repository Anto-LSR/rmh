import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video, playing, muted, volume, handleProgress, handleDuration }) => {
  const playerRef = useRef(null);

  return (
    <div>
      <div style={{ display: 'none', position: 'absolute' }}>
        <ReactPlayer
          ref={playerRef}
          url={video ? video.url : ''}
          playing={playing}
          muted={muted}
          controls
          loop={true}
          volume={volume}
          onProgress={handleProgress}
          onDuration={handleDuration}
          progressInterval={100}
          autoPlay
          playsinline
        />
      </div>

      {/* <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={handleMuteToggle}>{muted ? 'Unmute' : 'Mute'}</button>
      <input type='range' min={1} max={100} onChange={handleVolumeChange}></input> */}
    </div >
  );
};

export default VideoPlayer;
