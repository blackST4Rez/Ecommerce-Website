import { BiTrash } from "react-icons/bi"


const CartContent = () => {

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
                        className="flex items-start justify-between py-4 border-b"
                        >
                        <div className="flex items-start">
                            <img src={product.img} alt={product.name} className="w-24 h-24 object-cover" />
                            <div >
                                <h3 className="text-white" >{product.name}</h3>
                                <p className="text-sm text-gray-400" >Type: {product.type} | Color: {product.color}</p>
                                <div className="flex items-center mt-2">
                                    <button className="px-2 py-1 bg-white text-black border-r hover:bg-gray-200">-</button>
                                    <span className="px-2 py-1 bg-white text-black">{product.quantity}</span>
                                    <button className="px-2 py-1 bg-white text-black border-l hover:bg-gray-200">+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#CB2957]">Rs. {product.price.toLocaleString('ne-NP')} </p>
                            <button>
                                <BiTrash />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CartContent