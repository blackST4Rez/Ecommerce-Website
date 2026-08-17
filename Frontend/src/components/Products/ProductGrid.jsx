// src/components/Products/ProductGrid.jsx
import { Link } from 'react-router';
import AddToCartButton from '../Common/AddToCartButton.jsx';

const ProductGrid = ({ products, isAmpCollection = false }) => {
    if (!products || products.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                No products available
            </div>
        );
    }

    return (
        <div className={`grid gap-6 ${
            isAmpCollection 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
            {products.map((product) => (
                <div 
                    key={product._id} 
                    className="bg-[#1a1c1d] rounded-lg overflow-hidden flex flex-col"
                >
                    <Link to={`/product/${product._id}`} className="block overflow-hidden">
                        <div className="relative aspect-square bg-[#0d0e0f]">
                            <img 
                                src={product.images?.[0]?.url || product.image} 
                                alt={product.name} 
                                className="w-full h-full object-contain p-3"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                }}
                            />
                            {product.discount && (
                                <span className="absolute top-2 right-2 bg-[#CB2957] text-black text-xs font-bold px-2 py-1 rounded z-10">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>
                    </Link>
                    <div className="p-4 flex flex-col flex-1 bg-[#181616]">
                        <Link to={`/product/${product._id}`}>
                            <h3 className="text-white font-semibold text-lg line-clamp-1">
                                {product.name}
                            </h3>
                        </Link>
                        <p className="text-gray-400 text-sm">{product.brand || product.category || 'Guitar'}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-white font-bold text-xl">
                                Rs. {product.price.toLocaleString()}
                            </p>
                            {product.originalPrice && (
                                <p className="text-gray-500 text-sm line-through">
                                    Rs. {product.originalPrice.toLocaleString()}
                                </p>
                            )}
                        </div>
                        
                        <AddToCartButton product={product} quantity={1} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;