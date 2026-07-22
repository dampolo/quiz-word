import { useEffect, useState } from "react";
import useVocabulary from "../../context/useVocabulary";
import "./all-categories.scss";
import { Link } from "react-router-dom";
import  PreLoader  from "../../components/PreLoader/PreLoader" 

export default function VocabularyCategories() {
  const { categories, languages, loading, getFiltredCategories } =
    useVocabulary();
  const [language, setLanguage] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    getFiltredCategories(language);
  }, [language]);

    if (loading) {
      return (
        <div className="show-container ">
        <PreLoader />
        </div>
      )
    }

  return (
    <section className="vocab-page">
      <header className="topbar">
        <div>
          <h1>Vocabulary Categories</h1>
          <p>Organize your learning journey by topic and difficulty.</p>
        </div>

        <Link
          className="main-quiz-button add-new-category-button"
          to="/my-quiz/add-new-category"
        >
          + Add New Category
        </Link>
      </header>

      <ul className="languages-list">
          {languages
            .filter((lang) => lang.language_name === "Without")
            .map((lang) => (
              <li
                className={
                  active === lang.language_name
                    ? "language-single active"
                    : "language-single"
                }
                key={lang.id}
              >
                <button
                  className="language-button"
                  onClick={() => {
                    {
                      setLanguage(lang.id);
                      setActive(lang.language_name);
                    }
                  }}
                >
                  Ohne
                </button>
              </li>
            ))}

          {languages
            .filter((lang) => lang.language_name !== "Without")
            .map((lang) => (
              <li
                className={
                  active === lang.language_name
                    ? "language-single active"
                    : "language-single"
                }
                key={lang.id}
              >
                <button
                  className="language-button"
                  onClick={() => {
                    {
                      setLanguage(lang.id);
                      setActive(lang.language_name);
                    }
                  }}
                >
                  {lang.language_name}
                </button>
              </li>
            ))}
      
      </ul>
      <section className="category">
        {categories.map((cat) => (
          <article className={`card ${cat.wide ? "wide" : ""}`} key={cat.id}>
            <div className="card-actions">
              <Link to={`/my-quiz/${cat.id}/edit-category`}>
                <img src="/assets/edit.svg" alt="edit" />
              </Link>
              <button>
                <img src="/assets/trash.svg" alt="delete" />
              </button>
            </div>

            <h3>{cat.name}</h3>
          </article>
        ))}

        <Link className="add-card" to="/my-quiz/add-new-category">
          <span>⊕</span>
          <strong>Add New Category</strong>
          <small>Create a custom study list</small>
        </Link>
      </section>
    </section>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="stat">
      <span>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Activity({ icon, title, meta, xp }) {
  return (
    <div className="activity-row">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <b>{xp}</b>
    </div>
  );
}
