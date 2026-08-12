import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

const FilterSiderbar = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFilters] = useState({
        category: "",
        color: "",
        material: [],
        brand: [],
    })

    const categories = ["Stratocastor", "Telecastor", "Les Paul"]
    const colors = ["Red", "Blue", "Green", "Yellow", "White"]
    const materials = ["Mahogany", "Maple", "Alder Woods"]
    const brands = ["Fender", "Squier", "Les Paul"]


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
        console.log({ name, value, checked, type });
        
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
        console.log(newFilters);
    }

    const handleColorClick = (color) => {
        setFilters(prev => ({
            ...prev,
            color: color
        }))
        console.log("Updated filters:", { ...filters, color });
    }

    return (
        <div className="p-4" >
            <h3 className="text-3xl font-medium text-[#CB2957] mb-10">Filters</h3>
            
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
                            className="mr-2 h-4 w-4 text-[#CB2957] focus:ring-[#CB2957] border-white"
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
                            className="w-6 h-6 rounded-full border-white cursor-pointer transition hover:scale-105"
                            style={{backgroundColor: color.toLowerCase()}}
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
                            className="mr-2 h-4 w-4 text-white focus:ring-[#CB2957] border-white"
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
                            className="mr-2 h-4 w-4 text-white focus:ring-[#CB2957] border-white"
                        />
                        <span className="text-white">{brand}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterSiderbar