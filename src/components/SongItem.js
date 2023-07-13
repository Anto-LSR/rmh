import { FaPlay} from "react-icons/fa"

const SongItem = () => {
    return (
        <div className="my-2">
            
            <div className="my-3">
                <div className="flex items-center gap-2">
                    <img className="h-24 rounded" src="https://i.scdn.co/image/ab67656300005f1f81faf876e87497d089a760d5"></img>

                    <div>
                        <h3 className="my-1" >Song title</h3>
                        <h4 className="my-1" >Category</h4>
                        <FaPlay className="my-1" />
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>

    )
}
export default SongItem