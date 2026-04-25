import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Header</h1>
      <Link to="/login"></Link>
    </header>
  );
}

export default Header;
