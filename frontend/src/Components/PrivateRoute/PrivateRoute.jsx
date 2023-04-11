import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../Context/AuthContext";


const PrivateRoute = ({ children }) => {
    const  {setIsAuth,isAuth} = useContext(context);
    console.log(isAuth)
  
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;