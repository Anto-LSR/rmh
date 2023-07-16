import { Button, Typography, Select, Option, IconButton } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { BiBrush } from "react-icons/bi"
import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie, handleSetCookie } from '../utils/cookieUtils'

const AddCategory = () => {
    const [cookies, setCookie] = useCookies();
    const [select, setSelect] = useState('')
    const [newCategoryInputValue, setNewCategoryInputValue] = useState('');
    const [color, setColor] = useState('')
    const inputRef = useRef(null);

    const setSelectValue = (value) => {
        console.log(value);
        setSelect(value);
        setColor(value)
    }

    const handleNCButtonClick = () => {
        // Call your function here using the input value
        const category = {
            name: newCategoryInputValue,
            color: color
        }

        console.log(category);

        if (newCategoryInputValue.trim().length > 0) {
            setNewCategoryInputValue(newCategoryInputValue);
            setColor(color)

            handleSetCookie('categories', category, setCookie, true, false, cookies)
            handleGetCookie('categories', cookies)
            setNewCategoryInputValue('')
            setSelect('')
        }
    };

    const handleNewCategoryInputChange = (event) => {
        setNewCategoryInputValue(event.target.value);
    };

    const handleNewColorChange = (value) => {
        setColor(formatString(value))
    }


    const formatString = (str) => {
        // Convert the string to lowercase
        const lowerCaseStr = str.toLowerCase();

        // Check if the string contains a combination of uppercase and lowercase letters
        if (/[a-z][A-Z]/.test(lowerCaseStr)) {
            // Convert the string to lowercase and insert a hyphen between lowercase and uppercase letters
            return lowerCaseStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }

        // Return the lowercase string if it doesn't require any special formatting
        return lowerCaseStr;
    }


    return (
        <div className="my-2 mx-2"  >
            <div>
                <Typography variant="h3">Add a new category</Typography>
                <div className="flex gap-3 mt-4">
                    <Input value={newCategoryInputValue} onChange={handleNewCategoryInputChange} label="Category name" />

                </div>
                <div className="mt-4 ">
                    <Select ref={inputRef} color="blue" label="Select color" className="flex items-center justify-center" value={select} onChange={handleNewColorChange} >
                        <Option className="flex justify-between items-center bg-blue-gray-500 text-white mb-1" value="blue-gray" onClick={() => setSelectValue('BlueGray')}>
                            Blue Gray
                        </Option>

                        <Option className="flex justify-between items-center bg-gray-500 text-white mb-1" value="gray" onClick={() => setSelectValue('gray')}>
                            Gray
                        </Option>

                        <Option className="flex justify-between items-center bg-brown-500 text-white mb-1" value="brown" onClick={() => setSelectValue('brown')}>
                            Brown
                        </Option>

                        <Option className="flex justify-between items-center bg-deep-orange-500 text-white mb-1" value="deep-orange" onClick={() => setSelectValue('deep-orange')}>
                            Deep Orange
                        </Option>

                        <Option className="flex justify-between items-center bg-orange-500 text-white mb-1" value="Orange" onClick={() => setSelectValue('orange')}>
                            Orange
                        </Option>

                        <Option className="flex justify-between items-center bg-amber-500 text-white mb-1" value="Amber" onClick={() => setSelectValue('amber')}>
                            Amber
                        </Option>

                        <Option className="flex justify-between items-center bg-yellow-500 text-white mb-1" value="Yellow" onClick={() => setSelectValue('yellow')}>
                            Yellow
                        </Option>

                        <Option className="flex justify-between items-center bg-lime-500 text-white mb-1" value="Lime" onClick={() => setSelectValue('lime')}>
                            Lime
                        </Option>

                        <Option className="flex justify-between items-center bg-lime-green-500 text-white mb-1" value="LimeGreen" onClick={() => setSelectValue('lime-green')}>
                            Lime Green
                        </Option>

                        <Option className="flex justify-between items-center bg-green-500 text-white mb-1" value="Green" onClick={() => setSelectValue('green')}>
                            Green
                        </Option>

                        <Option className="flex justify-between items-center bg-teal-500 text-white mb-1" value="Teal" onClick={() => setSelectValue('teal')}>
                            Teal
                        </Option>

                        <Option className="flex justify-between items-center bg-cyan-500 text-white mb-1" value="Cyan" onClick={() => setSelectValue('cyan')}>
                            Cyan
                        </Option>

                        <Option className="flex justify-between items-center bg-light-blue-500 text-white mb-1" value="Light-Blue" onClick={() => setSelectValue('light-blue')}>
                            Light blue
                        </Option>

                        <Option className="flex justify-between items-center bg-blue-500 text-white mb-1" value="Blue" onClick={() => setSelectValue('blue')}>
                            Blue

                        </Option>

                        <Option className="flex justify-between items-center bg-indigo-500 text-white mb-1" value="Indigo" onClick={() => setSelectValue('indigo')}>
                            Indigo
                        </Option>

                        <Option className="flex justify-between items-center bg-deep-purple-500 text-white mb-1" value="Deep-Purple" onClick={() => setSelectValue('deep-purple')}>
                            Deep-Purple
                        </Option>

                        <Option className="flex justify-between items-center bg-purple-500 text-white mb-1" value="Purple" onClick={() => setSelectValue('purple')}>
                            Purple
                        </Option>

                        <Option className="flex justify-between items-center bg-pink-500 text-white mb-1" value="pink" onClick={() => setSelectValue('pink')}>
                            Pink
                        </Option>

                        <Option className="flex justify-between items-center bg-red-500 text-white mb-1" value="pink" onClick={() => setSelectValue('red')}>
                            Red
                        </Option>
                    </Select>
                </div>

                <div className="mt-4 w-full">
                    <Button onClick={handleNCButtonClick} size="md" fullWidth> Ok </Button>
                </div>
            </div>

        </div>
    )

}

export default AddCategory