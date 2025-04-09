import { useEffect } from "react";

const FloatingAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="alert-box">
      {message}
    </div>
  );
};

export default FloatingAlert;
