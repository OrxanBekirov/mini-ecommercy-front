import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
    const { token, role } = useSelector((state) => state.auth);
    if (!token) {
        return <Navigate to="/login" />
    }
    if (role !== "Admin") {
        return <Navigate to="/" />
    }
    return children
}
export default AdminRoute