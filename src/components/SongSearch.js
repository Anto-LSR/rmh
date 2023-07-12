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
    const handleNewSongBtnClicked = () => {
        //Si tous les critères sont remplis
        if (category && categories.includes(category) && songTitleValue.length > 0) {
            //On ajoute le morceau à la liste
            const cookieData = handleGetCookie('categories', cookies)
            if (cookieData.includes(category)) {
                let currentSongs = handleGetCookie('songs', cookies)
                if (!currentSongs) {
                    setCookie('songs', [], cookies)
                    currentSongs = handleGetCookie('songs', cookies)
                }
                let titleAlreadyExists = false;
                currentSongs.forEach(song => {
                    if (song.name == songTitleValue) {
                        titleAlreadyExists = true;
                        return
                    }
                })
                if (!titleAlreadyExists)
                    currentSongs.push({
                        name: songTitleValue,
                        url: songInputValue,
                        category: category
                    })

                handleSetCookie(
                    'songs',
                    currentSongs,
                    setCookie,
                    false,
                    false,
                    cookies
                )
               console.log(handleGetCookie('songs', cookies)); 
            }

            setErrorMessage('')
        } else {
            setErrorMessage("Something went wrong")
        }
        //Sinon on affiche l'erreur

    }

    useEffect(() => {
        //On récupère les catégories
        const cookieData = handleGetCookie('categories', cookies)
        setCategories(cookieData ?? [])
        //Par défaut on selectionne la premiere catégorie
        setCategory(cookieData[0] ?? null)
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
                                <select value={category} onChange={handleCategoryChange}>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
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
