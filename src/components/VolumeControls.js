
import { useEffect } from "react"
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs"

const VolumeControls = ({ volume, muted, handleVolumeChange, handleMuteToggle, video }) => {

    useEffect(() => {


    }, [video])

    return (

        <div className="flex justify-end items-center me-2">
            {video && (
                <>
                    <div>
                        {!muted ?
                            <BsVolumeUp className="text-2xl" onClick={() => handleMuteToggle()} />

                            :
                            <BsVolumeMute className="text-2xl" onClick={() => handleMuteToggle()} />
                        }
                    </div>
                    <div className="items-center flex">
                        <input className="ms-2 rangeInput h2 rounded" type='range' min={1} max={100} onChange={handleVolumeChange}></input>
                    </div>
                </>


            )}
        </div>
    )
}

export default VolumeControls