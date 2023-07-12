import React from 'react';
import { useCookies } from 'react-cookie';

const VideoList = ({ videos, handleVideoChange }) => {

  return (
    <div>
      <h2>Autres vidéos</h2>
      <ul>
        {videos.map((video, index) => (
          <button key={index} onClick={() => handleVideoChange(video)}>
            {video.name}
          </button>
        ))}
      </ul>

    </div>
  );
};

export default VideoList;