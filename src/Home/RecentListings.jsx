import React from "react";

const listings = [
    {
        id: 1,
        name: "Golden Retriever Puppy",
        category: "Dog",
        price: "Free for Adoption",
        location: "Chattogram",
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=500",
    },
    {
        id: 2,
        name: "Persian Cat",
        category: "Cat",
        price: "$150",
        location: "Dhaka",
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500",
    },
    {
        id: 3,
        name: "Parrot (Green)",
        category: "Bird",
        price: "$80",
        location: "Sylhet",
        image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500",
    },
    {
        id: 4,
        name: "Cute Hamster",
        category: "Small Pet",
        price: "Free for Adoption",
        location: "Rajshahi",
        image: "https://images.unsplash.com/photo-1601758123927-1965c88e0a46?w=500",
    },
    {
        id: 5,
        name: "Siamese Cat",
        category: "Cat",
        price: "$120",
        location: "Khulna",
        image: "https://images.unsplash.com/photo-1618828663100-0a3b66d62d79?w=500",
    },
    {
        id: 6,
        name: "German Shepherd",
        category: "Dog",
        price: "$250",
        location: "Barishal",
        image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500",
    },
];

const RecentListings = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-primary">
                Recent Listings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {listings.map((item) => (
                    <div
                        key={item.id}
                        className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:border-primary"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-primary mb-1">
                                {item.name}
                            </h3>
                            <p className="text-sm text-neutral mb-2">
                                Category: <span className="text-secondary">{item.category}</span>
                            </p>
                            <p className="text-sm text-neutral mb-2">
                                Location: <span className="text-accent">{item.location}</span>
                            </p>
                            <p
                                className={`font-semibold mb-4 ${item.price === "Free for Adoption"
                                        ? "text-accent"
                                        : "text-secondary"
                                    }`}
                            >
                                {item.price}
                            </p>
                            <button className="w-full bg-primary text-base-100 py-2 rounded-lg font-medium hover:bg-secondary transition-all">
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentListings;
