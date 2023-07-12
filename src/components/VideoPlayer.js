import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.seekTo(0, 'volume');
    }
  }, [video]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (muted) handleMuteToggle()
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  return (
    <div>
      <div style={{display : 'block'}}> 
        <ReactPlayer
          ref={playerRef}
          url={video ? video.url : ''}
          playing={playing}
          muted={muted}
          controls
          loop={true}
        />
      </div>
      
      <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={handleMuteToggle}>{muted ? 'Unmute' : 'Mute'}</button>
    </div >
  );
};

export default VideoPlayer;
