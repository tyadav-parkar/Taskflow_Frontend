import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
 
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
 
export default Layout;