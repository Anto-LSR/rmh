import { Button, Typography, Select, Option, IconButton, Input } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import ReactPlayer from 'react-player';
import { useCookies } from 'react-cookie';
import { handleGetCookie, handleSetCookie } from '../utils/cookieUtils'

const AddSong = ({ categories }) => {
    const [cookies, setCookie] = useCookies();
    const [songInputValue, setSongInputValue] = useState('')
    const [isPlayable, setIsPlayable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isNotPlayable, setIsNotPlayable] = useState(false);
    const [categoryValue, setCategoryValue] = useState('')
    const [songTitleValue, setSongTitleValue] = useState('')


    const handleSongInputChange = (event) => {
        setSongInputValue(event.target.value);
        setIsNotPlayable(false)
        setIsPlayable(false)

    }

    const handleSongButtonClick = () => {
        if (ReactPlayer.canPlay(songInputValue)) {
            setIsPlayable(true);
            setIsNotPlayable(false)
            setErrorMessage()
        } else {
            setIsPlayable(false);
            setIsNotPlayable(true)
            setErrorMessage('This link is not valid.')
        }
    }
    const getYouTubeVideoId = (url) => {
        // Regular expression pattern to match YouTube URL formats
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})$/;

        // Extract the video ID using the pattern
        const match = url.match(pattern);

        // Return the video ID or null if no match found
        return match ? match[1] : null;
    }

    const handleSubmit = (e) => {
        console.log(songInputValue);
        console.log(categoryValue);
        console.log(songTitleValue);
        if (categoryValue && songTitleValue.length > 0) {
            let currentSongs = handleGetCookie("songs", cookies);
            console.log('songs from cookies ', currentSongs);

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
                    category: categoryValue
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
            } else {
                // Set the error message
                setErrorMessage("Something went wrong");
            }
        }
    }

    const handleCategorySelect = (e) => {
        setCategoryValue(e)
    }

    const handleSongTitleInputChange = (event) => {
        setSongTitleValue(event.target.value)
    }


    return (
        <div className="my-2 mx-2"  >
            <div>
                <Typography variant="h3">Add a new track</Typography>
                <div className="flex gap-3 mt-4">
                    <Input value={songInputValue} onChange={handleSongInputChange} label="Video URL" />
                    <Button onClick={handleSongButtonClick} className={`${isNotPlayable ? 'bg-red-500' : `${isPlayable && !isNotPlayable ? 'bg-green-500' : 'bg-blue-500'}`} `}>
                        {isPlayable && !isNotPlayable && (
                            <AiOutlineCheck className="" />
                        )}
                        {!isPlayable && !isNotPlayable && (
                            'Ok'
                        )}
                        {isNotPlayable && (
                            <VscError className="text-md " />
                        )}
                    </Button>
                </div>
                <div className="mt-4 ">
                </div>
                {isPlayable && (
                    <>
                        <div className="mt-4 ">
                            <Select value={categoryValue} label="Category">
                                {categories?.map((category) => (
                                    <Option key={category?.name} className={`${'bg-' + category?.color + '-500'} mb-1 text-white`} onClick={(e) => handleCategorySelect(category?.name)}>
                                        {category?.name}
                                    </Option>
                                ))}
                            </Select>

                        </div>
                        <div className="mt-4">
                            <Input value={songTitleValue} onChange={handleSongTitleInputChange} label="Track name" />

                        </div>
                        <Button className="mt-4" fullWidth onClick={handleSubmit}>ADD TRACK</Button>
                    </>
                )}
            </div>

        </div>
    )
}
export default AddSong