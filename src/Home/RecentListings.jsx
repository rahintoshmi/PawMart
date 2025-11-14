import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const RecentListings = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/listings")
            .then(res => res.json())
            .then(data => setListings(data))
            .catch(err => console.error(err));
    }, []);


    return (
        <section className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-primary">
                Recent Listings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {listings.map((item) => (
                    <div
                        key={item._id}
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
                                className={`font-semibold mb-4 ${item.price === "Free for Adoption" ? "text-accent" : "text-secondary"
                                    }`}
                            >
                                {item.price}
                            </p>
                            <Link
                                to={`/auth/listings/${item._id}`} 
                                className="w-full bg-primary text-base-100 py-2 rounded-lg font-medium hover:bg-secondary transition-all text-center block"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentListings;
