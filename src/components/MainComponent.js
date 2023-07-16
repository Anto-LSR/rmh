import SongItem from "./SongItem"
import { HiChevronLeft, HiChevronRight, } from "react-icons/hi";
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie } from '../utils/cookieUtils'
import AddCategory from "./AddCategory";
import { capitalize } from '../utils/miscUtils.js'
import AddSong from "./AddSong";

const MainComponent = ({ handleVideoChange, handleCategoryChange, currentCategory, page }) => {
    const [cookies, setCookie] = useCookies();
    const [categories, setCategories] = useState([]);
    const [songs, setSongs] = useState([]);
    const [canRender, setCanRender] = useState(false);
    const [songsAndCategories, setSongsAndCategories] = useState([]);

    useEffect(() => {
        // On récupère les catégories
        const cookieCategories = handleGetCookie('categories', cookies);
        setCategories(cookieCategories ?? []);
        const cookieSongs = handleGetCookie('songs', cookies);
        setSongs(cookieSongs ?? []);
    }, [cookies]);

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
        //return categories.indexOf(category) == length
        return categories.findIndex(obj => obj?.name == category?.name) == length
    }

    const isPrevBtnDisabled = () => {
        const category = currentCategory;
        return categories.findIndex(obj => obj?.name == category?.name) == 0
    }

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


    return (
        <div className="bg-neutral-950 w-full overflow-hidden rounded-lg mt-2 me-2" style={{ maxHeight: '90vh' }}>
            {/* MAIN COMPONENT */}
            {page === 'mainComponent' && (
                <>
                    <div style={{ minHeight: '6%' }} className={`flex items-center ${currentCategory?.color ? 'bg-' + currentCategory?.color + '-500' : 'bg-gray-900'}`}>
                        <div className="mx-2 flex items-center gap-2">
                            <div onClick={() => handlePreviousCategory()} className={`h-8 w-8  flex items-center justify-center rounded-full  ${isPrevBtnDisabled() ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 hover:scale-110 transition ease-in-out cursor-pointer'}`} >
                                <HiChevronLeft className=" text-2xl " />
                            </div>
                            <div onClick={() => handleNextCategory()} className={`h-8 w-8  flex items-center justify-center rounded-full  ${isNextBtnDisabled() ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 hover:scale-110 transition ease-in-out cursor-pointer'}`}>
                                <HiChevronRight className=" text-2xl" />
                            </div>
                            <h1 className="ms-3 text-xl select-none"> {capitalize(currentCategory?.name)} </h1>
                        </div>
                    </div>

                    <div className="mx-4 mt-4 overflow-scroll ps-2 py-2" style={{ height: '95%' }}>
                        {songsAndCategories?.[currentCategory?.name] != undefined && songsAndCategories[currentCategory?.name].map((song, index) => (
                            <SongItem song={song} key={index} handleVideoChange={handleVideoChange} />
                        ))}
                    </div>
                </>
            )}
            {/* GESTION CATEGORIES */}
            {page === 'categories' && (
                <div style={{ height: '100%' }} className="flex justify-center items-center">
                    <AddCategory />
                </div>
            )}

            {/* GESTION VIDEOS */}
            {page === 'songs' && (
                <div style={{ height: '100%' }} className="flex items-center justify-center">
                    <AddSong categories={categories} />
                </div>
            )}


        </div>
    )
}

export default MainComponent