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
                    name: "Epiphone Les Paul",
                    price: 198988,
                    category: "Les Paul",
                    color: "Yellow",
                    material: "Mahogany",
                    brand: "Epiphone",
                    images: [{ url: 'https://i.pinimg.com/1200x/e1/2c/c5/e12cc567423f40c4c6c94e2bc56d7d92.jpg?random=3' }],
                },
                {
                    _id: 2,
                    name: "Gibson Les Paul",
                    price: 159530,
                    category: "Les Paul",
                    color: "Green",
                    material: "Mahogany",
                    brand: "Gibson",
                    images: [{ url: 'https://i.pinimg.com/736x/5c/18/be/5c18bee1891d7af64cf71f41e4292bb5.jpg?random=4' }],
                },
                {
                    _id: 3,
                    name: "Fender Stratocastor 1997",
                    price: 178804,
                    category: "Stratocastor",
                    color: "Red",
                    material: "Alder Woods",
                    brand: "Fender",
                    images: [{ url: 'https://i.pinimg.com/736x/84/9e/d4/849ed4467f929ed71c64eb05d30c7d15.jpg?random=5' }],
                },
                {
                    _id: 4,
                    name: "Squier Stratocastor 1890",
                    price: 180736,
                    category: "Stratocastor",
                    color: "White",
                    material: "Alder Woods",
                    brand: "Squier",
                    images: [{ url: 'https://i.pinimg.com/736x/39/cb/27/39cb2737ef2ed022dcc0f2acffef23ae.jpg?random=6' }],
                },
                {
                    _id: 5,
                    name: "Fender Telecastor 1890",
                    price: 147023,
                    category: "Telecastor",
                    color: "Green",
                    material: "Maple",
                    brand: "Fender",
                    images: [{ url: 'https://i.pinimg.com/1200x/64/58/c3/6458c35b7648f8aa21b4696d3ebd36e9.jpg?random=7' }],
                },
                {
                    _id: 6,
                    name: "Squier Telecastor 2002",
                    price: 128223,
                    category: "Telecastor",
                    color: "Orange",
                    material: "Mahogany",
                    brand: "Squier",
                    images: [{ url: 'https://i.pinimg.com/736x/95/ce/f3/95cef33180b73ff38d1d6a5e69f31304.jpg?random=8' }],
                },
                {
                    _id: 7,
                    name: "Gibsun Firebird 2005",
                    price: 135203,
                    category: "Gibson",
                    color: "Blue",
                    material: "Alder Woods",
                    brand: "Gibson",
                    images: [{ url: 'https://i.pinimg.com/736x/16/f0/c7/16f0c7ccba9b0c0f1424e23f690f2904.jpg?random=9' }],
                },
                {
                    _id: 8,
                    name: "Gibson Firebird 2008",
                    price: 137864,
                    category: "Gibson",
                    color: "Beige",
                    material: "Maple",
                    brand: "Gibson",
                    images: [{ url: 'https://i.pinimg.com/736x/6b/af/64/6baf641532c6d4c9c51442e51e965a57.jpg?random=10' }],
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
                    <div className="flex items-center gap-2 text-l text-white font-semibold">
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