import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import MainComponent from './components/MainComponent'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');


const App = () => {

  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [page, setPage] = useState('mainComponent');
  const [spacePressed, setSpacePressed] = useState(false)
  const [categories, setCategories] = useState([])

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
    console.log(category);
  }

  const handlePageChange = (e) => {
    setPage(e)
  }

  const handleSpacePress = () => {
    setSpacePressed(!spacePressed)
  }

  const handleNextSong = () => {
    const songs = localStorage.getItem('songs') ? JSON.parse(localStorage.getItem('songs')) : []
    const categorySongs = songs.filter(song => song.category === currentVideo.category);

    const index = categorySongs.findIndex(obj => obj.name === currentVideo.name);
    const nextIndex = (index + 1) % categorySongs.length;

    setCurrentVideo(categorySongs[nextIndex]);
  }

  const handlePreviousSong = () => {
    //const songs = handleGetCookie('songs', cookies);
    const songs = localStorage.getItem('songs') ? JSON.parse(localStorage.getItem('songs')) : []
    const categorySongs = songs.filter(song => song.category === currentVideo.category);

    const index = categorySongs.findIndex(obj => obj.name === currentVideo.name);
    const previousIndex = (index - 1 + categorySongs.length) % categorySongs.length;

    setCurrentVideo(categorySongs[previousIndex]);
  };

  const handleCategoriesChange = (value) => {
    let categories = localStorage.getItem('categories')
    setCategories(JSON.parse(categories))

  }

  useEffect(() => {

    if (currentCategory === null) {
      //const cookieCategories = handleGetCookie('categories', cookies);
      const localCategories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : null
      if (localCategories)
        setCurrentCategory(localCategories[0])
      setCategories(localCategories)
    }



  }, [currentCategory]);



  return (
    <div className="min-safe-h-screen  bg-black-900 text-white flex flex-col inset-0 absolute">
      <div className="flex overflow-hidden "   >
        <Toaster toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white'
            },
            position: "top-right"
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }} />
        <SideBar handleCategoryChange={handleCategoryChange} handlePageChange={handlePageChange} page={page} currentCategory={currentCategory} categories={categories} handleCategoriesChange={handleCategoriesChange} />
        <MainComponent handleCategoryChange={handleCategoryChange} handleVideoChange={handleVideoChange} currentCategory={currentCategory} page={page} currentVideo={currentVideo} />
      </div>
      <Footer video={currentVideo} handleNextSong={handleNextSong} handlePreviousSong={handlePreviousSong} />
    </div>
  )
};

export default App;