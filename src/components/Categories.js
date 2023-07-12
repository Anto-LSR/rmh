import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { handleGetCookie, handleSetCookie } from '../utils/cookieUtils'
import CategoriesHandler from './CategoriesHandler';

const Categories = () => {
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies();
    const [categories, setCategories] = useState([]);

    const handleCategoryDelete = (category) => {
        let currentCookie = handleGetCookie('categories', cookies);
        const newArray = currentCookie.filter((element) => { return element != category })
        handleSetCookie('categories', newArray, setCookie, false, true, cookies)
    }




    useEffect(() => {
        // Simulating an asynchronous operation
        const cookieData = handleGetCookie('categories', cookies)

        setCategories(cookieData ?? [])
        setLoading(false);

    }, [cookies]);
    return (
        <>
            <div>
                {loading ? (
                    'Loading!'
                ) : (
                    <div>
                        <p>Catégories :  </p>
                        <ul>
                            {categories.map((category) => (
                                <li key={category}>
                                    <div style={{ display: 'flex' }}>
                                        <p>{category}</p>
                                        <button onClick={() => handleCategoryDelete(category)}>Suppr.</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <CategoriesHandler />
        </>
    )
}
export default Categories;