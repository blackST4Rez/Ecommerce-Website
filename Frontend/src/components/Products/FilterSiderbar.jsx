import { useEffect, useState } from "react"
import { useSearchParams, useLocation } from "react-router"
import { BiX } from "react-icons/bi"

const FilterSiderbar = ({ onClose }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const [filters, setFilters] = useState({
        category: "",
        color: "",
        material: [],
        brand: [],
    })

    // Check if we're on the AMP page
    const isAMPPage = location.pathname.includes('/amp')

    // Different filter options based on page
    const guitarCategories = ["Stratocastor", "Telecastor", "Les Paul"]
    const ampCategories = ["Tube Amp", "Solid State", "Digital"]
    const colors = ["Red", "Blue", "Green", "Yellow", "White", "Black", "Tweed", "Orange"]
    const guitarMaterials = ["Mahogany", "Maple", "Alder Woods"]
    const ampMaterials = ["Wood", "Plastic"]
    const guitarBrands = ["Fender", "Squier", "Les Paul", "Gibson"]
    const ampBrands = ["Marshall", "Fender", "Vox", "Boss", "Orange", "Peavey", "Line 6"]

    const categories = isAMPPage ? ampCategories : guitarCategories
    const materials = isAMPPage ? ampMaterials : guitarMaterials
    const brands = isAMPPage ? ampBrands : guitarBrands

    useEffect(() => {
        const params = Object.fromEntries([...searchParams])
        
        setFilters(prev => ({
            ...prev,
            category: params.category || prev.category,
            color: params.color || prev.color,
            material: params.material ? params.material.split(',') : prev.material,
            brand: params.brand ? params.brand.split(',') : prev.brand,
        }))
    }, [searchParams])

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target
        
        let newFilters = { ...filters }
        
        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value]
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value)
            }
        } else if (type === "radio") {
            newFilters[name] = value
        }
        
        setFilters(newFilters)
        
        // Update URL search params
        const params = new URLSearchParams()
        if (newFilters.category) params.set('category', newFilters.category)
        if (newFilters.color) params.set('color', newFilters.color)
        if (newFilters.material.length > 0) params.set('material', newFilters.material.join(','))
        if (newFilters.brand.length > 0) params.set('brand', newFilters.brand.join(','))
        setSearchParams(params)
    }

    const handleColorClick = (color) => {
        const newColor = filters.color === color ? "" : color
        setFilters(prev => ({
            ...prev,
            color: newColor
        }))
        
        const params = new URLSearchParams(searchParams)
        if (newColor) {
            params.set('color', newColor)
        } else {
            params.delete('color')
        }
        setSearchParams(params)
    }

    return (
        <div className="p-4 min-h-full bg-[#191b1c] flex flex-col">
            {/* Header with Filters text and Close Button */}
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-medium text-[#CB2957]">Filters</h3>
                {onClose && (
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-[#CB2957] transition-colors"
                    >
                        <BiX size={28} />
                    </button>
                )}
            </div>
            
            {/* Filter Options - Scrollable area */}
            <div className="flex-1 overflow-y-auto">
                {/* Category Filter */}
                <div className="mb-10">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">Category</label>
                    {categories.map((category) => (
                        <div key={category} className="flex items-center mb-1">
                            <input
                                onChange={handleFilterChange}
                                value={category}
                                type="radio"
                                name="category"
                                checked={filters.category === category}
                                className="mr-2 h-4 w-4 text-[#CB2957] focus:ring-[#CB2957]"
                            />
                            <span className="text-white">{category}</span>
                        </div>
                    ))}
                </div>
                
                {/* Color Sections */}
                <div className="mb-10">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">Colors</label>
                    <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                            <button
                                onClick={() => handleColorClick(color)}
                                key={color}
                                className={`w-6 h-6 rounded-full border-2 cursor-pointer transition hover:scale-105 ${
                                    filters.color === color ? 'border-[#CB2957]' : 'border-white'
                                }`}
                                style={{ backgroundColor: color.toLowerCase() }}
                            ></button>
                        ))}
                    </div>
                </div>
                
                {/* Material Filter */}
                <div className="mb-10">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">Materials</label>
                    {materials.map((material) => (
                        <div key={material} className="flex items-center mb-1">
                            <input
                                onChange={handleFilterChange}
                                value={material}
                                type="checkbox"
                                name="material"
                                checked={filters.material.includes(material)}
                                className="mr-2 h-4 w-4 text-white focus:ring-[#CB2957]"
                            />
                            <span className="text-white">{material}</span>
                        </div>
                    ))}
                </div>
                
                {/* Brand Sections */}
                <div className="mb-6">
                    <label className="block text-[#CB2957] font-medium mb-2 text-xl">Brands</label>
                    {brands.map((brand) => (
                        <div key={brand} className="flex items-center mb-1">
                            <input
                                onChange={handleFilterChange}
                                value={brand}
                                type="checkbox"
                                name="brand"
                                checked={filters.brand.includes(brand)}
                                className="mr-2 h-4 w-4 text-white focus:ring-[#CB2957]"
                            />
                            <span className="text-white">{brand}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Reset Filters Button - Sticky at bottom */}
            <div className="mt-auto pt-4 border-t border-gray-800">
                <button
                    onClick={() => {
                        setFilters({
                            category: "",
                            color: "",
                            material: [],
                            brand: [],
                        })
                        setSearchParams({})
                    }}
                    className="w-full py-2 bg-[#CB2957] text-black rounded hover:bg-black hover:text-[#CB2957] transition-all ease-in-out duration-300"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    )
}

export default FilterSiderbar