import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie } from '../utils/cookieUtils'
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import CategoryItem from "./CategoryItem";
const SideBar = ({ handleCategoryChange, handlePageChange, page, currentCategory}) => {
    //alert(currentCategory)
    const [cookies, setCookie] = useCookies();
    const [categories, setCategories] = useState([]);

    const handleCategoryClick = (category, link) => {
        handleCategoryChange(category)
        handlePageChange(link)
    }

    const handlelinkClick = (link) => {
        handlePageChange(link);
        
    }

    useEffect(() => {
        // Simulating an asynchronous operation
        const cookieData = handleGetCookie('categories', cookies)

        setCategories(cookieData ?? [])
    }, [cookies]);

    return (
        <div className="bg-black-900 w-96 overflow-hidden my-2 mx-2 rounded-lg" style={{ minHeight: '90vh' }}>
            <div className=" ps-2 py-2 bg-neutral-950 text-gray-300" >
                <div onClick={() => handlelinkClick('mainComponent')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'mainComponent' ? 'text-white' : ''}`}><span>Home</span><AiOutlineHome className="me-2 text-2xl " /> </div>
                <div onClick={() => handlelinkClick('categories')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'categories' ? 'text-white' : ''}`}> <span>Category</span><AiOutlinePlus className="me-2 text-2xl " /> </div>
                <div onClick={() => handlelinkClick('songs')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'songs' ? 'text-white' : ''}`}><span>Tracks</span><AiOutlinePlus className="me-2 text-2xl " /> </div>
                <div onClick={() => handlelinkClick('share')} className={`text-gray-500 flex items-center hover:bg-white rounded-md hover:text-gray-900 transition ease-in-out cursor-pointer my-1 justify-between p-2 me-1 ${page === 'share' ? 'text-white' : ''}`}><span>Share</span><BiShare className="me-2 text-2xl " /> </div>
            </div>
            <div className="bg-neutral-950 mt-2 ps-2 py-2 overflow-scroll" style={{ height: '95%' }} >
                {categories.map((category) => (
                    <div key={category.name}>
                        <CategoryItem category={category} handleCategoryClick={handleCategoryClick} currentCategory={currentCategory} handlePageChange={handlePageChange} />
                    </div>

                ))}
            </div>

        </div>
    )
}

export default SideBar