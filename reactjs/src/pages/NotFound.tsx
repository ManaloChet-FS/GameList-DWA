import { Link } from "react-router";

const NotFound = () => {
  return (
    <section id="notfound">
      <h2>404! Page not found!</h2>
      <Link to="/">Go back to directory</Link>
    </section>
  )
}

export default NotFound;