import { useEffect, useRef, useState } from "react"
import { BiFilter } from "react-icons/bi"
import { useSearchParams } from "react-router"
import FilterSiderbar from "../Products/FilterSiderbar"
import SortOptions from "../Products/SortOptions"
import ProductGrid from "../Products/ProductGrid"
import { FadeLoader } from "react-spinners"

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
                    price: 899,
                    category: "Tube Amp",
                    color: "Black",
                    material: "Wood",
                    brand: "Marshall",
                    images: [{
                        url: 'https://i.pinimg.com/736x/7b/df/46/7bdf463789ef29da1cd092684045989c.jpg?random=101',
                    }],
                },
                {
                    _id: 102,
                    name: "Fender Blues Junior",
                    price: 699,
                    category: "Tube Amp",
                    color: "Tweed",
                    material: "Wood",
                    brand: "Fender",
                    images: [{
                        url: 'https://i.pinimg.com/736x/2d/4f/ef/2d4fef21ecd1cc0843cd4422d48b23d9.jpg?random=102',
                    }],
                },
                {
                    _id: 103,
                    name: "Vox AC30",
                    price: 1099,
                    category: "Tube Amp",
                    color: "Black",
                    material: "Wood",
                    brand: "Vox",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/39/9d/b0/399db03ceaf3abadddd4111f9f674dc9.jpg?random=103',
                    }],
                },
                {
                    _id: 104,
                    name: "Boss Katana 50",
                    price: 349,
                    category: "Solid State",
                    color: "Black",
                    material: "Plastic",
                    brand: "Boss",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/8e/15/55/8e15552cf7a78ca3f8ad644bea46963e.jpg?random=104',
                    }],
                },
                {
                    _id: 105,
                    name: "Orange Crush 35RT",
                    price: 399,
                    category: "Solid State",
                    color: "Orange",
                    material: "Plastic",
                    brand: "Orange",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/c7/f4/3f/c7f43fd1ad9f42df15c219ba58bdd386.jpg?random=105',
                    }],
                },
                {
                    _id: 106,
                    name: "Peavey 6505",
                    price: 1299,
                    category: "Tube Amp",
                    color: "Black",
                    material: "Wood",
                    brand: "Peavey",
                    images: [{
                        url: 'https://i.pinimg.com/736x/36/dd/4a/36dd4ac40a4a2552f994204ec853aec1.jpg?random=106',
                    }],
                },
                {
                    _id: 107,
                    name: "Line 6 Spider V",
                    price: 299,
                    category: "Digital",
                    color: "Black",
                    material: "Plastic",
                    brand: "Line 6",
                    images: [{
                        url: 'https://i.pinimg.com/1200x/de/d2/f7/ded2f7420cc2436672a9af511bdf37d8.jpg?random=107',
                    }],
                },
                {
                    _id: 108,
                    name: "Marshall DSL40CR",
                    price: 799,
                    category: "Tube Amp",
                    color: "Black",
                    material: "Wood",
                    brand: "Marshall",
                    images: [{
                        url: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/products/13217/images/48030/261206-DSL20_C_Front__66137.1715105815.1280.1280.jpg?c=1?random=108',
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
                <FilterSiderbar onClose={toggleSidebar} />
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
                    <div className="flex items-center gap-2 text-sm text-gray-400">
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