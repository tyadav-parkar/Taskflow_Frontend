import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Menu, X, UserRound, LogOut, LogIn, UserPlus } from "lucide-react";
import { useNavigate,Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Brand */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        TaskManager
      </Link>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-700 hover:text-blue-600 transition"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Menu */}
      <div
        className={`${
          open ? "block" : "hidden"
        } md:flex gap-6 items-center absolute md:static bg-white md:bg-transparent left-0 top-full w-full md:w-auto shadow md:shadow-none p-4 md:p-0`}
      >
        {!user ? (
          <>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-blue-600 font-medium hover:opacity-80 transition"
            >
              <LogIn size={20} /> Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <UserPlus size={20} /> Sign Up
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <UserRound size={22} className="text-blue-600" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
            >
              <LogOut size={20} /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;