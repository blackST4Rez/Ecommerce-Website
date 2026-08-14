

const SortOptions = () => {
    return (
        <div className="w-max">
            <select name="Sort" id="Sort" className="text-white bg-black px-3 py-2 rounded-full" >
                <option className="text-white font-semibold" value="popular">Most Popular</option>
                <option className="text-white font-semibold" value="ascending">Low to High</option>
                <option className="text-white font-semibold" value="descending">High to Low</option>
            </select>
        </div>
    )
}

export default SortOptions