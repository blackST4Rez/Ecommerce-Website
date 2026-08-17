import { SyncLoader } from 'react-spinners'
import { toast } from 'sonner';
import { useState } from 'react';
import { useCart } from '../Context/CartContext';

const selectedProduct = {
    name: "1984 Fender Stratocaster 57V",
    price: 120,
    originalPrice: 150,
    description: "Shut Up and Play your Guitar.",
    brand: "Fender",
    material: "Alder Woods",
    colors: ["#ffffff", "#FF0000"],
    _id: 999,
    images: [{
        url: "https://i.pinimg.com/1200x/28/50/ac/2850aca174f068641c1ddf4b5a70c895.jpg?random=1",
        altText: "Fender Stratocastor",
    },
    {
        url: "https://i.pinimg.com/736x/ec/79/ab/ec79ab17bfc808c6d6a033a71c4cb371.jpg?random=2",
        altText: "Fender Stratocastor",
    },
    ],
}

const ProductDetails = () => {
    const { addToCart } = useCart();
    const [currImage, setCurrImage] = useState(selectedProduct.images[0])
    const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0])
    const [cartValue, setCartValue] = useState(1) // Changed from 0 to 1
    const [cartHandle, setCartHandle] = useState(false)

    const handleImage = (reqImage) => {
        setCurrImage(reqImage)
    }

    const handleColorButton = (color) => {
        setSelectedColor(color)
    }

    const handleAddCart = () => {
        setCartValue((prev) => prev + 1)
    }

    const handleMinusCart = () => {
        if (cartValue > 1) { // Changed from >= 1 to > 1
            setCartValue((prev) => prev - 1)
        }
    }

    const handleCart = () => {
        if (cartValue <= 0 || !selectedColor) { // Fixed condition
            toast.error('Please select the quantity & color', {
                duration: 3000
            })
            return
        }

        setCartHandle(true)

        const productToAdd = {
            ...selectedProduct,
            color: selectedColor,
        };
        
        addToCart(productToAdd, cartValue, selectedColor);

        setTimeout(() => {
            setCartHandle(false)
            setCartValue(1) // Reset to 1
            toast.success(`${selectedProduct.name} added to cart!`, {
                duration: 3000
            })
        }, 2000)
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col md:flex-row">
                <div className="hidden md:flex flex-col space-y-4 mr-6">
                    {selectedProduct.images.map((image, index) => (
                        <img
                            onClick={() => handleImage(image)}
                            key={index}
                            src={image.url}
                            alt={image.altText || `Thumbnail ${index}`}
                            className={`w-20 h-20 object-cover cursor-pointer ${currImage.url === image.url && "border-black border"}`}
                        />
                    ))}
                </div>
                <div className="md:w-1/2">
                    <div className="mb-4">
                        <img
                            src={currImage.url}
                            alt="Main-Product"
                            className="w-full h-100px object-cover rounded"
                        />
                    </div>
                </div>
                <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                    {selectedProduct.images.map((image, index) => (
                        <img
                            onClick={() => handleImage(image)}
                            key={index}
                            src={image.url}
                            alt={image.altText || `Thumbnail ${index}`}
                            className={`w-20 h-20 object-cover cursor-pointer ${currImage.url === image.url && "border-black border"}`}
                        />
                    ))}
                </div>
                <div className="md:w-1/2 md:ml-10">
                    <h1 className="text-3xl text-[#CB2957] md:-3xl font-semibold mb-2">
                        {selectedProduct.name}
                    </h1>
                    <p className="priceTag text-2xl text-white mb-1 line-through">
                        {selectedProduct.originalPrice && `Rs. ${selectedProduct.originalPrice}`}
                    </p>
                    <p className="priceTag text-2xl text-white mb-2">
                        Rs. {selectedProduct.price}
                    </p>
                    <p className="text-gray-300 mb-4 text-xl">
                        {selectedProduct.description}
                    </p>
                    <p className="text-gray-300 mb-4 text-xl">
                        Brand: {selectedProduct.brand}
                    </p>
                    <p className="text-gray-300 mb-4 text-xl">
                        Material: {selectedProduct.material}
                    </p>
                    <div className="mb-4">
                        <p className="text-gray-300 text-2xl">Colors:</p>
                        <div className="flex gap-2 mt-2">
                            {selectedProduct.colors.map((color) => (
                                <button
                                    onClick={() => handleColorButton(color)}
                                    key={color}
                                    className={`w-8 h-8 rounded-full border
                                    ${selectedColor === color && 'border-black border-2'}
                                    `}
                                    style={{
                                        backgroundColor: color.toLowerCase()
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
                                onClick={handleMinusCart}
                                className="px-2 py-1 bg-black text-[#CB2957] text-lg w-8 h-8 flex items-center justify-center hover:text-white transition-all ease-in-out duration-300"
                            >
                                -
                            </button>
                            <span className="text-lg text-[#CB2957] w-8 text-center">{cartValue}</span>
                            <button
                                onClick={handleAddCart}
                                className="px-2 py-1 bg-black text-[#CB2957] text-lg w-8 h-8 flex items-center justify-center hover:text-white transition-all ease-in-out duration-300"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleCart}
                        className={`bg-[#CB2957] text-black border-2 border-black font-semibold py-3 px-2 w-[75%] mb-8 flex items-center justify-center transition-all duration-300 ${cartHandle && "cursor-not-allowed bg-black"}`}
                    >
                        {cartHandle ? (
                            <div className="flex justify-center items-center">
                                <SyncLoader size={20} color='#CB2957' />
                            </div>
                        ) : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails