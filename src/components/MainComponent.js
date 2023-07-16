import SongItem from "./SongItem";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie } from '../utils/cookieUtils'
import AddCategory from "./AddCategory";
import { capitalize } from '../utils/miscUtils.js'
import AddSong from "./AddSong";

const MainComponent = ({ handleVideoChange, handleCategoryChange, currentCategory, page, currentVideo }) => {
  const [cookies, setCookie] = useCookies();
  const [categories, setCategories] = useState([]);
  const [songs, setSongs] = useState([]);
  const [canRender, setCanRender] = useState(false);
  const [songsAndCategories, setSongsAndCategories] = useState([]);

  useEffect(() => {
    const storageCategories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];
    setCategories(storageCategories);
    const storageSongs = localStorage.getItem('songs') ? JSON.parse(localStorage.getItem('songs')) : [];
    setSongs(storageSongs);
  }, []);

  useEffect(() => {
    if (categories.length > 0 && songs.length > 0) {
      const groupedSongs = categories.reduce((result, category) => {
        const categorySongs = songs.filter((song) => song.category === category.name);
        if (categorySongs) {
          result[category.name] = categorySongs
          return result;
        }
      }, {});
      setSongsAndCategories(groupedSongs);
      setCanRender(true);
    }
  }, [categories, songs]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storageCategories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];
      setCategories(storageCategories);
      const storageSongs = localStorage.getItem('songs') ? JSON.parse(localStorage.getItem('songs')) : [];
      setSongs(storageSongs);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNextCategory = () => {
    if (!isNextBtnDisabled()) {
      const index = categories.findIndex(obj => obj?.name == currentCategory?.name)
      handleCategoryChange(categories[index + 1])
    }
  }

  const handlePreviousCategory = () => {
    if (!isPrevBtnDisabled()) {
      const index = categories.findIndex(obj => obj?.name == currentCategory?.name)
      handleCategoryChange(categories[index - 1])
    }
  }

  const isNextBtnDisabled = () => {
    const category = currentCategory;
    const length = categories.length == 0 ? categories.length : categories.length - 1
    return categories.findIndex(obj => obj?.name == category?.name) == length
  }

  const isPrevBtnDisabled = () => {
    const category = currentCategory;
    return categories.findIndex(obj => obj?.name == category?.name) == 0
  }

  return (
    <div className="bg-neutral-950 w-full rounded-lg mt-2 me-2 ">
      {/* MAIN COMPONENT */}
      {page === 'mainComponent' && (
        <>
          <div className={`h-12 rounded-t-lg flex items-center ${currentCategory?.color ? 'bg-' + currentCategory?.color + '-500' : 'bg-gray-900'}`}>
            <div className="mx-2 flex items-center gap-2">
              <div onClick={() => handlePreviousCategory()} className={`h-6 w-6 lg:h-8 lg:w-8  flex items-center justify-center rounded-full  ${isPrevBtnDisabled() ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 hover:scale-110 transition ease-in-out cursor-pointer'}`} >
                <HiChevronLeft className=" text-2xl " />
              </div>
              <div onClick={() => handleNextCategory()} className={`h-6 w-6 lg:h-8 lg:w-8  flex items-center justify-center rounded-full  ${isNextBtnDisabled() ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 hover:scale-110 transition ease-in-out cursor-pointer'}`}>
                <HiChevronRight className=" text-2xl" />
              </div>
              <h1 className="ms-3 lg:text-xl text-md select-none"> {capitalize(currentCategory?.name)} </h1>
            </div>
          </div>

          <div className="mx-4 mt-4 ps-2 py-2" >
            {songsAndCategories?.[currentCategory?.name] != undefined && songsAndCategories[currentCategory?.name].map((song, index) => (
              <SongItem song={song} key={index} handleVideoChange={handleVideoChange} currentVideo={currentVideo} />
            ))}
          </div>
        </>
      )}
      {/* GESTION CATEGORIES */}
      {page === 'categories' && (
        <div className="flex items-center justify-center h-full">
          <AddCategory  />
        </div>
      )}

      {/* GESTION VIDEOS */}
      {page === 'songs' && (
        <div className="flex items-center justify-center h-full">
          <AddSong categories={categories} />
        </div>
      )}
    </div>
  )
}

export default MainComponent;
