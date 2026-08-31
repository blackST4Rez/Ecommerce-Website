import { BiX } from "react-icons/bi"
import { useSearchParams } from "react-router"

const FilterSidebar = ({
    onClose
}) => {

    {/* Set useParams hook  */ }
    const [searchParams, setSearchParams] = useSearchParams()

    {/* Set all the filters in an arr inside a variable */ }
    const categories = ["Stratocastor", "Telecastor", "Les Paul"]
    const colors = ["Yellow", "Green", "Red", "White", "Blue", "Orange", "Beige"]
    const materials = ["Mahogany", "Maple", "Alder Woods"]
    const brands = ["Fender", "Squier", "Les Paul", "Gibson"]

    {/* Read the current filters from URL */ }
    const currentCategory = searchParams.get('category') || ''
    const currentColor = searchParams.get('color') || ''
    const currentMaterials = searchParams.get('material')?.split(',') || []
    const currentBrands = searchParams.get('brand')?.split(',') || []

    {/* Category Selection Handler*/ }
    const handleCategoryChange = (category) => {
        if (category === currentCategory) {
            searchParams.delete('category')
        } else {
            searchParams.set('category', category)
        }
        setSearchParams(searchParams)
    }

    {/* Color Selection Handler */ }
    const handleColorSelect = (color) => {
        if (color === currentColor) {
            searchParams.delete('color')
        } else {
            searchParams.set('color', color)
        }
        setSearchParams(searchParams)
    }

    {/* Multi Value Selection Handler */ }
    const handleMultiFilterChange = (key, value) => {
        const current = searchParams.get(key)?.split(',') || []
        let newValues

        if (current.includes(value)) {
            newValues = current.filter(v => v !== value)
        } else {
            newValues = [...current, value]
        }

        if (newValues.length > 0) {
            searchParams.set(key, newValues.join(','))
        } else {
            searchParams.delete(key)
        }
        setSearchParams(searchParams)
    }

    {/* Reset Filter */ }
    const handleReset = () => {
        setSearchParams({})
    }

    return (

        <div className="p-4 min-h-full bg-[#191b1c] flex flex-col hide-scrollbar">
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-medium text-[#CB2957]">Filters</h3>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="lg:hidden text-white hover:text-[#CB2957] hover:rotate-90 transition-all ease-in-out duration-300"
                    >
                        <BiX size={28} />
                    </button>
                )}
            </div>
            {/* Filter Options (Scrollable) */}
            <div className="flex-1 overflow-y-auto">

                {/* Category Filter */}
                <div className="mb-10">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">
                        Category
                    </label>
                    {categories.map((category) => (
                        <label key={category} className="flex items-center mb-1 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={currentCategory === category}
                                onChange={() => handleCategoryChange(category)}
                                className="mr-2 h-4 w-4 text-[#CB2957]"
                            />
                            <span className="text-white">{category}</span>
                        </label>
                    ))}
                </div>

                {/* Color Filter */}
                <div className="mb-10">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">
                        Colors
                    </label>
                    <div className="flex flex-wrap gap-2 pl-1">
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => handleColorSelect(color)}
                                className={`w-6 h-6 rounded-full border-2 cursor-pointer ${currentColor === color
                                    ? 'border-black ring-2 ring-[#ffffff]'
                                    : 'border-none'
                                    }`}
                                style={{ backgroundColor: color.toLowerCase() }}
                                aria-label={`Select ${color} color`}
                                title={color}
                            />
                        ))}
                    </div>
                </div>

                {/* Material Filter */}
                <div className="mb-10">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">
                        Materials
                    </label>
                    {materials.map((material) => (
                        <label key={material} className="flex items-center mb-1 cursor-pointer">
                            <input
                                type="checkbox"
                                name="material"
                                value={material}
                                checked={currentMaterials.includes(material)}
                                onChange={() => handleMultiFilterChange('material', material)}
                                className="mr-2 h-4 w-4 text-white"
                            />
                            <span className="text-white">{material}</span>
                        </label>
                    ))}
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">
                        Brands
                    </label>
                    {brands.map((brand) => (
                        <label key={brand} className="flex items-center mb-1 cursor-pointer">
                            <input
                                type="checkbox"
                                name="brand"
                                value={brand}
                                checked={currentBrands.includes(brand)}
                                onChange={() => handleMultiFilterChange('brand', brand)}
                                className="mr-2 h-4 w-4 text-white"
                            />
                            <span className="text-white">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Reset Button */}
            <div className="mt-auto pt-4 border-t border-gray-800">
                <button
                    onClick={handleReset}
                    className="w-full py-2 font-bold bg-[#CB2957] text-black rounded hover:bg-black hover:text-[#CB2957] transition-all ease-in-out duration-300"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    )
}

export default FilterSidebar