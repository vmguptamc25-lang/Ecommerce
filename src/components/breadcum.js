"use client"
import React from 'react'

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


function getWindowLocation(b) {
    const pathname = window.location.pathname;
    switch (pathname) {
        case '/':
            if (b) {
                return `Home / ${b}`;
            } else {
                return 'Home';
            }
        case '/service':
            if (b) {
                return `Services / ${b}`;
            } else {
                return 'Services';
            }
        case '/about':
            return 'About';
        case '/project':
            return 'Projects';
        case '/ourstory':
            return 'Our Story';
        default:
            return '';
    }
}

export default function Breadcum({ breadcum }) {
    return (
        <div className='container-fluid bg_grey p-2'>
            <div className='container'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>
                        {getWindowLocation(breadcum)}
                    </Typography>
                </Breadcrumbs>
            </div>
        </div>
    )
}


export { getWindowLocation };