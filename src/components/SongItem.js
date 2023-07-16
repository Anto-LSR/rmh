import { capitalize } from '../utils/miscUtils.js'
import Divider from './Divider.js';

const SongItem = (props) => {
    const changeVideo = (video) => {
        props.handleVideoChange(video)
    }

    return (
        <>
            <div onClick={() => changeVideo(props.song)} className="my-2 rounded-md hover:bg-gray-900 hover:cursor-pointer flex items-center p-2">

                <div className="my-3" >
                    <div className="flex items-center gap-2">
                        <img className="h-24 rounded-md" src={`http://img.youtube.com/vi/${props.song?.id}/0.jpg`}></img>
                        <div>
                            <h3 className="my-1" >{capitalize(props.song.name)}</h3>
                            <h4 className="my-1 text-sm text-gray-500" >{capitalize(props.song.category)}</h4>
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