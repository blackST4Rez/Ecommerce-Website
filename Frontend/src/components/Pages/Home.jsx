import Hero from "../Layout/Hero"
import FeaturedCollection from "../Products/FeaturedCollection"
import GuitarCollection from "../Products/GuitarCollection"
import NewArrivals from "../Products/NewArrivals"
import ProductDetails from "../Products/ProductDetails"
import ProductGrid from "../Products/ProductGrid"

const placeholderProducts = [
    {
        _id: 1,
        name: "SG Gibsun",
        price: 120,
        images: [{url:'https://i.pinimg.com/736x/ee/6a/95/ee6a95f4073291af10ef7debf71c0aa9.jpg?random=3'}],
    },
    {
        _id: 2,
        name: "Les Paul",
        price: 130,
        images: [{url:'https://i.pinimg.com/1200x/e4/99/9d/e4999ddf471b0c890af9310487b35a40.jpg?random=4'}],
    },
    {
        _id: 3,
        name: "Fender 1997",
        price: 140,
        images: [{url:'https://i.pinimg.com/736x/1b/47/73/1b4773168313f814a97848a6c27c29ab.jpg?random=5'}],
    },
    {
        _id: 4,
        name: "Stratocastor 1890",
        price: 150,
        images: [{url:'https://i.pinimg.com/1200x/a6/49/0c/a6490c389bcd0c8c92aadc4b16b1b823.jpg?random=6'}],
    },
    {
        _id: 5,
        name: "ibanez 1890",
        price: 160,
        images: [{url:'https://i.pinimg.com/736x/7d/87/9b/7d879b6f720d06ab2f96f3ff732ca976.jpg?random=7'}],
    },
    {
        _id: 6,
        name: "Gibsun 2002",
        price: 170,
        images: [{url:'https://i.pinimg.com/1200x/21/e5/a1/21e5a1a265d93996d3ef6b3dce14e5de.jpg?random=8'}],
    },
    {
        _id: 7,
        name: "Gibsun 2005",
        price: 180,
        images: [{url:'https://i.pinimg.com/1200x/c4/1f/06/c41f06e03a7a607e8aaed4051b68ec9f.jpg?random=9'}],
    },
    {
        _id: 8,
        name: "Telecastor Sparky",
        price: 190,
        images: [{url:'https://i.pinimg.com/736x/d7/7f/63/d77f632d5375a1b6d02193f5c8f7744c.jpg?random=10'}],
    },
]

const Home = () => {
    return (
        <div>
            <Hero />
            <GuitarCollection />
            <NewArrivals />


            <h2 className="navbarText text-6xl text-[#CB2957] text-center font-bold mb-4">Best Seller</h2>
            <ProductDetails />
            
            <div className="container mx-auto mb-25">
                <h2 className="navbarText text-5xl text-center font-bold mb-7 mt-5 text-[#CB2957]">
                    Above and Beyond
                </h2>
                <ProductGrid products={placeholderProducts} />
            </div>
            <FeaturedCollection />
        </div>
    )
}

export default Home