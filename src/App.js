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
import { useCookies } from 'react-cookie';
import { handleGetCookie } from './utils/cookieUtils'


const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cookies, setCookie] = useCookies();

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
  }

  useEffect(() => {
    if (currentCategory === null) {
      const cookieCategories = handleGetCookie('categories', cookies);
      if (cookieCategories)
        setCurrentCategory(cookieCategories[0])
    }

  }, [cookies]);
  return (
    <div style={{ maxHeight: '100vh', 'overflow': 'hidden' }} className="bg-[#000000] text-white">
      <div className="" style={{ display: 'flex' }}>
        <SideBar handleCategoryChange={handleCategoryChange} />
        <MainComponent handleCategoryChange={handleCategoryChange} handleVideoChange={handleVideoChange} currentCategory={currentCategory} />
      </div>
      <Footer video={currentVideo} />
      <VideoPlayer video={currentVideo} />
      
      {/* <CategoriesHandler />
      <SongSearch />
      <SongSelector handleVideoChange={handleVideoChange} /> */}
    </div>
  )
};

export default App;