import { Link } from "react-router-dom";

import "./navbar-customer.scss"

function NavbarCustomer() {
  function closeMenu() {}

  return (
    <ul  className="navbar-customer">
      <li>
        <Link to="/" className="logo">
          {/* <app-logo-text></app-logo-text> */}
          {/* <app-logo></app-logo> */}
        </Link>
      </li>
      <li>
        <Link
          to="/my-quiz/dashboard"
          onClick={closeMenu}
        >
          <img width={25} height={25} src="./assets/dashboard.svg" alt="" />
          <span className="nav-link-text">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to="/my-quiz/all-words/"
          onClick={closeMenu}
        >
          <img width={25} height={25} src="./assets/courses.svg" alt="" />
          <span className="nav-link-text">All Words</span>
        </Link>
      </li>

      <li>
        <Link
          to="/my-quiz/quizzes/"
          onClick={closeMenu}
        >
          <img width={25} height={25} src="./assets/bitbulb.svg" alt="" />
          <span className="nav-link-text">Quizzes</span>
        </Link>
      </li>

      <li>
        <Link to="einstellungen" onClick={closeMenu}>
          <img width={25} height={25} src="./assets/settings.svg" alt="" />
          <span className="nav-link-text">Trash</span>
        </Link>
      </li>
    </ul>
  );
}

export default NavbarCustomer;
