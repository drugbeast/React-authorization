import { useUserContext } from "../components/userContext";
import { Link } from "react-router-dom";

function About() {
  const { user } = useUserContext();

  return (
    <div>
      <h1 className="text-center text-4xl mb-6 font-bold mt-10 mb-20">
        About me
      </h1>
      <p className="text-center text-xl font-semibold">
        Email: <span className="font-normal">{user.email}</span>
      </p>
      <p className="text-center text-xl font-semibold">
        Date sign up:{" "}
        <span className="font-normal">
          {user.createdAt.slice(0, 10)} {user.createdAt.slice(11, 19)}
        </span>
      </p>
      <div className="flex justify-center">
        <Link
          className="border-black border-2 text-lg rounded-md p-2 mt-20 mb-6 bg-black text-white"
          to="/notes"
        >
          Go to notes
        </Link>
      </div>
    </div>
  );
}

export default About;
