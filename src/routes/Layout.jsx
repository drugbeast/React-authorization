import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../components/userContext";
import "../index.css";

function Layout() {
  const context = useUserContext();
  const handleLogOut = () => {
    context.setUser({ email: "" });
  };

  return (
    <div className="flex flex-col mx-auto pt-10 w-[75%] pl-2 pr-2 min-h-[100vh]">
      
      <header className="flex justify-between">
        <p className="font-semibold text-xl">Hello, {context.user.email}!</p>
        <nav className="flex gap-6 text-lg">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            Notes
          </NavLink>
          <NavLink onClick={handleLogOut} className="text-red-600 logOut">
            Log out
          </NavLink>
        </nav>
      </header>

      <main className="flex flex-col gap-2 flex-1 mt-10">
        <Outlet />
      </main>

      <footer className="mb-5">
        <hr />
        <div className="flex justify-between mt-8">
          <p>Created by: Matvey Titov</p>
          <p>BSU: 2022</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
