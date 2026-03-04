import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUIStore } from "../store/uiStore";
import { useEffect } from "react";

export const Layout = () => {
  const { darkMode } = useUIStore();

  useEffect(() => {
    document.body.className = darkMode ? "bg-dark text-light" : "";
  }, [darkMode]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
