import { Link } from '@inertiajs/react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const Layout = ({ children }) => {

    return (
        <>
            <div className="w-full min-h-screen font-sans antialiased text-slate-800 bg-gray-50 flex">
                  <Sidebar />   
                  <main className="flex-1 text-sm relative ml-64 w-full overflow-x-hidden">
                    <Header />
                    <div>{children}</div>
                  </main>   
            </div>
        </>
    );
};

export default Layout;
