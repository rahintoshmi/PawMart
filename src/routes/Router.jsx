import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
import Home from "../Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  { 
    path: "/", 
    Component: Homelayout, 
        children: [
            {
                index: true,
                element: <Home />,
            },
            
            
            
        ],
        
  },
  {
    path: '/auth',
    element: <Homelayout></Homelayout>,
    children:[
        {
            path: '/auth/login',
            element:<Login></Login>,
        },
        {
            path: '/auth/register',
            element:<Register></Register>,
        },
    ]
  },
    

  {
    path: '/*',
    element: <div>404 Not Found</div>,
  }
]);

export default router;