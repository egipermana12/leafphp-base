import { Link, usePage, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({sidebarModule}) => {

    const { url } = usePage();

    const logout = () => {
        router.post('/logout');
    }

    return (
        <>
            <aside className="fixed w-64 border-r border-gray-200 h-full py-2 flex flex-col justify-between">
                <ul className="flex flex-1 flex-col bg-red-5">
                    {
                        sidebarModule.map((val,index) => {
                            return <li key={index}>
                                <Link href={val.modul_link} className={` flex gap-x-2 font-base items-center py-4 px-4 cursor-pointer transition duration-200 hover:ml-1 ${url.startsWith(val.modul_link) ? "text-gray-800" : "text-gray-400" } ` }>
                                    {val.modul_icon}
                                    <span className="text-base"> {val.modul_name} </span>
                                </Link>
                            </li>
                        })
                    }
                </ul>
                <div className="px-2">
                    <button 
                        className="flex gap-x-2 font-base items-center py-2 px-4 cursor-pointer bg-gradient-to-r from-gray-900 to-black text-white w-full rounded rounded-md py-2"
                        onClick={logout}
                        >
                        <BiLogOut size={18} /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
