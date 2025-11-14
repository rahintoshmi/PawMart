import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaDog, FaBone, FaPuzzlePiece, FaPaw } from "react-icons/fa";

// Map categories to icons
const iconMap = {
    Pets: <FaDog size={40} />,
    "Pet Food": <FaBone size={40} />,
    Accessories: <FaPuzzlePiece size={40} />,
    "Pet Care Products": <FaPaw size={40} />,
};

const CategorySection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/categories") // API endpoint for categories
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map(cat => (
                    <Link
                        key={cat._id}
                        to={`/category-filtered-product/${cat.name}`}
                        className="cursor-pointer border border-base-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-2 hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 bg-base-100"
                    >
                        <div className="text-secondary mb-4">{iconMap[cat.name]}</div>
                        <h3 className="font-semibold text-lg text-neutral">{cat.name}</h3>
                        <p className="text-sm text-neutral/70 mt-1 text-center">{cat.description}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
