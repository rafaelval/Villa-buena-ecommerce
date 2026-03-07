import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useUIStore } from "../store/uiStore";
import { useEffect } from "react";
import Toast from "../components/toast/Toast";
import { CartDrawer } from "../components/cart/CartDrawer";

export const Layout = () => {
  const darkMode = useUIStore((state) => state.darkMode);

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(darkMode ? "dark-mode" : "light-mode");
  }, [darkMode]);
  return (
    <>
      <Toast />
      <Navbar />
      <CartDrawer />
      <Outlet />
    </>
  );
};
