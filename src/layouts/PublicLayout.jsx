import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { Box } from "@mui/material";


import Header from '../components/Header';
import Footer from '../components/layout/Footer';

function PublicLayout() {


    return (

        <>
            <Header />

            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}

export default PublicLayout