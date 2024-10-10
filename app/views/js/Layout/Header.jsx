import { Link, router } from '@inertiajs/react';
import { BiBell,BiMessage, BiLogOut } from "react-icons/bi";

const Header = () => {
    const logout = () => {
        router.post('/logout');
    }
    return (
        <>
            <header className="relative border-b border-gray-200 py-2 px-4 flex justify-between items-center">
                <div></div>
                <div className="flex items-center flex-row gap-x-1">
                    <Link className="p-2 border border-gray-200 rounded hover:bg-gray-100"><BiMessage size={16} /></Link>
                    <Link className="p-2 border border-gray-200 rounded hover:bg-gray-100"><BiBell size={16} /></Link>
                    <button onClick={logout} className="p-2 rounded hover:bg-red-700 bg-red-500 text-white"><BiLogOut size={16} /></button>
                </div>
            </header>
        </>
    );
}

export default Header;
