import { Link } from "react-router-dom";
import "./header.scss";
import { useState } from "react";

function Header() {
  const [active, setActive] = useState("");
  
  return (


    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <a href="#" className="navbar__logo">
          QuizWord
        </a>

        {/* Navigation */}
        <nav className="navbar__menu">
      <a
        href="#how-it-works"
        className={
          active === "how-it-works"
            ? "navbar__link navbar__link--active"
            : "navbar__link"
        }
        onClick={() => setActive("how-it-works")}
      >
        How it works
      </a>

      <a
        href="#features"
        className={
          active === "features"
            ? "navbar__link navbar__link--active"
            : "navbar__link"
        }
        onClick={() => setActive("features")}
      >
        Features
      </a>

      <a
        href="#success-stories"
        className={
          active === "success-stories"
            ? "navbar__link navbar__link--active"
            : "navbar__link"
        }
        onClick={() => setActive("success-stories")}
      >
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
          <Link className="navbar__button" to="/create-account">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
