import { capitalize } from '../utils/miscUtils.js'
const CategoryItem = ({category, handleCategoryClick, currentCategory ,handlePageChange}) => {
    //alert(JSON.stringify(category))
    return (
        <div className={`my-3 rounded-md p-2 justify-between flex items-center hover:bg-gray-700 hover:cursor-pointer ${currentCategory?.name == category?.name ? 'bg-gray-900' :  ''}`} onClick={() => handleCategoryClick(category, 'mainComponent')}>
            <div className="flex items-center gap-2">
                <div className={`h-10 w-10 bg-${category.color}-500 rounded-md`}></div>
                <div><p>{capitalize(category.name)}</p></div>
            </div>
        </div>

    )
}
export default CategoryItem