import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="mt-40">
      <p className="text-center text-[3rem]">404</p>
      <p className="text-center text-[2.5rem]">Page not found</p>
      <p className="text-center text-[1.5rem]">
        Go{" "}
        <Link to="/about" className="underline">
          Home
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
