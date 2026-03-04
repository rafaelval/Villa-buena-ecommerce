import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUIStore } from "../store/uiStore";
import { useEffect } from "react";

export const Layout = () => {
  const darkMode = useUIStore((state) => state.darkMode);

  useEffect(() => {
    console.log("Dark mode changed:", darkMode);

    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(darkMode ? "dark-mode" : "light-mode");
  }, [darkMode]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
