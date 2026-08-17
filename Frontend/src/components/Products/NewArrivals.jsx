import { useEffect, useRef, useState } from "react"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"


const NewArrivals = () => {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [canScrollLeft, setCanScrollLeft] = useState(false)

    const newArrivals = [
        {
            _id: "1",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/1200x/fe/de/03/fede03734194f952b7054ab67aba8cbb.jpg?random=1',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "2",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/736x/b6/bb/f3/b6bbf3954db29f5202f0ceee2e0c94fd.jpg?random=2',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "3",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/1200x/90/99/34/909934ea60270755219591bf9958a7a8.jpg?random=3',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "4",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/736x/9f/6a/15/9f6a15b3771f1c6b9911620b636ae619.jpg?random=4',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "5",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/736x/b5/cb/fc/b5cbfca2bbd71a4ca21b6c95535ae4de.jpg?random=5',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "6",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/736x/a9/1f/fe/a91ffe314514216a8056d95b1594897a.jpg?random=6',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "7",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/736x/44/9b/25/449b25e248c777fd8b5b617a3f8880db.jpg?random=7',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "8",
            name: "Fender Stratocastor 1988",
            price: 120,
            images: [
                {
                    url: 'https://i.pinimg.com/736x/9e/f5/3a/9ef53abc9f719f930cec18493a524aee.jpg?random=8',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        }
    ]

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX
        scrollRef.current.scrollLeft = scrollLeft - walk
    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false)
    }


    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }

    const updateScrollButtons = () => {
        const container = scrollRef.current
        if (!container) return

        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(container.scrollWidth > container.scrollLeft + container.clientWidth)
        console.log({
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            containerScrollWidth: container.scrollWidth,
        })
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', updateScrollButtons)
            updateScrollButtons()
            return() => container.removeEventListener('scroll', updateScrollButtons)
        }
    })

    return (
        <section className="py-16 px-4 lg:px-0" >
            <div className="container mx-auto text-center mb-10 relative" >
                <h2 className="text-3xl font-bold mb-4 text-white">
                    New Arrivals
                </h2>
                <p className="navbarText text-5xl text-[#CB2957] mb-8">
                    Nothing but Madness
                </p>

                <div className="absolute right-0 bottom-7.5 flex space-x-2">
                    <button onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`p-2 border-black rounded-full bg-black text-white hover:bg-[#0c0d0e] ${!canScrollLeft && 'bg-[#0c0d0e] text-[#CB2957] cursor-not-allowed'}`} >
                        <BiLeftArrow className="text-2xl text-[#CB2957]" />
                    </button>
                    <button onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`p-2 border-black rounded-full bg-black text-white hover:bg-[#0c0d0e] ${!canScrollRight && 'bg-[#0c0d0e] text-[#CB2957] cursor-not-allowed'}`} >
                        <BiRightArrow className="text-2xl text-[#CB2957]" />
                    </button>
                </div>
            </div>

            <div ref={scrollRef}
                className={`container mx-auto overflow-x-scroll hide-scrollbar flex space-x-6 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                    {newArrivals.map((product) => (
                        <div key={product._id } className="min-w-full min-h-full sm:min-w-[50%] lg:min-w-[30%] relative" >
                            <img
                                to={`/product/${product._id}`}
                                src={product.images[0]?.url}
                                alt={product.images[0]?.altText || product.name}
                                className="w-full h-180 object-cover"
                                draggable='false'
                            />
                        </div>
                ))}
                </div>
    </section>
    )
}

export default NewArrivals