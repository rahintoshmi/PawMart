import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";

const router = createBrowserRouter([
  { 
    path: "/", 
    Component: Homelayout, 
  },

  {
    path: '/*',
    element: <div>404 Not Found</div>,
  }
]);

export default router;