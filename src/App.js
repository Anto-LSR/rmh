import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';
import Categories from './components/Categories';
import SongSearch from './components/SongSearch';
import SongSelector from './components/SongSelector';
import CategoriesHandler from './components/CategoriesHandler'
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import MainComponent from './components/MainComponent'


const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
    console.log(video);
  };

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Referrer-Policy';
    meta.content = 'no-referrer-when-downgrade';
    document.getElementsByTagName('head')[0].appendChild(meta);

    return () => {
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);
  // return (
  //   <div>
  //     <h1>RPG Music Handler v0.003</h1>
  //     <VideoPlayer video={currentVideo} />

  //     <CategoriesHandler/>
  //     <SongSearch/>
  //     <SongSelector handleVideoChange={ handleVideoChange}/>
  //   </div>
  // );
  return (
    <div style={{maxHeight : '100vh', 'overflow' : 'hidden'}}>
      <div className="" style={{ display: 'flex'}}>
        <SideBar />
        <MainComponent />
      </div>
      <Footer/>
    </div>
  )
};

export default App;