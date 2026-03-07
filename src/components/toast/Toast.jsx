import { useEffect, useState } from "react";
import { useUIStore } from "../../store/uiStore";
import "./Toast.css";

const Toast = () => {
  const toast = useUIStore((state) => state.toast);
  const hideToast = useUIStore((state) => state.hideToast);
  const [isExiting, setIsExiting] = useState(false);

  const visible = !!toast || isExiting;

  useEffect(() => {
    if (!toast) return;

    const resetTimer = setTimeout(() => setIsExiting(false), 0);

    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    return () => {
      clearTimeout(resetTimer);
      clearTimeout(timer);
    };
  }, [toast]);

  useEffect(() => {
    if (!isExiting) return;

    const exitTimer = setTimeout(() => {
      hideToast();
      setIsExiting(false);
    }, 300);

    return () => clearTimeout(exitTimer);
  }, [isExiting, hideToast]);

  if (!visible) return null;

  const isSuccess = toast?.includes("🛒");
  const isError = toast?.includes("❌") || toast?.includes("Error");

  return (
    <div
      className={`custom-toast ${isSuccess ? "success" : ""} ${isError ? "error" : ""} ${isExiting ? "toast-exit" : ""}`}
      role="alert"
    >
      {toast}
    </div>
  );
};

export default Toast;
