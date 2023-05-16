import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Home from "./components/Home/Home";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";
import AuthProvider from "./components/providers/AuthProvider";
import Shop from './components/Shop/Shop';
import SignUp from "./components/SignUp/SignUp";
import "./index.css";
import cartProductsLoader from "./loaders/CartProductsLoader";
import PrivateRoutes from "./routes/PrivateRoutes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader: () => fetch(`http://localhost:5000/totalProducts`)
      },
      {
        path: '/orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: '/inventory',
        element: <PrivateRoutes><Inventory /></PrivateRoutes>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/checkout',
        element: <PrivateRoutes><Checkout /></PrivateRoutes>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
