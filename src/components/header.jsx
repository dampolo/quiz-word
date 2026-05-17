import { Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <a href="#" className="navbar__logo">
          QuizWord
        </a>

        {/* Navigation */}
        <nav className="navbar__menu">
          <a href="#" className="navbar__link">
            How it works
          </a>
          <a href="#" className="navbar__link">
            Features
          </a>
          <a href="#" className="navbar__link">
            Success Stories
          </a>
          <a href="#" className="navbar__link">
            Pricing
          </a>
        </nav>

        {/* <Actions */}
        <div className="navbar__actions">
          <Link className="navbar__login" to="/login">
            Login
          </Link>
          <a href="#" className="navbar__button">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
