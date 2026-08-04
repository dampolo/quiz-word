import { Link } from "react-router-dom";
import "./navbar-customer.scss";
import { NavLink } from "react-router-dom";
import useVocabulary from "../../context/useVocabulary";

function NavbarCustomer() {

  function closeMenu() {
    
  }

  const { userLanguages } = useVocabulary();
  const firstLanguage = userLanguages[0]?.id;

  return (
    <ul className="navbar-customer">
      <li>
        <NavLink
          to={`/my-quiz/vocabulary-categories?language=${firstLanguage}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img
            width={24}
            height={24}
            src="/assets/categories-icon.svg"
            alt=""
          />
          <span className="nav-link-text">Categories</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/my-quiz/all-words?language=${firstLanguage}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img width={24} height={24} src="/assets/words.svg" alt="" />
          <span className="nav-link-text">All Words</span>
        </NavLink>
      </li>

      <li className="add-new-word">
        <NavLink
          to="/my-quiz/add-new-word"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img width={24} height={24} src="/assets/add.svg" alt="" />
          <span className="nav-link-text">new</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to={`/my-quiz/all-quizzes?language=${firstLanguage}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img width={24} height={24} src="/assets/quiz-icon.svg" alt="" />
          <span className="nav-link-text">Quizzes</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="einstellungen" onClick={closeMenu}>
          <img width={25} height={25} src="/assets/trash.svg" alt="" />
          <span className="nav-link-text">Trash</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavbarCustomer;
