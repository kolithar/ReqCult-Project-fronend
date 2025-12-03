import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function Navbar() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
            {!user ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                </>
            )}
        </nav>
    );
}
