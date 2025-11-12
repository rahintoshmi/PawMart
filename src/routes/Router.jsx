import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
import Carousel from "../Home/Carousel";

const router = createBrowserRouter([
  { 
    path: "/", 
    Component: Homelayout, 
        children: [
            {
                index: true,
                element: <Carousel />,
            },
        ]
  },

  {
    path: '/*',
    element: <div>404 Not Found</div>,
  }
]);

export default router;