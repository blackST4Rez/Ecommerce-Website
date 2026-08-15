import { useEffect, useRef, useState } from "react"
import { BiFilter } from "react-icons/bi"
import { useSearchParams } from "react-router"
import FilterSiderbar from "../Products/FilterSiderbar"
import SortOptions from "../Products/SortOptions"
import ProductGrid from "../Products/ProductGrid"
import { FadeLoader } from "react-spinners"

const CollectionPage = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchParams] = useSearchParams()
    const sidebarRef = useRef(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [])

    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "SG Gibsun",
                    price: 120,
                    category: "Les Paul",
                    color: "Red",
                    material: "Mahogany",
                    brand: "Gibson",
                    images: [{ url: 'https://i.pinimg.com/736x/ee/6a/95/ee6a95f4073291af10ef7debf71c0aa9.jpg?random=3' }],
                },
                {
                    _id: 2,
                    name: "Les Paul",
                    price: 130,
                    category: "Les Paul",
                    color: "Blue",
                    material: "Maple",
                    brand: "Les Paul",
                    images: [{ url: 'https://i.pinimg.com/1200x/e4/99/9d/e4999ddf471b0c890af9310487b35a40.jpg?random=4' }],
                },
                {
                    _id: 3,
                    name: "Fender 1997",
                    price: 140,
                    category: "Stratocastor",
                    color: "Yellow",
                    material: "Alder Woods",
                    brand: "Fender",
                    images: [{ url: 'https://i.pinimg.com/736x/1b/47/73/1b4773168313f814a97848a6c27c29ab.jpg?random=5' }],
                },
                {
                    _id: 4,
                    name: "Stratocastor 1890",
                    price: 150,
                    category: "Stratocastor",
                    color: "White",
                    material: "Alder Woods",
                    brand: "Squier",
                    images: [{ url: 'https://i.pinimg.com/1200x/a6/49/0c/a6490c389bcd0c8c92aadc4b16b1b823.jpg?random=6' }],
                },
                {
                    _id: 5,
                    name: "Ibanez 1890",
                    price: 160,
                    category: "Telecastor",
                    color: "Green",
                    material: "Maple",
                    brand: "Fender",
                    images: [{ url: 'https://i.pinimg.com/736x/7d/87/9b/7d879b6f720d06ab2f96f3ff732ca976.jpg?random=7' }],
                },
                {
                    _id: 6,
                    name: "Gibsun 2002",
                    price: 170,
                    category: "Les Paul",
                    color: "Red",
                    material: "Mahogany",
                    brand: "Gibson",
                    images: [{ url: 'https://i.pinimg.com/1200x/21/e5/a1/21e5a1a265d93996d3ef6b3dce14e5de.jpg?random=8' }],
                },
                {
                    _id: 7,
                    name: "Gibsun 2005",
                    price: 180,
                    category: "Telecastor",
                    color: "Blue",
                    material: "Alder Woods",
                    brand: "Squier",
                    images: [{ url: 'https://i.pinimg.com/1200x/c4/1f/06/c41f06e03a7a607e8aaed4051b68ec9f.jpg?random=9' }],
                },
                {
                    _id: 8,
                    name: "Telecastor Sparky",
                    price: 190,
                    category: "Telecastor",
                    color: "Yellow",
                    material: "Maple",
                    brand: "Fender",
                    images: [{ url: 'https://i.pinimg.com/736x/d7/7f/63/d77f632d5375a1b6d02193f5c8f7744c.jpg?random=10' }],
                },
            ]
            setProducts(fetchedProducts)
            setFilteredProducts(fetchedProducts)
            setIsFetching(false)
        }, 2000)
    }, [])

    // Apply filters whenever products or searchParams change
    useEffect(() => {
        if (products.length === 0) return

        const category = searchParams.get('category') || ''
        const color = searchParams.get('color') || ''
        const material = searchParams.get('material')?.split(',') || []
        const brand = searchParams.get('brand')?.split(',') || []
        const sort = searchParams.get('sort') || 'default'

        let filtered = [...products]

        if (category) {
            filtered = filtered.filter(product => 
                product.category === category
            )
        }

        if (color) {
            filtered = filtered.filter(product => 
                product.color === color
            )
        }

        if (material.length > 0) {
            filtered = filtered.filter(product => 
                material.includes(product.material)
            )
        }

        if (brand.length > 0) {
            filtered = filtered.filter(product => 
                brand.includes(product.brand)
            )
        }

        switch (sort) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price)
            break
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price)
            break
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name))
            break
        default:
            filtered.sort((a, b) => a._id - b._id)
            break
    }

        setFilteredProducts(filtered)
    }, [products, searchParams])

    if (isFetching) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FadeLoader color="#CB2957" />
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#191b1c]">
            {/* Mobile Filter Button */}
            <div className="lg:hidden top-0 z-40 px-4 py-2 bg-[#191b1c]">
                <button
                    onClick={toggleSidebar}
                    className="w-30 flex items-center justify-center gap-2 bg-[#131414] border-2 border-[#CB2957] hover:bg-[#000000] transition-all ease-in-out duration-300 p-2 rounded-full"
                >
                    <BiFilter size={20} className="text-[#CB2957]" />
                    <span className="text-white font-medium text-sm">Filters</span>
                </button>
            </div>

            {/* Filter Sidebar */}
            <div
                ref={sidebarRef}
                className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                    fixed lg:static
                    inset-y-0 left-0
                    w-72 lg:w-64
                    z-50 lg:z-auto
                    overflow-y-auto
                    transition-transform duration-300 ease-in-out
                    bg-[#191b1c]
                    h-full
                `}
            >
                <FilterSiderbar onClose={toggleSidebar} />
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 z-40 bg-black/70"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6 lg:p-4 bg-[#191b1c]">
                {/* Header with product count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl uppercase text-[#CB2957] font-bold tracking-wider">
                        Guitar Collection
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{filteredProducts.length}</span>
                        <span>products found</span>
                    </div>
                </div>
                
                {/* Sort Options */}
                <div className="mb-6 text-white">
                    <SortOptions />
                </div>
                
                {/* Product Grid */}
                <div className="mt-4">
                    <ProductGrid products={filteredProducts.length > 0 ? filteredProducts : products } />
                </div>
            </div>
        </div>
    )
}


export default CollectionPage