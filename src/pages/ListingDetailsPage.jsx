import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaTags, FaDollarSign } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const MyListingsPage = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [editData, setEditData] = useState(null);

    // Fetch user listings
    const fetchListings = async () => {
        if (!user?.email) return;
        try {
            const res = await fetch("http://localhost:3000/api/all-listings");
            const data = await res.json();
            const userListings = data.filter(item => item.email === user.email);
            setListings(userListings);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch your listings");
        }
    };

    useEffect(() => {
        fetchListings();
    }, [user]);

    // Delete listing
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/listings/${id}`, { method: "DELETE" });
            if (res.ok) {
                setListings(prev => prev.filter(item => item._id !== id));
                setDeleteId(null);
                toast.success("Listing deleted successfully!");
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to delete listing");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete listing");
        }
    };

    // Update listing
    const handleUpdate = async () => {
        try {
            const { _id, email, ...fieldsToUpdate } = editData;
            const res = await fetch(`http://localhost:3000/api/listings/${_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fieldsToUpdate)
            });

            if (res.ok) {
                fetchListings(); // refetch to sync with backend
                setEditData(null);
                toast.success("Listing updated successfully!");
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to update listing");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-28">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">My Listings</h2>

            {listings.length === 0 ? (
                <p className="text-center text-neutral">You have no listings yet.</p>
            ) : (
                <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-2xl shadow-md">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-base-200 text-neutral font-semibold text-center">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((listing, idx) => (
                                <tr key={listing._id} className="border-b border-base-200 hover:bg-base-200/50 transition text-center">
                                    <td className="p-4">{idx + 1}</td>
                                    <td className="p-4 flex justify-center items-center gap-2 text-primary font-semibold">
                                        <FaTags className="text-secondary" /> {listing.name}
                                    </td>
                                    <td className="p-4 text-neutral">{listing.category}</td>
                                    <td className="p-4 flex justify-center items-center gap-1 text-neutral">
                                        <FaDollarSign className="text-secondary" /> {listing.price}
                                    </td>
                                    <td className="p-4 flex justify-center items-center gap-2 text-neutral">
                                        <FaMapMarkerAlt className="text-secondary" /> {listing.location}
                                    </td>
                                    <td className="p-4 flex justify-center items-center gap-3">
                                        <button
                                            onClick={() => setEditData(listing)}
                                            className="btn btn-sm text-white border-none flex items-center gap-1"
                                            style={{ backgroundColor: "#8BC34A" }}
                                        >
                                            <FaEdit /> Update
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(listing._id)}
                                            className="btn btn-sm text-white border-none flex items-center gap-1"
                                            style={{ backgroundColor: "#FF6B35" }}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
                    <div className="bg-base-100 p-8 rounded-2xl w-full max-w-md shadow-xl border border-base-200 text-center">
                        <h3 className="text-xl font-bold text-error mb-4">Confirm Delete</h3>
                        <p className="text-neutral mb-6">
                            Are you sure you want to delete this listing?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setDeleteId(null)} className="btn btn-outline">Cancel</button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="btn text-white border-none"
                                style={{ backgroundColor: "#FF6B35" }}
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

          
            {editData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
                    <div className="bg-base-100 p-8 rounded-2xl w-full max-w-md shadow-xl border border-base-200 text-center">
                        <h3 className="text-xl font-bold text-primary mb-6">Update Listing</h3>

                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full mb-3 p-3 border rounded-lg"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={editData.category}
                            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                            className="w-full mb-3 p-3 border rounded-lg"
                            placeholder="Category"
                        />
                        <input
                            type="number"
                            value={editData.price}
                            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                            className={`w-full mb-3 p-3 border rounded-lg ${editData.category === 'Pets' ? 'bg-gray-200 cursor-not-allowed' : ''
                                }`}
                            placeholder="Price"
                            readOnly={editData.category == 'Pets'}
                            
                            
                        />
                        <input
                            type="text"
                            value={editData.location}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                            className="w-full mb-5 p-3 border rounded-lg"
                            placeholder="Location"
                        />

                        <div className="flex justify-center gap-4">
                            <button onClick={() => setEditData(null)} className="btn btn-outline">Cancel</button>
                            <button
                                onClick={handleUpdate}
                                className="btn text-white border-none"
                                style={{ backgroundColor: "#8BC34A" }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyListingsPage;
