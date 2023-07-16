import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { capitalize } from '../utils/miscUtils.js'
import Divider from './Divider.js';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Popover, PopoverContent, PopoverHandler, Button } from '@material-tailwind/react'


const SongItem = (props) => {
    const changeVideo = (video) => {
        props.handleVideoChange(video)
    }

    const handleTrackDelete = (e) => {
        // handleSongDelete(props.song)
        //console.log(props.song);
        props.handleSongDelete(props.song)
    }


    return (
        <>
            <div className={`${props.currentVideo?.name == props.song?.name ? 'bg-gray-900' : ''}  my-2 rounded-md hover:bg-gray-900 hover:cursor-pointer flex items-center p-2`}>

                <div className="my-1 lg:my-3 w-full flex items-center justify-between" >
                    <div className="flex items-center gap-2 w-full" onClick={() => changeVideo(props.song)} >
                        <img className="hidden lg:block h-24 rounded-md" src={`http://img.youtube.com/vi/${props.song?.id}/0.jpg`}></img>
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <h3 className="my-1" >{capitalize(props.song.name)}</h3>
                                <h4 className="my-1 text-sm text-gray-500" >{capitalize(props.song.category)}</h4>
                            </div>
                        </div>
                    </div>
                    <div >
                        <Popover placement="left" >
                            <PopoverHandler>
                                <button className="flex justify-center items-center">
                                    <AiFillDelete className="me-6 text-gray-700 hover:text-red-500 transition ease-in" />
                                </button>
                            </PopoverHandler>
                            <PopoverContent className="bg-gray-800 border-gray-900 flex items-center">
                                <Button onClick={() => handleTrackDelete()} color="red">Delete</Button>
                                <span className="ms-2 text-white hidden md:block lg:block">Do you really want to delete this track ?</span>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="">
                <Divider />
            </div>
        </>

    )
}
export default SongItem