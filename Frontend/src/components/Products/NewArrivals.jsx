const NewArrivals = () => {
    const newArrivals = [
        {
            _id: "1",
            images: [
                {
                    url: 'https://i.pinimg.com/1200x/fe/de/03/fede03734194f952b7054ab67aba8cbb.jpg?random=1',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "2",
            images: [
                {
                    url: 'https://i.pinimg.com/736x/b6/bb/f3/b6bbf3954db29f5202f0ceee2e0c94fd.jpg?random=2',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        },
        {
            _id: "3",
            images: [
                {
                    url: 'https://i.pinimg.com/1200x/90/99/34/909934ea60270755219591bf9958a7a8.jpg?random=3',
                    altText: "Fender Stratocastor 1988"
                }
            ]
        }
    ];

    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 text-white">
                    New Arrivals
                </h2>
                <p className="navbarText text-5xl text-[#CB2957] mb-8">
                    Nothing but Madness
                </p>
            </div>

            {/* Three images in a row */}
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {newArrivals.map((product) => (
                        <div key={product._id} className="w-full">
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.altText || 'Product'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;