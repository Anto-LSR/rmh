import { FaPlay } from "react-icons/fa"

const SongItem = (props) => {
    const changeVideo = (video) => {
        props.handleVideoChange(video)
    }

    return (
        <div className="my-2">

            <div className="my-3" onClick={() => changeVideo(props.song)}>
                <div className="flex items-center gap-2">
                    <img className="h-24 rounded-md" src={`http://img.youtube.com/vi/${props.song?.id}/0.jpg`}></img>

                    <div>
                        <h3 className="my-1" >{props.song.name}</h3>
                        <h4 className="my-1" >{props.song.category}</h4>
                        <FaPlay className="my-1" />
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>

    )
}
export default SongItem