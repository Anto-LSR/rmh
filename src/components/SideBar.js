import { LuMusic } from "react-icons/lu";
import { AiOutlineTag } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import CategoryItem from "./CategoryItem";
const SideBar = () => {

    return (
        <div className="border-4 border-sky-500 w-96 overflow-hidden" style={{maxHeight: '93vh'}}>
            <div className="border-2 border-sky-500 ps-2 py-2" >
                <div className="flex items-center"><AiOutlineTag className="me-2"/> Add category</div>
                <div className="flex items-center"><LuMusic className="me-2"/> Add song</div>
                <div className="flex items-center"><BiShare className="me-2"/> Share</div>
            </div>
            <div className="border-2 border-red-500 ps-2 py-2 overflow-scroll" style={{height: '95%'}} >
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
            </div>

        </div>
    )
}

export default SideBar