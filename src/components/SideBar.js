import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie } from '../utils/cookieUtils';
import { AiOutlineFolderAdd, AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import CategoryItem from "./CategoryItem";

const SideBar = ({ handleCategoryChange, handlePageChange, page, currentCategory, categories, handleCategoriesChange }) => {
  const [storageChange, setStorageChange] = useState(false);
  //const [categories, setCategories] = useState([]); // Set initial state to []

  const handleCategoryClick = (category, link) => {
    handleCategoryChange(category);
    handlePageChange(link);
  };

  const handlelinkClick = (link) => {
    handlePageChange(link);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storageData = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];
      handleCategoriesChange();
      setStorageChange(prevState => !prevState);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return (
    <div className="bg-black-900 lg:w-96 md:w-48  pt-2 px-2 rounded-lg flex flex-col max-h-[90vh] min-h-[90vh]">
      <div className="ps-2 py-2 bg-neutral-950 text-gray-300 lg:block rounded-lg">
        <div onClick={() => handlelinkClick('mainComponent')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'mainComponent' ? 'text-white' : ''}`}>
          <span className="hidden sm:hidden md:block lg:block">Home</span>
          <AiOutlineHome className="me-2 text-2xl " />
        </div>
        <div onClick={() => handlelinkClick('categories')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'categories' ? 'text-white' : ''}`}>
          <span className="hidden sm:hidden md:block lg:block">Category</span>
          <AiOutlineFolderAdd className="me-2 text-2xl " />
        </div>
        <div onClick={() => handlelinkClick('songs')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'songs' ? 'text-white' : ''}`}>
          <span className="hidden sm:hidden md:block lg:block">Tracks</span>
          <AiOutlinePlus className="me-2 text-2xl " />
        </div>
        <div onClick={() => handlelinkClick('share')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'share' ? 'text-white' : ''}`}>
          <span className="hidden sm:hidden md:block lg:block"> Share</span>
          <BiShare className="me-2 text-2xl " />
        </div>
      </div>
      <div className="bg-neutral-950 mt-2 ps-2 pt-2 overflow-y-scroll rounded-md h-full">
        {categories?.map((category) => (
          <div key={category.name}>
            <CategoryItem category={category} handleCategoryClick={handleCategoryClick} currentCategory={currentCategory} handlePageChange={handlePageChange} handleCategoryChange={handleCategoryChange} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
