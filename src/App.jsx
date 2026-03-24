import React from 'react'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Outlet />
            <ToastContainer position="bottom-right" autoClose={2500} style={{ zIndex: 99999 }} />
        </>
    )
}

export default App