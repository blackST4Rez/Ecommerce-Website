import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { FadeLoader } from 'react-spinners'
import { toast } from 'sonner'
import { BiArrowBack } from 'react-icons/bi'
import { getProductById } from '../Data/Product.jsx'
import { useCart } from '../Context/CartContext'
import AddToCartButton from '../Common/AddToCartButton.jsx'

const ProductDetailsPage = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [cartValue, setCartValue] = useState(1)
    const [cartHandle, setCartHandle] = useState(false)
    const [currImage, setCurrImage] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            const foundProduct = getProductById(productId)

            if (foundProduct) {
                setProduct(foundProduct)
                setCurrImage(foundProduct.images[0])
            } else {
                toast.error('Product not found!')
                navigate('/')
            }

            setIsLoading(false)
        }, 1000)
    }, [productId, navigate])

    const handleImage = (image) => {
        setCurrImage(image)
    }

    const handleAddCart = () => {
        setCartValue((prev) => prev + 1)
    }

    const handleMinusCart = () => {
        if (cartValue > 1) {
            setCartValue((prev) => prev - 1)
        }
    }

    const handleCart = () => {
        if (cartValue <= 0) {
            toast.error('Please select the quantity', {
                duration: 3000
            })
            return
        }

        setCartHandle(true)

        addToCart(product, cartValue)

        setTimeout(() => {
            setCartHandle(false)
            setCartValue(1)
            toast.success(`${cartValue} ${product.name}(s) added to cart! 🎸`, {
                duration: 3000
            })
        }, 2000)
    }

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
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {product.images.map((image, index) => (
                            <img
                                onClick={() => handleImage(image)}
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover cursor-pointer border-2 
                                    ${currImage?.url === image.url ? 'border-[#CB2957]' : 'border-transparent'}
                                    hover:border-[#CB2957] transition-all`}
                            />
                        ))}
                    </div>

                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img
                                src={currImage?.url || product.images[0].url}
                                alt={product.name}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>

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

                    <div className="md:w-1/2">
                        <h1 className="text-3xl text-[#CB2957] font-semibold mb-2">
                            {product.name}
                        </h1>

                        {product.originalPrice && (
                            <p className="text-2xl text-gray-400 mb-1 line-through">
                                Rs. {product.originalPrice}
                            </p>
                        )}

                        <p className="text-2xl text-white mb-8 font-bold">
                            Rs. {product.price.toLocaleString()}
                        </p>

                        <p className="text-white mb-4 text-lg">
                            {product.description || ''}
                        </p>

                        <p className="text-white mb-4 text-lg">
                            <span className="font-semibold text-[#CB2957] text-xl">Type: </span>
                            {product.type || 'Premium Quality Guitar'}
                        </p>

                        {product.brand && (
                            <p className="text-white mb-4 text-lg">
                                <span className="font-semibold text-[#CB2957] text-xl">Brand:</span> {product.brand}
                            </p>
                        )}

                        {product.material && (
                            <p className="text-white mb-8 text-lg">
                                <span className="font-semibold text-[#CB2957] text-xl">Material:</span> {product.material}
                            </p>
                        )}

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

                        {cartHandle ? (
                            <button
                                disabled
                                className="w-full mt-3 bg-[#0d0e0f] text-[#CB2957] font-semibold py-2.5 px-4 rounded text-lg cursor-not-allowed transition-all ease-in-out duration-300 opacity-50"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></span>
                                    Adding...
                                </span>
                            </button>
                        ) : (
                            <AddToCartButton 
                                product={product} 
                                quantity={cartValue} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage