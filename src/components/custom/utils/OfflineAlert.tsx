
import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

const OfflineAlert = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowAlert(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showAlert) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-md shadow-md z-50 transition-all duration-300 ${
        isOnline
          ? "bg-green-100 text-green-800 border-green-200"
          : "bg-red-100 text-red-800 border-red-200"
      }`}
    >
      {isOnline ? (
        <>
          <Wifi size={20} className="mr-2" />
          <span>You are back online</span>
        </>
      ) : (
        <>
          <WifiOff size={20} className="mr-2" />
          <span>No internet connection</span>
        </>
      )}
    </div>
  );
};

export default OfflineAlert;
