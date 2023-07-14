import { useEffect, useState, useRef } from "react"

const CurrentVideo = (video) => {
    const [currentVideo, setCurrentVideo] = useState(video)

    useEffect(() => {
        setCurrentVideo(video.video.video)
    }, [video]);

    return (

        <div className="flex items-center" >
            <div className="me-2 ms-2">
                <img className="h-16 rounded" src={`http://img.youtube.com/vi/${currentVideo?.id}/0.jpg`}></img>
            </div>
            <div className="align-middle">
                <h3>{currentVideo?.name}</h3>
                <p>{currentVideo?.category}</p>
            </div>
        </div>
    )
}

export default CurrentVideo