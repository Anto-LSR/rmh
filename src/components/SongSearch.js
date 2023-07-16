import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useCookies } from 'react-cookie';
import { handleGetCookie, handleSetCookie } from '../utils/cookieUtils'
const SongSearch = () => {
    const [cookies, setCookie] = useCookies();
    const [songInputValue, setSongInputValue] = useState('');
    const [isPlayable, setIsPlayable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [songTitleValue, setSongTitleValue] = useState('')
    const [category, setCategory] = useState()

    const handleSongInputChange = (event) => {
        setSongInputValue(event.target.value);
    }

    const handleSongButtonClick = () => {
        if (ReactPlayer.canPlay(songInputValue)) {
            setIsPlayable(true);
            setErrorMessage()
        } else {
            setIsPlayable(false);
            setErrorMessage('This link is not valid.')
        }
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const handleSongTitleInputChange = (event) => {
        setSongTitleValue(event.target.value)
    }

    const getYouTubeVideoId = (url) => {
        // Regular expression pattern to match YouTube URL formats
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})$/;

        // Extract the video ID using the pattern
        const match = url.match(pattern);

        // Return the video ID or null if no match found
        return match ? match[1] : null;
    }
    const handleNewSongBtnClicked = () => {
        // Check if all criteria are met
        if (category && categories.includes(category) && songTitleValue.length > 0) {
            // Get the existing songs
            let currentSongs = handleGetCookie("songs", cookies);

            // If the cookie doesn't exist, initialize it
            if (!currentSongs) {
                currentSongs = [];
            }

            // Check if a song with the same title already exists
            const titleAlreadyExists = currentSongs.some((song) => song.name === songTitleValue);

            if (!titleAlreadyExists) {
                // Add the new song to the list
                currentSongs.push({
                    name: songTitleValue,
                    url: songInputValue,
                    id: getYouTubeVideoId(songInputValue),
                    category: category
                });

                // Set the cookie
                handleSetCookie(
                    "songs",
                    currentSongs,
                    setCookie,
                    false,
                    false,
                    cookies
                );

                // Clear the error message
                setErrorMessage("");
            }
        } else {
            // Set the error message
            setErrorMessage("Something went wrong");
        }
    };

    useEffect(() => {
        //On récupère les catégories
        const cookieData = handleGetCookie('categories', cookies)
        setCategories(cookieData ?? [])
        //Par défaut on selectionne la premiere catégorie
        setCategory(cookieData ? cookieData[0] : null)
    }, [cookies]);
    return (
        <>
            {/* Si il y a des catégories */}
            {categories.length > 0 ?
                <div>
                    <p>Add a song ! : </p>
                    <div>
                        <input type="text" value={songInputValue} onChange={handleSongInputChange} />
                        <button onClick={handleSongButtonClick}>Ok !</button>
                    </div>
                    {isPlayable ? // Si l'URL est correcte
                        <div>
                            <div style={{ display: 'flex' }}>
                                <label>Catégorie :</label>
                                <select value={category.name} onChange={handleCategoryChange}>
                                    {categories.map((category) => (
                                        <option key={category.name} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Nom :</label>
                                <input type="text" value={songTitleValue} onChange={handleSongTitleInputChange} />
                            </div>
                            <button onClick={() => handleNewSongBtnClicked()}>Add the song</button>
                            {errorMessage ? 'Something went wrong' : ''};
                        </div>
                        //Si il y a un message d'erreur
                        : errorMessage ? <div>{errorMessage}</div>
                            //Sinon
                            : ''
                    }
                </div>
                :
                /* Si il n'y a pas de catégorie */
                <div>
                    <p>
                        You must first create at least one category to add new songs !
                </p>
                </div>
            }
        </>

    )

}
export default SongSearch
