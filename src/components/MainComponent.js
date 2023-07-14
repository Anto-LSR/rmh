import SongItem from "./SongItem"
import { HiChevronLeft, HiChevronRight, } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai"
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie } from '../utils/cookieUtils'

const MainComponent = ({ handleVideoChange, handleCategoryChange, currentCategory }) => {
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

    useEffect(() => {
        if (categories.length > 0 && songs.length > 0) {
            const groupedSongs = categories.reduce((result, category) => {
                const categorySongs = songs.filter((song) => song.category === category);
                result[category] = categorySongs;
                return result;
            }, {});
            setSongsAndCategories(groupedSongs);
            setCanRender(true);
        }
    }, [categories, songs]);


    return (
        <div className="bg-neutral-950 w-full overflow-hidden rounded-lg mt-2 me-2" style={{ maxHeight: '90vh' }}>
            <div style={{ minHeight: '7%' }} className="flex items-center bg-neutral-700">
                <div className="mx-2 flex items-center">
                    <HiChevronLeft />  <HiChevronRight /> <h1> {currentCategory} </h1><AiOutlinePlus /> <h1 className="tiiitre">add song</h1>
                </div>
            </div>

            <div className="mx-2 mt-2 overflow-scroll ps-2 py-2" style={{ height: '95%' }}>
                {songsAndCategories?.[currentCategory] && songsAndCategories[currentCategory].map((song, index) => (
                    <SongItem song={song} key={index} handleVideoChange={handleVideoChange} />
                ))}
            </div>
        </div>
    )
}

export default MainComponent