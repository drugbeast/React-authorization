import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../components/userContext";
import fetchData from "../functions/fetchData";

function Login() {
  const userContext = useUserContext();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    isLogin: true,
    Message: "Email or password is invalid. Please, try again!",
  });

  const [email, setEmail] = useState("");
  const handleSetEmail = useCallback((e) => {
    setEmail(e.target.value);
  });

  const [password, setPassword] = useState("");
  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value);
  });

  const handleLogin = useCallback(() => {

    fetchData(`users?email=${email}&password=${password}`)
      .then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0]);
        } else {
          setLogin({
            isLogin: false,
            Message: "Email or password is invalid. Please, try again!",
          });
        }
      })
      .catch(() => {
        throw new Error();
      });
      
  }, [email, password, userContext]);

  useEffect(() => {
    if (userContext.user?.email) {
      setLogin({
        isLogin: true,
        Message: "",
      });
      navigate("/about");
    }
  }, [navigate, userContext.user]);

  return (
    <div className="mx-auto w-[75%] pr-2 min-h-[100vh] flex flex-col">
      <div className="flex flex-col gap-2 flex-1 mt-10">
        <h1 className="text-center text-2xl mb-6 font-bold">Log in</h1>

        <input
          type="email"
          className="border-black rounded-md border-2 pl-2 pb-1 w-56 mx-auto"
          placeholder="email"
          value={email}
          onChange={handleSetEmail}
        />

        <input
          type="password"
          className="border-black rounded-md border-2 pl-2 pb-1 w-56 mx-auto"
          placeholder="password"
          value={password}
          onChange={handleSetPassword}
        />

        <p className="text-red-500 text-center mt-4">
          {login.isLogin === false ? login.Message : ""}
        </p>

        <button
          type="submit"
          className="mt-10 text-xl border-black rounded-md border-2 w-40 mx-auto pb-1 mb-6"
          onClick={handleLogin}
        >
          Log in
        </button>

        <div>
          <p className="text-center text-[1.1rem]">
            Don't have an account? Register{" "}
            <Link to="/register" className="font-bold underline">
              here
            </Link>
            !
          </p>
        </div>
      </div>

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

export default Login;
