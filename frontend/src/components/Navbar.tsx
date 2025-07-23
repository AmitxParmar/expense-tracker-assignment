import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <header className="h-[8vh] border border-b flex items-center justify-end px-4">
            <div className="space-x-4">
                {pathname === "/login" && (
                    <Link
                        to="/register"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Register
                    </Link>
                )}
                {pathname === "/register" && (
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;