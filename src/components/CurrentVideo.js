import { useEffect, useState, useRef } from "react"
import { capitalize } from '../utils/miscUtils.js'


const CurrentVideo = (video) => {
    const [currentVideo, setCurrentVideo] = useState(video)

    useEffect(() => {
        setCurrentVideo(video.video.video)
    }, [video]);

    return (

        <div className="flex items-center" >
            {currentVideo?.id && (
                <>
                    <div className="me-2 ms-2">
                        <img className="h-16 rounded" src={`http://img.youtube.com/vi/${currentVideo?.id}/0.jpg`}></img>
                    </div>
                    <div className="align-middle">
                        <h3>{capitalize(currentVideo?.name)}</h3>
                        <p className="text-sm text-gray-500">{capitalize(currentVideo?.category)}</p>
                    </div>
                </>
            )}

        </div>
    )
}

export default CurrentVideo