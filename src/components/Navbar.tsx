import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const nav = useNavigate();

    const handleLogout = async () => {
        await logout();
        nav('/login');
    };

    return (
        <nav className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-lg font-bold">Juice Shop</Link>
                {user && (
                    <>
                        <Link to="/juice" className="hover:underline">Juice</Link>
                        <Link to="/cocktail" className="hover:underline">Cocktail</Link>
                        <Link to="/custom" className="hover:underline">Custom</Link>
                    </>
                )}
            </div>
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <span className="hidden sm:inline">{user.username}</span>
                        {user.role === 'admin' && <Link to="/admin" className="px-2 py-1 border rounded">Admin</Link>}
                        <button onClick={handleLogout} className="px-3 py-1 bg-red-600 rounded">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
                        <Link to="/signup" className="px-3 py-1 bg-green-600 rounded text-white">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
