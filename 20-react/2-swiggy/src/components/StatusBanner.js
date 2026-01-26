import { useEffect, useState } from "react";
import { useOnlineStatus } from "../utils/useOnlineStatus";

export const Banner = () => {
  const isOnline   = useOnlineStatus() 
  const [show, setShow] = useState(true);
  console.log("Online status:", isOnline);
  useEffect(() => {
    console.log("Online status changed");
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer); // cleanup
  }, [isOnline]);

  if (!show) return null;

  return <>
   {isOnline === false && show  &&<div className="offline-status"> You are offline </div>    }
  </>
};