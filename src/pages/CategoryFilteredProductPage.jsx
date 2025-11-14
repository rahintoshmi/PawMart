import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CategoryFilteredProductPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/api/all-listings`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(
                    p => p.category?.toLowerCase().trim() === categoryName?.toLowerCase().trim()
                );
                setProducts(filtered);
            })
            .catch(err => console.error("Failed to fetch products", err))
            .finally(() => setIsLoading(false));
    }, [categoryName]);


    if (isLoading) return <p className="text-center py-20">Loading products...</p>;

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold mb-10 text-center text-primary">
                    {categoryName} Products
                </h2>

                {products.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        No products available in this category.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {products.map(p => (
                            <div
                                key={p._id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="relative h-56 w-full overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {p.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4">{p.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-bold text-lg">
                                            {p.category === "Pets" ? "Free for Adoption" : `$${p.price}`}
                                        </span>
                                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default CategoryFilteredProductPage;
