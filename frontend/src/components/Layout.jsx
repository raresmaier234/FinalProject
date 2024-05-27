import React from 'react';
import Appbar from './general-components/Navbar';
import { useAuth } from '../providers/AuthProvider';
import Footer from './general-components/Footer';

function Layout({ children }) {
    return (
        <>
            <Appbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;