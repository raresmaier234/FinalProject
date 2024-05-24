import React from 'react';
import Appbar from './general-components/Navbar';
import { useAuth } from '../providers/AuthProvider';

function Layout({ children }) {
    return (
        <>
            <Appbar />
            <main>{children}</main>
        </>
    );
}

export default Layout;