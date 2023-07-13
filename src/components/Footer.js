import CurrentVideo from "./CurrentVideo"
import PlayerControls from "./PlayerControls"
import VolumeControls from "./VolumeControls"

const Footer = () => {

    return (
        <div className="border-4 border-indigo-500 flex items-center grid grid-rows-1 grid-flow-col gap-4" style={{ minHeight: '7vh' }} >
            <CurrentVideo></CurrentVideo>
            <PlayerControls/>
            <VolumeControls/>
        </div>
    )
}

export default Footer