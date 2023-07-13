import { FaPlay} from "react-icons/fa"
import {BsFillSkipStartFill, BsFillSkipEndFill} from "react-icons/bs"
const PlayerControls = () => {

    return (
        <div className="flex justify-center">
            <div>
                <div className="flex justify-center">
                    <BsFillSkipStartFill/>
                    <FaPlay/>
                    <BsFillSkipEndFill/>
            </div>
                <div>
                    <input type="range"></input>
                </div>
            </div>
        </div>
    )


}

export default PlayerControls