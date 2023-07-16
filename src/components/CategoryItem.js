import { HiOutlineDotsVertical } from 'react-icons/hi'
import { capitalize } from '../utils/miscUtils.js'
import { Fragment, useState } from 'react'
import {
    Button, Popover, PopoverContent, PopoverHandler, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input
} from '@material-tailwind/react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { useCookies } from 'react-cookie';
import { handleGetCookie, handleSetCookie } from '../utils/cookieUtils'


const CategoryItem = ({ category, handleCategoryClick, currentCategory, handlePageChange, handleCategoryChange }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [cookies, setCookie] = useCookies();
    const [editInputValue, setEditInputValue] = useState(category?.name)

    const handleDeleteOpen = () => {
        setDeleteOpen(!deleteOpen)
    }

    const handleDeleteConfirm = () => {

        let categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []
        const newArray = categories.filter((obj) => obj.name !== category?.name);
        localStorage.setItem('categories', JSON.stringify(newArray))


        //Gestion songs
        let songs = localStorage.getItem('songs') ? JSON.parse(localStorage.getItem('songs')) : []
        let newSongArray = [];

        songs.forEach(song => {
            if (song?.category !== category?.name) {
                newSongArray.push(song);
            }
        });
        localStorage.setItem('songs', JSON.stringify(newSongArray))

        setDeleteOpen(false)
        window.dispatchEvent(new Event('storage'))
        handleCategoryChange()
    }

    const handleEditOpen = () => {
        setEditOpen(!editOpen)
    }

    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value)
    }

    const handleEditConfirm = () => {
        //Gestion nom categorie
        let categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []
        const index = categories.findIndex((obj) => obj.name === category?.name);
        if (index !== -1) {
            categories[index].name = editInputValue;
        }
        localStorage.setItem('categories', JSON.stringify(categories))

        //Gestion nom songs
        let songs = localStorage.getItem('songs') ? JSON.parse(localStorage.getItem('songs')) : []
        let newSongArray = [];

        songs.forEach(song => {
            if (song?.category === category?.name) {
                song.category = editInputValue;
            }
            newSongArray.push(song);
        });
        localStorage.setItem('songs', JSON.stringify(newSongArray))

        setEditOpen(false)
        window.dispatchEvent(new Event('storage'))

    }

    const handleHMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    return (
        <div onMouseEnter={handleHMouseEnter} onMouseLeave={handleMouseLeave} className={`my-3 rounded-md p-2 justify-between flex items-center hover:bg-gray-700 hover:cursor-pointer transition ease-in-out ${currentCategory?.name == category?.name ? 'bg-gray-900' : ''}`} onClick={() => handleCategoryClick(category, 'mainComponent')}>
            <div className="flex items-center gap-2">
                <div className={`h-4 w-4 lg:h-10 lg:w-10 bg-${category.color}-500 rounded-md`}></div>
                <div className=" hidden sm:hidden md:block lg:block md:text-xs"><p>{capitalize(category.name)}</p></div>
            </div>
            <Popover placement="right" className="hidden md:block lg:block">
                <PopoverHandler>
                    <button className="hidden md:block lg:block">
                        <HiOutlineDotsVertical className={`hover:scale-150 transition ease-in-out rounded ${isHovered ? 'text-white' : 'text-gray-700'}`} />
                    </button>
                </PopoverHandler>
                <PopoverContent className="bg-gray-900 border-gray-700">
                    <div className=" items-center justify-between" >
                        <div className="flex items-center justify-between">
                            <div className="me-6">
                                Rename category
                            </div>
                            <Fragment>
                                <Button onClick={handleEditOpen}>
                                    <AiFillEdit className="text-lg " />
                                </Button>
                                <Dialog open={editOpen} handler={handleEditOpen} className="bg-gray-900 " >
                                    <DialogHeader className="text-white" >Rename {category?.name} </DialogHeader>
                                    <DialogBody divider className="text-white text-lg">
                                        <Input label="New name" value={editInputValue} onChange={handleEditInputChange} />
                                    </DialogBody>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={handleEditOpen}
                                            className="mr-1"
                                        >
                                            <span>Cancel</span>
                                        </Button>
                                        <Button variant="gradient" color="green" onClick={handleEditConfirm}>
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                            </Fragment>
                        </div>
                        <div className="flex items-center justify-between mt-2 ">
                            <div className="me-6">
                                Delete category
                            </div>
                            <Fragment>
                                <Button onClick={handleDeleteOpen} className="bg-red-500">
                                    <AiFillDelete className="text-lg " />
                                </Button>
                                <Dialog open={deleteOpen} handler={handleDeleteOpen} className="bg-gray-900 " >
                                    <DialogHeader className="text-white" >Delete {category?.name} ?</DialogHeader>
                                    <DialogBody divider className="text-white text-lg">
                                        This Category might contain some tracks, are you sure you want to delete it ?
                                </DialogBody>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={handleDeleteOpen}
                                            className="mr-1"
                                        >
                                            <span>Cancel</span>
                                        </Button>
                                        <Button variant="gradient" color="green" onClick={handleDeleteConfirm}>
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                            </Fragment>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>

    )
}
export default CategoryItem