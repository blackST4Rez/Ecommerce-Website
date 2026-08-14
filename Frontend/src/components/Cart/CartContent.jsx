import { BiTrash } from "react-icons/bi"

const CartContent = () => {

    const handleDeleteCartItem = () => {

    }

    const cartProducts = [
    {
        id: 1,
        name: 'Stratocastor',
        type: 'Electric',
        color: 'Sky',
        quantity: 2,
        price: 65,
        image: 'https://i.pinimg.com/736x/45/0b/11/450b1101a7155d131444cffc8c112365.jpg?random=1'
    },
    {
        id: 2,
        name: 'Telecastor',
        type: 'Electric',
        color: 'Green',
        quantity: 6,
        price: 55,
        image: 'https://i.pinimg.com/1200x/82/f3/08/82f308401d35b471b11f0a8bc296d7b5.jpg?random=2'
    },
    {
        id: 3,
        name: 'Acoustic',
        type: 'Acoustic',
        color: 'Brown',
        quantity: 2,
        price: 35,
        image: 'https://i.pinimg.com/736x/53/bf/3b/53bf3b24f3ab72a2136f742e7ea7a822.jpg?random=3'
    },
]

    return (
        <div className="text-white" >
            {
                cartProducts.map((product, idx) => (
                    <div key={idx}
                        className="flex items-start justify-between py-4 border-b border-gray-700"
                        >
                        <div className="flex gap-3 items-start flex-1 min-w-0">
                            <img src={product.image} alt={product.name} className="w-20 h-20 sm:w-16 sm:h-16 md:w-25 md:h-25 object-cover rounded shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white text-sm sm:text-base md:text-lg font-medium truncate">
                                    {product.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 truncate">
                                    Type: {product.type} | Color: {product.color}
                                </p>
                                <div className="flex items-center mt-2">
                                    <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black text-[#CB2957] border-l border-t border-b border-[#CB2957] hover:text-white text-sm sm:text-base">
                                        -
                                    </button>
                                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black text-white min-w-6 sm:min-w-7.5 text-center text-sm sm:text-base">
                                        {product.quantity}
                                    </span>
                                    <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black text-[#CB2957] border-r border-t border-b border-[#CB2957] hover:text-white text-sm sm:text-base">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="relative shrink-0 ml-2 flex flex-col">
                            <p className="text-white text-l sm:text-base md:text-lg">
                                Rs. <span className="font-bold">{(product.price * product.quantity).toLocaleString()}</span>
                            </p>
                            <button onClick={handleDeleteCartItem}>
                                <BiTrash size={18} className="sm:w-5 sm:h-5 text-red-600 absolute top-12 right-2 sm:top-17 " />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CartContent