import { useEffect, useState } from "react";
import { useUIStore } from "../../store/uiStore";
import { ShoppingCart, AlertCircle } from "lucide-react";
import "./Toast.css";

const Toast = () => {
  const toast = useUIStore((state) => state.toast);
  const hideToast = useUIStore((state) => state.hideToast);

  const [isExiting, setIsExiting] = useState(false);
  const [prevToast, setPrevToast] = useState(null);

  if (toast !== prevToast) {
    setIsExiting(false);
    setPrevToast(toast);
  }

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    const cleanupTimer = setTimeout(() => {
      hideToast();
    }, 2850);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, [toast, hideToast]);

  if (!toast) return null;

  const message = typeof toast === "string" ? toast : "";
  const isSuccess = message.toLowerCase().includes("added");
  const isError =
    message.toLowerCase().includes("error") || message.includes("❌");

  return (
    <div
      className={`custom-toast ${isSuccess ? "success" : ""} ${isError ? "error" : ""} ${isExiting ? "toast-exit" : ""}`}
      role="alert"
    >
      <div className="d-flex align-items-center gap-2">
        {isSuccess && <ShoppingCart size={20} strokeWidth={2.5} />}
        {isError && <AlertCircle size={20} strokeWidth={2.5} />}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
