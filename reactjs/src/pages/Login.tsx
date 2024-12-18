import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from 'react-router';
import authService from "../services/auth.service";

interface LoginProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>
}

const Login = ({ setLoggedIn }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorTxt, setErrorTxt] = useState<string>("");

  const navigate = useNavigate();

  const handleError = (err: any): void => {


    switch(err.status) {
      case 400:
        setErrorTxt("Invalid login.");
        break;
      case 401:
        setErrorTxt("Incorrect login.");
        break;
      case 500:
        setErrorTxt("Server error!");
        break;
      default:
        setErrorTxt("An unknown error has occurred!");
    }
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await authService.login(email, password).then(
        () => {
          setLoggedIn(true);
          navigate("/");
        },
        error => {
          handleError(error);
        }
      )
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <section className="userForm">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          placeholder='Email'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        { errorTxt && <p className="error">{errorTxt}</p> }
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign up!</Link></p>
      </form>
    </section>
  )
}

export default Login;