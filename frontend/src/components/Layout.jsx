import React from 'react';
import Appbar from './general-components/Navbar';
import { useAuth } from '../providers/AuthProvider';

function Layout({ children }) {
    const { user } = useAuth()

    return (
        <>
            <Appbar user={user} />
            <main>{children}</main>
        </>
    );
}

export default Layout;