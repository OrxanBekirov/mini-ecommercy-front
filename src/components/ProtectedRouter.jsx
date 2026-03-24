
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const ProdectedRoute = ({ children }) => {

    const token = useSelector((store) => store.auth.token)
    if (!token) {
        return <Navigate to="/login" />
    }
    return children

}
export default ProdectedRoute