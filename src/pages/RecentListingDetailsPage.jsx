import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaTags,
    FaDollarSign,
    FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "./Loading";
import toast, { Toaster } from "react-hot-toast";

const RecentListingDetailsPage = () => {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:3000/api/listings/${listingId}`)
            .then((res) => res.json())
            .then((data) => setListing(data))
            .catch((err) => console.error("Error fetching listing:", err));
    }, [listingId]);

    if (!listing) return <Loading />;

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const orderData = {
            listingId: listing._id,
            listingName: listing.name,
            userName: user?.displayName,
            userEmail: user?.email,
            quantity: listing.category === "Pets" ? 1 : form.quantity?.value || 1,
            price: listing.category === "Pets" ? "Free for Adoption" : `$${listing.price}`,
            address: form.address.value,
            date: form.date.value,
            phone: form.phone.value,
            message: form.message.value,
        };

        try {
            const res = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Order placed successfully!");
                setIsModalOpen(false);
            } else {
                toast.error(data.message || "Failed to place order");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to place order");
        }
    };

    return (
        <>
            <Toaster />
            <section className="max-w-5xl mx-auto px-4 py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-100 border border-base-200 rounded-2xl p-8 shadow-lg">
                    <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-full h-96 object-cover rounded-xl"
                    />
                    <div className="space-y-5">
                        <h2 className="text-3xl font-bold text-primary">{listing.name}</h2>
                        <p className="flex items-center gap-2 text-neutral">
                            <FaTags className="text-secondary" /> Category: {listing.category}
                        </p>
                        <p className="flex items-center gap-2 text-neutral">
                            <FaEnvelope className="text-secondary" /> Owner: {listing.email}
                        </p>
                        <p className="text-neutral leading-relaxed">{listing.description}</p>
                        <p className="flex items-center gap-2 text-neutral">
                            <FaDollarSign className="text-secondary" /> Price:{" "}
                            {listing.category === "Pets" ? "Free for Adoption" : `$${listing.price}`}
                        </p>
                        <p className="flex items-center gap-2 text-neutral">
                            <FaMapMarkerAlt className="text-secondary" /> Location:{" "}
                            {listing.location}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary mt-4 w-full md:w-auto"
                        >
                            Adopt / Order Now
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
                        <div className="bg-base-100 rounded-2xl p-6 w-full max-w-5xl shadow-xl border border-base-200 flex flex-col md:flex-row relative">
                            <button
                                className="absolute top-3 right-3 text-neutral hover:text-primary text-xl"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <FaTimes />
                            </button>

                            <div className="md:w-1/2 flex items-center justify-center p-4">
                                <img
                                    src={listing.image}
                                    alt={listing.name}
                                    className="rounded-xl object-cover w-full max-h-96"
                                />
                            </div>

                            <div className="md:w-1/2 p-4 space-y-4 overflow-y-auto max-h-[90vh]">
                                <h3 className="text-2xl font-bold text-primary mb-2">
                                    Confirm Your Order
                                </h3>

                                <form className="space-y-3" onSubmit={handleOrderSubmit}>
                                    {/* Buyer Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Buyer Name
                                        </label>
                                        <input
                                            type="text"
                                            value={user?.displayName || ""}
                                            readOnly
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={user?.email || ""}
                                            readOnly
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    {/* Product/Listing ID */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Product/Listing ID
                                        </label>
                                        <input
                                            type="text"
                                            value={listing._id}
                                            readOnly
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    {/* Product/Listing Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Product/Listing Name
                                        </label>
                                        <input
                                            type="text"
                                            value={listing.name}
                                            readOnly
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={listing.category === "Pets" ? 1 : undefined}
                                            readOnly={listing.category === "Pets"}
                                            placeholder="Enter quantity"
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            value={listing.category === "Pets" ? "Free for Adoption" : `$${listing.price}`}
                                            readOnly
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Enter your address"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Date (Pick up)
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral mb-1">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="message"
                                            placeholder="Add any message..."
                                            className="textarea textarea-bordered w-full"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                    >
                                        Submit Order
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default RecentListingDetailsPage;
