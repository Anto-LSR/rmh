import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';
import Categories from './components/Categories';
import SongSearch from './components/SongSearch';

const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
    console.log(video);
  };

  return (
    <div>
      <h1>RPG Music Handler v0.003</h1>
      <VideoPlayer video={currentVideo} />
      <VideoList
        videos={[
          { name: 'Video 1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          { name: 'Video 2', url: 'https://www.youtube.com/watch?v=PSP3PbytbVY' },
          { name: 'Video 3', url: 'https://www.youtube.com/watch?v=wrJ6_GAprFE' },
        ]}
        handleVideoChange={handleVideoChange}
      />
      <Categories/>
      <SongSearch/>
    </div>
  );
};

export default App;