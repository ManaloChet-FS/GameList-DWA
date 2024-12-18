import { FormEvent, useState, Dispatch, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router';
import authService from '../services/auth.service';

interface SignUpProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>
}

const SignUp = ({ setLoggedIn }: SignUpProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorTxt, setErrorTxt] = useState<string>("");

  const navigate = useNavigate();

  const handleError = (err: any): void => {
    if (err.status === 500) {
      setErrorTxt("Server error!");
    }

    const message = err.response.data.error ? err.response.data.error : err.response.data.errors.email.message;
    setErrorTxt(message);
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await authService.signup(email, password).then(
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Create account</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  )
}

export default SignUp;