const CategoryItem = ({category, handleCategoryClick}) => {
    return (
        <div className="my-3" onClick={() => handleCategoryClick(category)}>
            <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-indigo-500"></div>
                <div><p>{category}</p></div>
            </div>
        </div>

    )
}
export default CategoryItem