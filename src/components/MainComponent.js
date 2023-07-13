import SongItem from "./SongItem"
import { HiChevronLeft, HiChevronRight,  } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai"

const MainComponent = () => {

    return (
        <div className="border-4 border-orange-500 w-full overflow-hidden" style={{ maxHeight: '93vh' }}>
            <div style={{ minHeight: '7%' }} className="flex items-center border-4 border-green-500">
                <div className="mx-2 flex items-center">
                    <HiChevronLeft />  <HiChevronRight /> <h1> Category name </h1><AiOutlinePlus /> <h1>add song</h1>
                </div>
            </div>

            <div className="mx-2 my-2 overflow-scroll" style={{ height: '93%' }} >
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
            </div>
        </div>
    )
}

export default MainComponent