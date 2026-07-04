import useVocabulary from "../../context/useVocabulary";
import "./all-categories.scss";
import { Link } from "react-router-dom";

export default function VocabularyCategories() {

    const { categories, loading } = useVocabulary();
  
    console.log(categories);
  
    if (loading) {
      return <p>Loading...</p>;
    }


  return (
    <main className="vocab-page">
      <header className="topbar">
        <div>
          <h1>Vocabulary Categories</h1>
          <p>Organize your learning journey by topic and difficulty.</p>
        </div>

        <Link className="main-quiz-button add-new-category-button" to="/my-quiz/add-new-category">+ Add New Category</Link>
      </header>

      <section className="grid">
        {categories.map((cat) => (
          <article className={`card ${cat.wide ? "wide" : ""}`} key={cat.id}>
            
            <div className="card-actions">

              <button>
                <img src="/assets/edit.svg" alt="edit" />
              </button>
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

    </main>
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
