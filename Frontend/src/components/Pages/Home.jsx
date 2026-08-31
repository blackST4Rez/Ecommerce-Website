import Hero from "../Layout/Hero"
import FeaturedCollection from "../Products/FeaturedCollection"
import FeaturedSection from "../Products/FeaturedSection"
import GuitarCollection from "../Products/GuitarCollection"
import NewArrivals from "../Products/NewArrivals"
import ProductDetails from "../Products/ProductDetails"
import ProductGrid from "../Products/ProductGrid"


const placeholderProducts = [
    {
        _id: 201,
        name: "SG Gibson",
        price: 148974,
        brand: "Gibson",
        material: "Mahogony",
        images: [{ url: 'https://i.pinimg.com/1200x/5a/65/08/5a650813268066d7800ffe780a4af569.jpg?random=3' }],
    },
    {
        _id: 202,
        name: "Fender 2001",
        price: 151296,
        brand: "Fender",
        material: "Mahogony",
        images: [{ url: 'https://i.pinimg.com/1200x/e4/99/9d/e4999ddf471b0c890af9310487b35a40.jpg?random=4' }],
    },
    {
        _id: 203,
        name: "Fender 1997",
        price: 113072,
        brand: "Fender",
        material: "Adler Woods",
        images: [{ url: 'https://i.pinimg.com/1200x/95/57/0a/95570a6548c424c9796cb5885ba417d2.jpg?random=5' }],
    },
    {
        _id: 204,
        name: "Stratocastor 1890",
        price: 141182,
        brand: "Fender",
        material: "Mahogony",
        images: [{ url: 'https://i.pinimg.com/736x/f3/a4/da/f3a4dad3a23cfec9a92fb750ebd36519.jpg?random=6' }],
    },
    {
        _id: 205,
        name: "Gibson 1890",
        price: 114332,
        brand: "Gibson",
        material: "Alder Woods",
        images: [{ url: 'https://i.pinimg.com/1200x/8f/a9/95/8fa995e040457cf2fb85867709f72f5b.jpg?random=7' }],
    },
    {
        _id: 206,
        name: "Gibsun 2002",
        price: 167467,
        brand: "Gibson",
        material: "Mahogony",
        images: [{ url: 'https://i.pinimg.com/736x/13/05/b5/1305b59b74a89f544e00b475754494c0.jpg?random=8' }],
    },
    {
        _id: 207,
        name: "Gibsun 2005",
        price: 157968,
        brand: "Gibson",
        material: "Alder Woods",
        images: [{ url: 'https://i.pinimg.com/1200x/10/e5/89/10e589136aba75f30844ad4c2e054733.jpg?random=9' }],
    },
    {
        _id: 208,
        name: "Telecastor Sparky",
        price: 195732,
        brand: "Telecastor",
        material: "Mahogony",
        images: [{ url: 'https://i.pinimg.com/736x/d7/7f/63/d77f632d5375a1b6d02193f5c8f7744c.jpg?random=10' }],
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

            <div className="container mx-auto mb-5">
                <h2 className="navbarText text-5xl text-center font-bold mb-7 mt-5 text-[#CB2957]">
                    Above and Beyond
                </h2>
                <ProductGrid products={placeholderProducts} />
            </div>
            <FeaturedSection />
            <FeaturedCollection />
        </div>
    )
}

export default Home