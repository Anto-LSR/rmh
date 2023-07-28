import CurrentVideo from "./CurrentVideo"
import PlayerControls from "./PlayerControls"
import VolumeControls from "./VolumeControls"
import VideoPlayer from "./VideoPlayer"

import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const Footer = ({ video, handleNextSong, handlePreviousSong, spacePressed }) => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [volume, setVolume] = useState(1);
    const playerRef = useRef(null);
    const [progress, setProgress] = useState('')
    const [duration, setDuration] = useState('')
    const [secondsPlayed, setSecondsPlayed] = useState('')

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.seekTo(0);
            playerRef.current.seekTo(0, 'volume');
        }
    }, [video]);

    useEffect(() => {
        if(video ){
            setPlaying(!playing)
        }
    }, [spacePressed])

    const handlePlayPause = () => {
        setPlaying(!playing);
        if (muted) handleMuteToggle()
    };

    const handleMuteToggle = () => {
        setMuted(!muted);
    };

    const handleVolumeChange = (event) => {
        const volume = mapValue(event.target.value);
        setVolume(volume)
    }

    const mapValue = (value) => {
        const outputValue = value / 100;
        return outputValue.toFixed(1);
    }

    const handleProgress = (progress) => {
        const percentage = (progress.playedSeconds / duration) * 100
        setProgress(percentage.toFixed(2))
        setSecondsPlayed(progress.playedSeconds)
    }

    const handleDuration = (duration) => {
        setDuration(duration)
    }

    return (
        <>
            <div className="flex items-center grid grid-rows-1 grid-flow-col gap-4 bg-[#000000] min-h-[10vh] max-h-[10vh]" >
                <div className="hidden md:block lg:block">
                    <CurrentVideo video={video}></CurrentVideo>
                </div>
                <div>
                    <PlayerControls handlePlayPause={handlePlayPause} playing={playing} secondsPlayed={secondsPlayed} duration={duration} progress={progress} video={video} handleNextSong={handleNextSong} handlePreviousSong={handlePreviousSong} spacePressed={spacePressed} />
                </div>
                <div className="hidden lg:block">
                    <VolumeControls volume={volume} muted={muted} handleVolumeChange={handleVolumeChange} handleMuteToggle={handleMuteToggle} />
                </div>
            </div>
            <VideoPlayer video={video} playing={playing} muted={muted} volume={volume} handleProgress={handleProgress} handleDuration={handleDuration} />
        </>
    )
}

export default Footer