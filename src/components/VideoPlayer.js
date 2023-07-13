import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [volumeinputValue, setVolumeInputValue] = useState(1)
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

  const handleVolumeChange = (event) => {
    const volume = mapValue(event.target.value);
    setVolume(volume)
  }

  const mapValue = (value) => {
    const outputValue = value / 100;
    return outputValue.toFixed(1);
  }

  return (
    <div>
      <div style={{ display: 'block' }}>
        <ReactPlayer
          ref={playerRef}
          url={video ? video.url : ''}
          playing={playing}
          muted={muted}
          controls
          loop={true}
          onError={(e) => alert(e)}
          volume={volume}
        />
      </div>

      <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={handleMuteToggle}>{muted ? 'Unmute' : 'Mute'}</button>
      <input type='range' min={1} max={100} onChange={handleVolumeChange}></input>
    </div >
  );
};

export default VideoPlayer;
