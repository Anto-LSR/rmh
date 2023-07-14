import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie, handleSetCookie } from '../utils/cookieUtils'
import { LuMusic } from "react-icons/lu";
import { AiOutlineTag } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import CategoryItem from "./CategoryItem";
const SideBar = ({ handleCategoryChange }) => {
    const [cookies, setCookie] = useCookies();
    const [categories, setCategories] = useState([]);
    
    const handleCategoryClick = (category) => {
        handleCategoryChange(category)
    }

    useEffect(() => {
        // Simulating an asynchronous operation
        const cookieData = handleGetCookie('categories', cookies)

        setCategories(cookieData ?? [])

    }, [cookies]);

    return (
        <div className="bg-neutral-950 w-96 overflow-hidden my-2 mx-2 rounded-lg" style={{ minHeight: '90vh' }}>
            <div className=" ps-2 py-2" >
                <div className="flex items-center"><AiOutlineTag className="me-2" /> Add category</div>
                <div className="flex items-center"><LuMusic className="me-2" /> Add song</div>
                <div className="flex items-center"><BiShare className="me-2" /> Share</div>
            </div>
            <div className=" ps-2 py-2 overflow-scroll" style={{ height: '95%' }} >
                {categories.map((category) => (
                     <div key={category}>
                         <CategoryItem category={category}  handleCategoryClick={handleCategoryClick} />
                    </div>

                ))}
            </div>

        </div>
    )
}

export default SideBar