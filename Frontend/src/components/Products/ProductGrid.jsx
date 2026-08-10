import { Link } from "react-router"

const ProductGrid = ({
    products
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
            {products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="block">
                    <div className="p-4">
                        <div className="w-full h-150 mb-4">
                            <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="w-full h-full object-cover"    
                            />
                        </div>
                        <h3 className="navbarText text-[#CB2957] text-4xl mb-2">{product.name}</h3>
                        <p className="priceTag text-white font-medium text-xl tracking-tighter">Rs. {product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductGrid