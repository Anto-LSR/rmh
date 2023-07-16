import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { capitalize } from '../utils/miscUtils.js'
import Divider from './Divider.js';

const SongItem = (props) => {
    const changeVideo = (video) => {
        props.handleVideoChange(video)
    }


    return (
        <>
            <div onClick={() => changeVideo(props.song)} className="my-2 rounded-md hover:bg-gray-900 hover:cursor-pointer flex items-center p-2">

                <div className="my-1 lg:my-3 w-full" >
                    <div className="flex items-center gap-2">
                        <img className="hidden lg:block h-24 rounded-md" src={`http://img.youtube.com/vi/${props.song?.id}/0.jpg`}></img>
                        <div className="flex justify-between w-full">
                            <div>
                                <h3 className="my-1" >{capitalize(props.song.name)}</h3>
                                <h4 className="my-1 text-sm text-gray-500" >{capitalize(props.song.category)}</h4>
                            </div>
                            {
                                props.currentVideo?.name == props.song?.name && (
                                    <div className="flex items-center justify-between gap-2 ">
                                        <AiOutlineLoading3Quarters className="rotateIcon text-white text-xl" />
                                        <p className="text-white text-xs">Playing</p>
                                    </div>
                                )
                            }
                        </div>
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