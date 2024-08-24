import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AdminPrivateRoute() {

  const location = useLocation();
  const [isadmin, setIsadmin] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
        try {
            const parseData = JSON.parse(data);
            console.log("Parsed data:", parseData);

            if (parseData?.user?.role === "admin") {
              setIsadmin(true);
            } else {
              setIsadmin(false);
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            setIsadmin(false);
        }
    } else {
      setIsadmin(false);
    }
}, []);
if (isadmin === null) {
  // Optional: You can add a loading spinner here if needed
  return null;
}

return isadmin ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;

}
export default AdminPrivateRoute