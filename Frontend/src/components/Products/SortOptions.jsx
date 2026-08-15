import { useSearchParams } from "react-router"

const SortOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    
    // Get current sort value from URL
    const currentSort = searchParams.get('sort') || 'default'

    const handleSortChange = (e) => {
        const value = e.target.value
        
        if (value === 'default') {
            searchParams.delete('sort')
        } else {
            searchParams.set('sort', value)
        }
        
        setSearchParams(searchParams)
    }

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-white text-l font-semibold">
                Sort by:
            </label>
            <select
                id="sort"
                value={currentSort}
                onChange={handleSortChange}
                className="bg-[#252424] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[#CB2957] cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
            </select>
        </div>
    )
}

export default SortOptions