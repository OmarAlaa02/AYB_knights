import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  
  // const { user } = useAuth();
  const navigate = useNavigate();
  const user=localStorage.getItem("sb-uhltlhetnaftyqohudod-auth-token")

  useEffect(
    function () {
      
      if (!user) {
        navigate("/");
      }
    },
    [navigate]
  );

  return user? children :null;
}

export default ProtectedRoute;
