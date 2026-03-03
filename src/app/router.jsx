import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Layout } from "./layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      {
        path: "payment/success",
        element: <h1 className="text-center py-5">Payment Successful 🎉</h1>,
      },
    ],
  },
]);
