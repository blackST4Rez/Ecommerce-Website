import { useEffect, useRef, useState } from "react"
import { BiFilter } from "react-icons/bi"
import { useSearchParams } from "react-router"
import SortOptions from "../Products/SortOptions"
import ProductGrid from "../Products/ProductGrid"
import { FadeLoader } from "react-spinners"
import AMPFilterSidebar from "../Products/AMPFilterSidebar"

const AMPCollectionPage = () => {
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

    // Fetch AMP products
    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 101,
                    name: "Marshall JCM800",
                    price: 106468,
                    category: "Marshall",
                    material: "Solid Woods",
                    type: "Voltage Amplifiers",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/0a/0a/b1/0a0ab13da4dc3182b4a4a97f047ee863.jpg?random=101',
                    }],
                },
                {
                    _id: 102,
                    name: "Marshall JBD2090",
                    price: 175504,
                    category: "Marshall",
                    material: "Wood Composites",
                    type: "Operational Amplifiers",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/40/ee/d1/40eed17824bea8525b1177821f1ecbe0.jpg?random=102',
                    }],
                },
                {
                    _id: 103,
                    name: "Vox AC30",
                    price: 104063,
                    category: "Vox",
                    material: "Plywood",
                    type: "Power Amplifiers",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/35/a6/ce/35a6ce35de954ecd9737a53977792970.jpg?random=103',
                    }],
                },
                {
                    _id: 104,
                    name: "Vox Series 990D",
                    price: 189709,
                    category: "Vox",
                    material: "Polymers",
                    type: "Power Amplifiers",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/3e/81/0b/3e810b510dba4ce24bfba90de9933ebe.jpg?random=104',
                    }],
                },
                {
                    _id: 105,
                    name: "Fender 64 Bassman",
                    price: 149883,
                    category: "Fender",
                    material: "Polymers",
                    type: "Power Amplifiers",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/ac/32/48/ac3248f95d4685bb56f8ed2177ff6aa0.jpg?random=105',
                    }],
                },
                {
                    _id: 106,
                    name: "Fender Champion 20",
                    price: 148440,
                    category: "Fender",
                    material: "Wood Composites",
                    type: "urrent Amplifiers",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/66/f2/bb/66f2bbcc4e856bb3239047b0b5c7da18.jpg?random=106',
                    }],
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
        const material = searchParams.get('material')?.split(',') || []
        const type = searchParams.get('type')?.split(',') || []
        const sort = searchParams.get('sort') || 'default'

        let filtered = [...products]

        if (category) {
            filtered = filtered.filter(product =>
                product.category === category
            )
        }

        if (material.length > 0) {
            filtered = filtered.filter(product =>
                material.includes(product.material)
            )
        }

        if (type.length > 0) {
            filtered = filtered.filter(product =>
                type.includes(product.type)
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
            {/* Mobile Filter Button - Only visible on tablet and below */}
            <div className="lg:hidden top-0 z-40 px-4 py-2 bg-[#191b1c]">
                <button
                    onClick={toggleSidebar}
                    className="w-30 flex items-center justify-center gap-2 bg-[#131414] border-2 border-[#CB2957] hover:bg-[#000000] transition-all ease-in-out duration-300 p-2 rounded-full"
                >
                    <BiFilter size={20} className="text-[#CB2957]" />
                    <span className="text-white font-medium text-sm">Filters</span>
                </button>
            </div>

            {/* Filter Sidebar - Hidden on mobile, visible on large screens */}
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
                <AMPFilterSidebar onClose={toggleSidebar} />
            </div>

            {/* Overlay for mobile/tablet */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/70"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6 lg:p-4 bg-[#191b1c]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl uppercase text-[#CB2957] font-bold tracking-wider">
                        AMP Collection
                    </h2>
                    <div className="flex items-center gap-2 text-l font-semibold text-white">
                        <span>{filteredProducts.length}</span>
                        <span>products found</span>
                    </div>
                </div>
                
                {/* Sort Options */}
                <div className="mb-6">
                    <SortOptions />
                </div>
                
                {/* Product Grid with 3 columns for AMP */}
                <div className="mt-4">
                    <ProductGrid
                        products={filteredProducts.length > 0 ? filteredProducts : products}
                        isAmpCollection={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default AMPCollectionPage