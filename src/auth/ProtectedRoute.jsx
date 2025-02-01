import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      console.log("user in protected route", user);
      if (!user) {
        navigate("/");
      }
    },
    [user, navigate]
  );

  return user ? children : null;
}

export default ProtectedRoute;
