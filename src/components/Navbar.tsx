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
        <nav className="bg-black text-white px-4 py-4 flex justify-between items-center shadow-lg border-b-4 border-yellow-400">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
                    🥤 Juice Bar
                </Link>
                {user && (
                    <>
                        <Link to="/juice" className="hover:text-yellow-400 transition-colors font-medium">Juice</Link>
                        <Link to="/cocktail" className="hover:text-yellow-400 transition-colors font-medium">Cocktail</Link>
                        <Link to="/custom" className="hover:text-yellow-400 transition-colors font-medium">Custom</Link>
                    </>
                )}
            </div>
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <span className="hidden sm:inline text-yellow-400 font-medium">{user.username}</span>
                        {user.role === 'admin' && <Link to="/admin" className="px-3 py-1 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors">Admin</Link>}
                        <button onClick={handleLogout} className="px-4 py-1 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="px-4 py-1 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">Login</Link>
                        <Link to="/signup" className="px-4 py-1 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
