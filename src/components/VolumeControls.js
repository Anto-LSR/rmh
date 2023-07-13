import { HiOutlineVolumeUp } from "react-icons/hi"

const VolumeControls = () => {

    return (
        <div className="flex justify-end me-2">
            <div>
                <HiOutlineVolumeUp />
            </div>
            <div>
                <input type="range" min={0} max="100" value="50" className="" />
            </div>
        </div>
    )
}

export default VolumeControls