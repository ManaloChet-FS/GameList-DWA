import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router";
import authService from "../services/auth.service";

interface HeaderProps {
  loggedIn: boolean,
  setLoggedIn: Dispatch<SetStateAction<boolean>>
}

const Header = ({ loggedIn, setLoggedIn }: HeaderProps) => {
  const logOut = () => {
    authService.logout();
    setLoggedIn(false);
  }

  return (
    <header>
      <h1>GameList</h1>
      {!loggedIn ? <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </div> : <Link onClick={logOut} to="/login">Log out</Link>}
    </header>
  )
}

export default Header;