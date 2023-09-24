import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/reducers/profile";
import { selectIsAuth } from "../../services/selectors";
import { Navigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { useLocation } from "react-router-dom";

export default function ProtectedRouteElement({ element, accessAuth }) {
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const location = useLocation();
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            await dispatch(getUserData());
            setIsUserLoaded(true);
        }
        init()
    }, [dispatch])

    if (!isUserLoaded) return null;

    if (accessAuth) {
        return isAuth ? element : <Navigate to={"/login"} state={{ goBack: location }} replace />;
    } else {
        return isAuth ? <Navigate to={"/"} replace /> : element;
    }
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.element.isRequired,
    accessAuth: PropTypes.bool.isRequired
}