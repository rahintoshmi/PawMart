import React, { useContext, useState } from "react";
import { FaPaw, FaTags, FaDollarSign, FaMapMarkerAlt, FaAlignLeft, FaImage, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";


const AddListingPage = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        category: "Pets",
        price: 0,
        location: "",
        description: "",
        image: "",
        date: "",
    });
    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setFormData((prev) => ({
            ...prev,
            category: selected,
            price: selected === "Pets" ? 0 : prev.price, 
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newListing = {
            ...formData,
            email: user?.email,
            createdAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:3000/api/listings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newListing),
            });

            if (res.ok) {
                toast.success("Listing added successfully!");
                setFormData({
                    name: "",
                    category: "Pets",
                    price: 0,
                    location: "",
                    description: "",
                    image: "",
                    date: "",
                });
            } else {
                toast.error("Failed to add listing");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-16">
            <div className="w-full max-w-2xl bg-base-100 border border-base-200 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">
                    Add New Listing
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FaPaw className="absolute top-3 left-3 text-primary" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Product/Pet Name"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Category */}
                    <div className="relative">
                        <FaTags className="absolute top-3 left-3 text-primary" />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleCategoryChange}
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option>Pets</option>
                            <option>Food</option>
                            <option>Accessories</option>
                            <option>Care Products</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="relative">
                        <FaDollarSign className="absolute top-3 left-3 text-primary" />
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price (0 if pet is selected)"
                            readOnly={formData.category === "Pets"}
                            className={`w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg ${formData.category === "Pets" ? "bg-base-200 cursor-not-allowed" : "bg-base-100"
                                } text-base-content focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <FaMapMarkerAlt className="absolute top-3 left-3 text-primary" />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <FaAlignLeft className="absolute top-3 left-3 text-primary" />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            rows={4}
                        ></textarea>
                    </div>

                    {/* Image URL */}
                    <div className="relative">
                        <FaImage className="absolute top-3 left-3 text-primary" />
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Image URL"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Date */}
                    <div className="relative">
                        <FaCalendarAlt className="absolute top-3 left-3 text-primary" />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Email (readonly) */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-primary" />
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-200 text-base-content cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-base-100 py-2 rounded-lg font-semibold hover:bg-secondary transition-all"
                    >
                        Add Listing
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddListingPage;
