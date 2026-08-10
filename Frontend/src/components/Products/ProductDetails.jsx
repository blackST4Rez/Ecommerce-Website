import { useEffect, useState } from "react"
import { toast } from 'sonner'
import { SyncLoader } from 'react-spinners'

const selectedProduct =
{
    name: "1984 Fender Stratocaster 57V",
    price: 120,
    originalPrice: 150,
    description: "Shut Up and Play your Guitar.",
    brand: "Fender",
    material: "Alder Woods",
    colors: ["#ffffff", "#0cd7ed"],
    images: [{
        url: "https://i.pinimg.com/736x/82/10/14/8210145493dc2859708c546ced7c1018.jpg?random=1",
        altText: "Fender Stratocastor",
    },
    {
        url: "https://i.pinimg.com/736x/ab/b1/f0/abb1f099750980304827bae59c7755e0.jpg?random=2",
        altText: "Fender Stratocastor",
    },
    ],
}

const ProductDetails = () => {
    const [mainImage, setMainImage] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [isButtonDisabled, setIsButtonDisabled] = useState("")
    
    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url)
        }
    }, [])

    const handleQuantityChange = (e) => {
        if (e === 'plus') {
            setQuantity((prev) => prev + 1)
        }
        if (e === 'minus' && quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    const handleAddToCart = () => {
        if (!selectedColor || !quantity) {
            toast.error('Please select the color & quantity.', {
                duration: 2000,
            })
            return
        }
        setIsButtonDisabled(true);
    
        setTimeout(() => {
            toast.success('Product added to cart.', {
                duration: 2000,
            })
            setIsButtonDisabled(false)
        }, 2000)
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col md:flex-row">
                {/* Left Thumbnail */}
                <div className="hidden md:flex flex-col space-y-4 mr-6">
                    {selectedProduct.images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={image.altText || `Thumbnail ${index}`} 
                        className={`w-20 h-20 object-cover cursor-pointer ${mainImage === image.url && "border-black border"}`}
                        onClick={() => setMainImage(image.url)}
                    />
                    ))}
                </div>
                {/* Main Image */}
                <div className="md:w-1/2">
                    <div className="mb-4">
                        <img
                            src={mainImage}
                            alt="Main-Product"
                            className="w-full h-100px object-cover"
                        />
                    </div>
                </div>
                {/* Mobile Thumbnails */}
                <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                    {selectedProduct.images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={image.altText || `Thumbnail ${index}`} 
                        className="w-20 h-20 object-cover cursor-pointer border"
                        onClick={() => setMainImage(image.url)}
                    />
                    ))}
                </div>
                {/* Right Section */}
                <div className="md:w-1/2 md:ml-10">
                    <h1 className="text-3xl text-[#CB2957] md:-3xl font-semibold mb-2">
                        {selectedProduct.name}
                    </h1>
                    <p className="priceTag text-2xl text-white mb-1 line-through" >
                        {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                    </p>
                    <p className="priceTag text-2xl text-white mb-2">
                        Rs. {selectedProduct.price}
                    </p>
                    <p className="text-gray-300 mb-4 text-xl" >
                        {selectedProduct.description}
                    </p>
                    <p className="text-gray-300 mb-4 text-xl" >
                        Brand: {selectedProduct.brand}
                    </p>
                    <p className="text-gray-300 mb-4 text-xl" >
                        Material: {selectedProduct.material}
                    </p>
                    <div className="mb-4">
                        <p className="text-gray-300 text-2xl">Colors:</p>
                        <div className="flex gap-2 mt-2">
                            {selectedProduct.colors.map((color) => (
                                <button
                                    onClick={() => setSelectedColor(color)}
                                    key={color}
                                    className={`w-8 h-8 rounded-full ${selectedColor === color && "border-black border-3"} `}
                                    style={{
                                        backgroundColor: color.toLowerCase(),
                                        filter: "brightness(0.5)",
                                    }}
                                >
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-white text-2xl">Quantity:</p>
                        <div className="flex items-center space-x-4 mt-2 gap-0.5">
                            <button
                                onClick={() => handleQuantityChange('minus')}
                                className="px-2 py-1 bg-black text-[#CB2957] text-lg w-8 h-8 flex items-center justify-center">-</button>
                            <span className="text-lg text-[#CB2957] w-8 text-center" >{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange('plus')}
                                className="px-2 py-1 bg-black text-[#CB2957] text-lg w-8 h-8 flex items-center justify-center">+</button>
                        </div>
                    </div>

                    <button
                        disabled={isButtonDisabled}
                        onClick={handleAddToCart}
                        className={`bg-[#CB2957] text-black border-2 border-black font-semibold py-3 px-2 w-[75%] mb-48 hover:bg-black hover:text-[#CB2957] transition-all ease-in-out duration-300 ${isButtonDisabled && "cursor-not-allowed bg-black border-2 border-[#CB2957] transition-all ease-in-out duration-300" }`}>
                        {isButtonDisabled
                            ? (
                            <div className="flex items-center justify-center gap-4" >
                                <span className="text-[#CB2957]" >Adding</span>
                                <SyncLoader color="#CB2957" size={10} />
                            </div>
                            )
                            : "Add to Cart"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails