import { Link,usePage } from '@inertiajs/react';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './Header.jsx';
import axios from 'axios';
import { BiHomeAlt, BiGridAlt, BiCreditCard, BiUser, BiCog, BiGroup } from "react-icons/bi";

const Sidebar = lazy(() => import('./Sidebar.jsx'));

const Layout = ({ children }) => {
    const [menu, setMenu] = useState([]);

    const iconMapping = {
        "BiHomeAlt": <BiHomeAlt size={18} />,
        "BiCog": <BiCog size={18} />,
        "BiGridAlt": <BiGridAlt size={18} />,
        "BiCreditCard": <BiCreditCard size={18} />,
        "BiUser": <BiUser size={18} />,
        "BiGroup": <BiGroup size={18} />,
        // Tambahkan icon lainnya sesuai kebutuhan
    };

    useEffect(() => {
        const get = async () => {
            try {
                const response = await axios.get('/sidebar');
                if (response.status === 200) {
                    const modifiedData = response.data.data.map(item => ({
                        ...item,
                        modul_icon: iconMapping[item.modul_icon.replace(/[<>\/]/g, '')] // Mapping icon
                    }));
                    setMenu(modifiedData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        get();
    }, []);

    return (
        <>
            <div className="w-full min-h-screen font-sans antialiased text-slate-800 bg-gray-50 flex">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Sidebar sidebarModule={menu} />   
                  </Suspense>
                  <main className="flex-1 text-sm relative ml-64 w-full overflow-x-hidden">
                    <Header />
                    <div>{children}</div>
                  </main>   
            </div>
        </>
    );
};

export default Layout;
