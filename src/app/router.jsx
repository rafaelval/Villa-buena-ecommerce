import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { CheckoutShipping } from "../pages/CheckoutShipping";
import { CheckoutPayment } from "../pages/CheckoutPayment";
import { PaymentSuccess } from "../pages/PaymentSuccess";
import { Layout } from "./layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout/shipping", element: <CheckoutShipping /> },
      { path: "checkout/payment", element: <CheckoutPayment /> },
      { path: "payment/success", element: <PaymentSuccess /> },
    ],
  },
]);