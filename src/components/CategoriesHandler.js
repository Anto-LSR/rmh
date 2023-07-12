import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie, handleSetCookie } from '../utils/cookieUtils'

/**
 * Composant pour ajouter une catégorie
 */
const CategoriesHandler = () => {
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies();
    const [newCategoryInputValue, setNewCategoryInputValue] = useState('');


    const handleNCButtonClick = () => {
        // Call your function here using the input value

        // Clear the input value
        if(newCategoryInputValue.trim().length > 0){
            setNewCategoryInputValue(newCategoryInputValue);
            handleSetCookie('categories', newCategoryInputValue, setCookie, true, false, cookies)
            handleGetCookie('categories', cookies)
            setNewCategoryInputValue('')
        }
    };

    const handleNewCategoryInputChange = (event) => {
        setNewCategoryInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleNCButtonClick()
        }
      };
    return (
        <div>
            <p>Add a new Category : </p>
            <div>
                <input type="text" value={newCategoryInputValue} onKeyPress={handleKeyPress} onChange={handleNewCategoryInputChange} />
                <button onClick={handleNCButtonClick}>Submit</button>
            </div>

        </div>
    )

}

export default CategoriesHandler