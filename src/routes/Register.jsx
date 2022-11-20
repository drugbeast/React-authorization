import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../functions/fetchData";

function Register() {
  const date = new Date(Date.now()).toISOString();
  const mes =
    "Email or password is invalid. Please, try again! The password must contain at least one capital letter, one digit, a special sign such as !@#$%^&*-_ and its length must be more than 6 symbols";
    
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [submit, setSubmit] = useState({
    isSubmited: true,
    Message: mes,
  });

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const PASS_REGEXP =
    /(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*-_]{6,}/g;

  const [email, setEmail] = useState("");
  const handleSetEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const [password, setPassword] = useState("");
  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const [Rpassword, setRPassword] = useState("");
  const handleSetRPassword = useCallback((e) => {
    setRPassword(e.target.value);
  }, []);

  useEffect(() => {
    fetchData("users").then((users) => {
      setUsers(users);
    });
  }, []);

  const isExists = users.every((user) => user.email != email);

  const handleRegister = () => {

    if (
      Rpassword == password &&
      EMAIL_REGEXP.test(email) &&
      PASS_REGEXP.test(password) &&
      isExists
    ) {
      const user = {
        id: users.length + 1,
        email: email,
        password: password,
        createdAt: date,
      };

      fetchData("users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setSubmit({
            isSubmited: true,
            Message: '',
          });
          navigate("/login");
        })
        .catch(() => {
          throw new Error();
        });
    } else {
      if (!isExists) {
        setSubmit({
          isSubmited: false,
          Message: "This email is already has an account!",
        });
      } else {
        setSubmit({
          isSubmited: false,
          Message: mes,
        });
      }
    }

  };

  return (
    <div className="mx-auto w-[75%] pr-2 min-h-[100vh] flex flex-col">
      <div className="flex-1 flex-col flex gap-2 mt-10">
        <h1 className="text-center text-2xl mb-6 font-bold">Sign up</h1>

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

        <input
          type="password"
          className="border-black rounded-md border-2 pl-2 pb-1 w-56 mx-auto"
          placeholder="repeat password"
          value={Rpassword}
          onChange={handleSetRPassword}
        />

        <p className="text-red-500 text-center mt-4">
          {submit.isSubmited === false ? submit.Message : ""}
        </p>

        <button
          type="submit"
          className="mt-10 text-xl border-black rounded-md border-2 w-40 mx-auto pb-1"
          onClick={handleRegister}
        >
          Sign up
        </button>
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

export default Register;
