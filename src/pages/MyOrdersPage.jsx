import React, { useContext, useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "./Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const MyOrdersPage = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        if (!user?.email) return;

        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/orders?email=${user.email}`);
            if (!res.ok) throw new Error("Failed to fetch orders");
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch your orders");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchOrders();
    }, [user]);

    const handleDownloadReport = () => {
        if (orders.length === 0) {
            toast.error("No orders to export");
            return;
        }

        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text("My Orders Report", 14, 22);

        const tableColumn = [
            "#",
            "Product Name",
            "Buyer Name",
            "Price",
            "Quantity",
            "Address",
            "Date",
            "Phone",
        ];
        const tableRows = [];

        orders.forEach((order, index) => {
            tableRows.push([
                index + 1,
                order.listingName,
                order.userName,
                order.price,
                order.quantity,
                order.address,
                order.date,
                order.phone,
            ]);
        });

        autoTable(doc, { head: [tableColumn], body: tableRows, startY: 30 });

        doc.save("my-orders-report.pdf");
    };


    if (isLoading) return <Loading />;

    return (
        <section className="max-w-6xl mx-auto px-4 py-28">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 className="text-3xl font-bold text-primary text-center sm:text-left">
                    My Orders
                </h2>
                <button
                    onClick={handleDownloadReport}
                    className="btn btn-primary flex items-center gap-2 text-white"
                >
                    <FaFileDownload /> Download Report
                </button>
            </div>

            {orders.length === 0 ? (
                <p className="text-center text-neutral text-xl py-10">
                    You have not placed any orders yet.
                </p>
            ) : (
                <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-2xl shadow-md">
                    <table className="min-w-full border-collapse text-center">
                        <thead className="bg-base-200 text-neutral font-semibold">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Buyer Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Quantity</th>
                                <th className="p-4">Address</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={order._id}
                                    className="border-b border-base-200 hover:bg-base-200/40 transition text-center"
                                >
                                    <td className="p-4 align-middle font-medium text-neutral">{index + 1}</td>
                                    <td className="p-4 align-middle text-primary font-semibold">{order.listingName}</td>
                                    <td className="p-4 align-middle text-neutral">{order.userName}</td>
                                    <td className="p-4 align-middle text-neutral">{order.price}</td>
                                    <td className="p-4 align-middle text-neutral">{order.quantity}</td>
                                    <td className="p-4 align-middle text-neutral">{order.address}</td>
                                    <td className="p-4 align-middle text-neutral">{order.date}</td>
                                    <td className="p-4 align-middle text-neutral">{order.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default MyOrdersPage;
