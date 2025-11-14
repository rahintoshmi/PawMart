import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
import Home from "../Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddListingPage from "../pages/AddListingPage";
import PetsAndSuppliesPage from "../pages/PetsAndSuppliesPage";
import MyListingsPage from "../pages/MyListingsPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import NotFoundPage from "../pages/NotFoundPage";
import CategoryFilteredProductPage from "../pages/CategoryFilteredProductPage";
import RecentListingDetailsPage from "../pages/RecentListingDetailsPage";
import ListingDetailsPage from "../pages/ListingDetailsPage";
import Page from "../components/Page";
import PrivateRoute from "../provider/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Homelayout,
        children: [
            { index: true, element: <Page title="Home | PawMart"><Home /></Page> },
        ],
    },
    {
        path: "/auth",
        element: <Homelayout />,
        children: [
            { path: "login", element: <Page title="Login | PawMart"><Login /></Page> },
            { path: "register", element: <Page title="Register | PawMart"><Register /></Page> },

            // Private pages
            {
                path: "add-listing",
                element: (
                    <PrivateRoute>
                        <Page title="Add Listing | PawMart"><AddListingPage /></Page>
                    </PrivateRoute>
                ),
            },
            {
                path: "my-listings",
                element: (
                    <PrivateRoute>
                        <Page title="My Listings | PawMart"><MyListingsPage /></Page>
                    </PrivateRoute>
                ),
            },
            {
                path: "my-orders",
                element: (
                    <PrivateRoute>
                        <Page title="My Orders | PawMart"><MyOrdersPage /></Page>
                    </PrivateRoute>
                ),
            },
            {
                path: "listings/:listingId",
                element: (
                    <PrivateRoute>
                        <Page title="Listing Details | PawMart"><RecentListingDetailsPage /></Page>
                    </PrivateRoute>
                ),
            },
            {
                path: "all-listings/:listingId",
                element: (
                    <PrivateRoute>
                        <Page title="Listing Details | PawMart"><ListingDetailsPage /></Page>
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "category-filtered-product/:categoryName",
        element: <Page title="Category Products | PawMart"><CategoryFilteredProductPage /></Page>
    },
    {
        path: "/pets",
        element: <Homelayout />,
        children: [
            { path: "supplies", element: <Page title="Pet Supplies | PawMart"><PetsAndSuppliesPage /></Page> },
        ],
    },
    { path: "/*", element: <Page title="404 Not Found | PawMart"><NotFoundPage /></Page> },
]);

export default router;
