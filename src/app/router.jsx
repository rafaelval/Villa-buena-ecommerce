import { createBrowserRouter } from "react-router-dom";
import {Home} from "../pages/Home";
import {ProductDetail} from "../pages/ProductDetail";
import {Cart} from "../pages/Cart";
import {Checkout} from "../pages/Checkout";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/payment/success", element: <h1>Pago exitoso</h1> },
]);