import Hero from "../Layout/Hero"
import GuitarCollection from "../Products/GuitarCollection"
import NewArrivals from "../Products/NewArrivals"
import ProductDetails from "../Products/ProductDetails"


const Home = () => {
    return (
        <div>
            <Hero />
            <GuitarCollection />
            <NewArrivals />


            <h2 className="navbarText text-6xl text-[#CB2957] text-center font-bold mb-4">Best Seller</h2>
            <ProductDetails />
        </div>
    )
}

export default Home