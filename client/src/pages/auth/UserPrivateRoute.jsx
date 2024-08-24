import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function UserPrivateRoute() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            try {
                const parseData = JSON.parse(data);
                //console.log("Parsed data:", parseData);

                if (parseData?.user?.role === "user") {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null) {
        // Optional: You can add a loading spinner here if needed
        return null;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default UserPrivateRoute;
