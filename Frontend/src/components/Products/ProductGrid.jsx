import { Link } from "react-router"
import { BiCart } from "react-icons/bi"

const ProductGrid = ({ products, isAmpCollection = false }) => {
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-white text-xl mb-2">No products found</p>
                <p className="text-gray-400">Try adjusting your filters</p>
            </div>
        )
    }

    return (
        <div className={`
            grid gap-3 sm:gap-4 md:gap-5 lg:gap-6
            ${isAmpCollection 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }
        `}>
            {products.map((product) => (
                <div key={product._id} className="bg-[#252424] rounded-lg overflow-hidden">
                    <Link to={`/product/${product._id}`} className="block">
                        <div className={`
                            relative overflow-hidden bg-[#141313]
                            ${isAmpCollection 
                                ? 'aspect-4/3' 
                                : 'aspect-square'
                            }
                        `}>
                            <img
                                src={product.images[0]?.url || '/placeholder.jpg'}
                                alt={product.name}
                                className="w-full h-full object-contain p-2"
                                loading="lazy"
                            />
                            {/* Cart Icon on Image - Top Right */}
                            <button 
                                className="absolute top-2 right-2 bg-[#CB2957] text-black p-1.5 rounded-full"
                                onClick={(e) => {
                                    e.preventDefault()
                                    console.log('Added to cart:', product.name)
                                }}
                            >
                                <BiCart size={16} />
                            </button>
                        </div>
                    </Link>
                    <div className="p-3 md:p-4">
                        <Link to={`/product/${product._id}`}>
                            <h3 className="text-white text-sm md:text-base font-medium line-clamp-1">
                                {product.name}
                            </h3>
                        </Link>
                        
                        {/* Price */}
                        <p className="text-[#CB2957] font-bold text-base md:text-lg mt-1">
                            Rs.{product.price}
                        </p>

                        {/* AMP Tags - Category and Color */}
                        {isAmpCollection && (
                            <div className="mt-1 flex flex-wrap gap-1">
                                {product.category && (
                                    <span className="text-xs text-gray-300 bg-black/50 px-2 py-0.5 rounded">
                                        {product.category}
                                    </span>
                                )}
                                {product.color && (
                                    <span className="text-xs text-gray-300 bg-black/50 px-2 py-0.5 rounded">
                                        {product.color}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Brand Name - Below everything */}
                        {product.brand && (
                            <div className="mt-2">
                                <span className="text-sm text-gray-400">{product.brand}</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductGrid