import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProductDetail } from "../pages/productDetail/ProductDetail";
import { Cart } from "../pages/cart/Cart";
import { CheckoutShipping } from "../pages/checkoutShipping/CheckoutShipping";
import { CheckoutPayment } from "../pages/checkoutpayment/CheckoutPayment";
import { PaymentSuccess } from "../pages/paymentSuccess/PaymentSuccess";
import { AccountPage } from "../pages/account/AccountPage";
import { OrderHistory } from "../pages/orders/OrderHistory";
import { Layout } from "./Layout";

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
      { path: "account", element: <AccountPage /> },
      { path: "orders", element: <OrderHistory /> },
    ],
  },
]);