import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie } from '../utils/cookieUtils'

const SongSelector = ({handleVideoChange}) => {
    const [cookies, setCookie] = useCookies();
    const [categories, setCategories] = useState([]);
    const [songs, setSongs] = useState([]);
    const [canRender, setCanRender] = useState(false);
    const [songsAndCategories, setSongsAndCategories] = useState([]);

    useEffect(() => {
        // On récupère les catégories
        const cookieCategories = handleGetCookie('categories', cookies);
        setCategories(cookieCategories??[]);
        const cookieSongs = handleGetCookie('songs', cookies);
        setSongs(cookieSongs ?? []);
    }, [cookies]);

    useEffect(() => {
        if (categories.length > 0 && songs.length > 0) {
            const groupedSongs = categories.reduce((result, category) => {
                const categorySongs = songs.filter(song => song.category === category);
                result[category] = categorySongs;
                return result;
            }, {});
            setSongsAndCategories(groupedSongs);
            setCanRender(true);
        }
    }, [categories, songs]);

    return (
        <>
            {songsAndCategories && canRender && (
                <div>
                    {Object.entries(songsAndCategories).map(([category, songs]) => (
                        <div key={category}>
                            <h3>{category}</h3>
                            <ul>
                                {songs.map((song, index) => (
                                    <button key={index} onClick={() => handleVideoChange(song)}>
                                        <ul>
                                            <li>{song.name}</li>
                                            <li>{song.url}</li>
                                            <img src={`http://img.youtube.com/vi/${song.id}/0.jpg`} ></img>
                                        </ul>
                                    </button>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default SongSelector;
