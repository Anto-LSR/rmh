import { FaPlay, FaPause } from "react-icons/fa"
import { BsFillSkipStartFill, BsFillSkipEndFill } from "react-icons/bs"
import { useEffect } from "react"
const PlayerControls = ({ handlePlayPause, playing, secondsPlayed, duration, progress, video }) => {

    


    const convertSecondsToMinutes = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      }
    return (
        <div className="flex justify-center">
            <div>
                <div className="flex justify-center items-center gap-3">
                    <BsFillSkipStartFill className="text-2xl text-gray-500 hover:text-white" />
                    {!playing ?
                        <div onClick={() => handlePlayPause()} className="h-10 w-10 bg-white flex items-center justify-center rounded-full hover:scale-110 transition ease-in-out cursor-pointer">
                            <FaPlay className="ps-1 text-xl text-gray-900" />
                        </div>
                        :
                        <div onClick={() => handlePlayPause()} className="h-10 w-10 bg-white flex items-center justify-center rounded-full hover:scale-110 transition ease-in-out cursor-pointer">
                            <FaPause className="text-xl text-gray-900 " />
                        </div>

                    }
                    <BsFillSkipEndFill className="text-2xl text-gray-500 hover:text-white" />
                </div>
                <div className="flex gap-2 items-center text-xs text-gray-500">
                    <span className="pt-1">

                        {secondsPlayed ? convertSecondsToMinutes(secondsPlayed?.toFixed(0)) :  video.video ?  '0:00' : ''}
                    </span>
                    <div className="rounded-md overflow-hidden h-2 flex mt-2 text-xs">
                        <progress className="h-1 progressBar w-96" max="100" value={progress}></progress>
                    </div>
                    <span className="pt-1">
                        {duration ? convertSecondsToMinutes(duration) : ''}
                    </span>
                </div>
            </div>
        </div>
    )


}

export default PlayerControls