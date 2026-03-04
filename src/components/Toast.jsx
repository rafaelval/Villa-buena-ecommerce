import { useUIStore } from "../store/uiStore";

const Toast = () => {
  const toast = useUIStore((state) => state.toast);

  if (!toast) return null;

  return <div className="custom-toast">{toast}</div>;
};

export default Toast;
