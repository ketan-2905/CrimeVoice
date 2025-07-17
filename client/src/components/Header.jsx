import useUser from "../hook/useUser";
import apiClient from "../apiClient";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useUser();

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      localStorage.clear(); // Optional
      window.location.href = "/"; // or use `navigate('/login')` if using React Router
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-gray-900 text-white flex justify-between items-center px-10 py-4 shadow-lg">
      <div className="text-2xl font-bold text-blue-400">
        Crime Awareness Portal
      </div>
      <nav className="flex gap-6 items-center">
        <Link
          to="/report"
          className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
        >
          Report Crime
        </Link>
        <Link
          to="/dashboard"
          className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
        >
          Heatmap
        </Link>
        <Link
          to="/posts"
          className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
        >
          Community Posts
        </Link>
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
            >
              Signup
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-300 text-violet-800 font-bold text-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-200 font-medium">{user.name}</span>
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
