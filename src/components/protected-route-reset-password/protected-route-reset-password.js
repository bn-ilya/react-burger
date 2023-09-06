import { useSelector } from "react-redux";
import { selectIsForgotPassword } from "../../services/selectors";
import { Navigate } from "react-router-dom";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";

export default function ProtectedRouteResetPassword(props) {
    const isForgotPassword = useSelector(selectIsForgotPassword);

    return isForgotPassword ? <ProtectedRouteElement {...props} /> : <Navigate to={"/"} replace />;
    
}