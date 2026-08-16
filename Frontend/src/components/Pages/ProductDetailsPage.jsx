import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { FadeLoader } from 'react-spinners'
import { toast } from 'sonner'
import { SyncLoader } from 'react-spinners'
import { BiArrowBack } from 'react-icons/bi'
import { getProductById } from '../Data/Product'
const ProductDetailsPage = () => {
    const { productId } = useParams() // Get product ID from URL
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedColor, setSelectedColor] = useState(null)
    const [cartValue, setCartValue] = useState(0)
    const [cartHandle, setCartHandle] = useState(false)
    const [currImage, setCurrImage] = useState(null)

    /* Fetch product data based on ID */
    useEffect(() => {
        /* Simulate API call */
        setTimeout(() => {
            /* Your complete product database also ID is already filtered in data/Product */
            const foundProduct = getProductById(productId)

            if (foundProduct) {
                setProduct(foundProduct)
                setCurrImage(foundProduct.images[0])
                setSelectedColor(foundProduct.colors?.[0] || "#000000")
            } else {
                // Product not found
                toast.error('Product not found!')
                navigate('/')
            }

            setIsLoading(false)
        }, 1000)
    }, [productId, navigate])

    // Handlers for product interactions
    const handleImage = (image) => {
        setCurrImage(image)
    }

    const handleColorButton = (color) => {
        setSelectedColor(color)
    }

    const handleAddCart = () => {
        setCartValue((prev) => prev + 1)
    }

    const handleMinusCart = () => {
        if (cartValue >= 1) {
            setCartValue((prev) => prev - 1)
        }
    }

    const handleCart = () => {
        if (cartValue === 0 || selectedColor === null) {
            toast.error('Please select the quantity', {
                duration: 3000
            })
            return
        }

        setCartHandle(true)

        setTimeout(() => {
            setCartHandle(false)
            setCartValue(0)
            toast.success('Items added to cart', {
                duration: 3000
            })
        }, 2000)
    }

    /* Navigate to  previous page */
    const goBack = () => {
        navigate(-1)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#191b1c]">
                <FadeLoader color="#CB2957" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-[#191b1c] text-white">
                <h2 className="text-3xl text-[#CB2957] mb-4">Product Not Found</h2>
                <button
                    onClick={goBack}
                    className="bg-[#CB2957] text-black px-6 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        )
    }

    return (
        <div className="bg-[#191b1c] min-h-screen py-8">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 mb-4">
                <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-[#CB2957] hover:text-white transition-colors"
                >
                    <BiArrowBack size={24} />
                    <span>Back</span>
                </button>
            </div>

            <div className="max-w-6xl mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Thumbnails */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {product.images.map((image, index) => (
                            <img
                                onClick={() => handleImage(image)}
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover cursor-pointer border-2 
                                    ${currImage?.url === image.url ? 'border-black' : 'border-transparent'}
                                    hover:border-[#CB2957] transition-all`}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img
                                src={currImage?.url || product.images[0].url}
                                alt={product.name}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Mobile Thumbnails */}
                    <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4 hide-scrollbar">
                        {product.images.map((image, index) => (
                            <img
                                onClick={() => handleImage(image)}
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover cursor-pointer border-2 
                                    ${currImage?.url === image.url ? 'border-[#CB2957]' : 'border-transparent'}`}
                            />
                        ))}
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2">
                        <h1 className="text-3xl text-[#CB2957] font-semibold mb-2">
                            {product.name}
                        </h1>

                        {product.originalPrice && (
                            <p className="text-2xl text-gray-400 mb-1 line-through">
                                Rs. {product.originalPrice}
                            </p>
                        )}

                        <p className="text-2xl text-white mb-4 font-bold">
                            Rs. {product.price.toLocaleString()}
                        </p>

                        <p className="text-white mb-8 text-lg">
                            {product.description || ''}
                        </p>

                        <p className="text-white mb-4 text-lg">
                            <span className="font-semibold text-[#CB2957] text-xl">Type: </span>{product.type || 'Premium Quality Guitar'}
                        </p>

                        {product.brand && (
                            <p className="text-white mb-4 text-lg">
                                <span className="font-semibold text-[#CB2957] text-xl">Brand:</span> {product.brand}
                            </p>
                        )}

                        {product.material && (
                            <p className="text-white mb-15 text-lg">
                                <span className="font-semibold text-[#CB2957] text-xl">Material:</span> {product.material}
                            </p>
                        )}

                        {/* Quantity */}
                        <div className="mb-4">
                            <p className="text-white text-2xl">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2 gap-0.5">
                                <button
                                    onClick={handleMinusCart}
                                    className="px-2 py-1 bg-black text-[#CB2957] text-lg w-8 h-8 flex items-center justify-center hover:text-white transition-all ease-in-out duraiotn-300">
                                    -
                                </button>
                                <span className="text-lg text-[#CB2957] w-8 text-center">{cartValue}</span>
                                <button
                                    onClick={handleAddCart}
                                    className="px-2 py-1 bg-black text-[#CB2957] text-lg w-8 h-8 flex items-center justify-center hover:text-white transition-all ease-in-out duraiotn-300">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleCart}
                            className={`bg-[#CB2957] text-black border-2 border-black font-semibold py-3 px-2 w-[75%] mb-8 flex items-center justify-center transition-all duration-300" ${cartHandle && "cursor-not-allowed bg-black"}`}
                        >
                            {cartHandle
                                ?
                                <div className="flex justify-center items-center">
                                    <SyncLoader size={20} color='#CB2957' />
                                </div>
                                : "Add to Cart"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage