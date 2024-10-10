import { Link, usePage } from '@inertiajs/react';
import { BiHomeAlt, BiGridAlt, BiCreditCard, BiUser, BiCog } from "react-icons/bi";

const Sidebar = () => {

    const { url } = usePage();

    const sidebarMenu = [
        {name: "Home", link: "/dashboard", icon: <BiHomeAlt size={18} />},
        {name: "Account", link: "/account", icon: <BiGridAlt size={18} />},
        {name: "User", link: "/user", icon: <BiUser size={18} />},
        {name: "Contacts", link: "/dashboard", icon: <BiUser size={18} />},
        {name: "Settings", link: "/dashboard", icon: <BiCog size={18} />},
    ];

    return (
        <>
            <aside className="fixed w-64 border-r border-gray-200 py-2 h-full">
                <ul className="flex flex-col">
                    {
                        sidebarMenu.map((val,index) => {
                            return <li key={index}>
                                <Link href={val.link} className={` flex gap-x-2 font-base items-center py-4 px-4 cursor-pointer transition duration-200 hover:ml-1 ${url === val.link ? "text-gray-800" : "text-gray-400" } ` }>
                                    {val.icon}
                                    <span className="text-base"> {val.name} </span>
                                </Link>
                            </li>
                        })
                    }
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
