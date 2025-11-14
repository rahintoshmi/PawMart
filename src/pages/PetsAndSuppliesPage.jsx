import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaPaw, FaTags, FaDollarSign, FaSearch, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const PetsAndSuppliesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://paw-mart-server-ten.vercel.app/api/all-listings")
            .then((res) => res.json())
            .then((data) => {
                setListings(data);
                setFiltered(data);
            })
            .catch((err) => toast.error("Error loading listings:", err))
            .finally(() => setIsLoading(false));
    }, []);
    useEffect(() => {
        let result = listings;

        // category filter
        if (selectedCategory) {
            result = result.filter(
                (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // search filter
        if (searchQuery) {
            result = result.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFiltered(result);
    }, [searchQuery, selectedCategory, listings]);
    if (isLoading) return <Loading />;

    return (
        <section className="max-w-7xl mx-auto px-4 pt-32 pb-20">
            {/* Filters Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
                {/* Search Bar */}
                <div className="relative w-full sm:w-1/2">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search pets or products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-semibold w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative w-full sm:w-1/3">
                    <FaFilter className="absolute left-3 top-3 text-gray-400" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">All Categories</option>
                        <option value="Pets">Pets</option>
                        <option value="Pet Food">Pet Food</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Pet Care Products">Pet Care Products</option>
                    </select>
                </div>
            </div>
            {filtered.length === 0 ? (
                <p className="text-center text-neutral">No listings found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {filtered.map((item) => (
                        <div
                            key={item._id}
                            className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5 space-y-3">
                                <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                                    <FaPaw /> {item.name}
                                </h3>

                                <p className="flex items-center gap-2 text-neutral text-sm">
                                    <FaTags className="text-secondary" /> {item.category}
                                </p>

                                <p className="flex items-center gap-2 text-neutral text-sm">
                                    <FaMapMarkerAlt className="text-secondary" /> {item.location}
                                </p>

                                <p className="flex items-center gap-2 text-neutral text-sm font-medium">
                                    <FaDollarSign className="text-secondary" />{" "}
                                    {item.category === "Pets" ? "Free for Adoption" : `$${item.price}`}
                                </p>

                                <button
                                    onClick={() => navigate(`/auth/listings/${item._id}`)}
                                    className="w-full mt-3 bg-primary text-base-100 py-2 rounded-lg font-semibold hover:bg-secondary transition-all"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default PetsAndSuppliesPage;
