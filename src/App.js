import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import MainComponent from './components/MainComponent'
import { useCookies } from 'react-cookie';
import { handleGetCookie } from './utils/cookieUtils'


const App = () => {

  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cookies, setCookie] = useCookies();
  const [page, setPage] = useState('mainComponent');
  const [spacePressed, setSpacePressed] = useState(false)

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
  }

  const handlePageChange = (e) => {
    setPage(e)
  }

  const handleSpacePress = () => {
    setSpacePressed(!spacePressed)
  }



  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      if(e.code == 'Space'){
        handleSpacePress()
      }
    })
    if (currentCategory === null) {
      const cookieCategories = handleGetCookie('categories', cookies);
      if (cookieCategories)
        setCurrentCategory(cookieCategories[0])
    }


  }, [cookies]);
  return (
    <div style={{ maxHeight: '100vh', 'overflow': 'hidden' }} className="bg-black-900 text-white">
      <div className="" style={{ display: 'flex' }}>
        <SideBar handleCategoryChange={handleCategoryChange} handlePageChange={handlePageChange} page={page} currentCategory={currentCategory} />
        <MainComponent handleCategoryChange={handleCategoryChange} handleVideoChange={handleVideoChange} currentCategory={currentCategory} page={page} />
      </div>
      <Footer video={currentVideo} spacePressed={spacePressed}/>
      <VideoPlayer video={currentVideo}/>

      {/* <CategoriesHandler /> */}
      {/* <SongSearch /> */}
      {/* <SongSelector handleVideoChange={handleVideoChange} /> */}
    </div>
  )
};

export default App;