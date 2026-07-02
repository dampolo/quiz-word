import "./all-categories.scss";

const categories = [
  {
    title: "Professional Relations",
    words: "154 Words",
  },
  {
    title: "Travel & Dining",
    words: "82 Words",
  },
  {
    title: "Advanced Science",
    words: "210 Words",
  },
  {
    title: "Idioms & Slang",
    words: "125 Words",
  },
  {
    title: "Arts & Literature",
    words: "94 Words",
  },
];

export default function VocabularyCategories() {
  return (
    <main className="vocab-page">
      <header className="topbar">
        <div>
          <h1>Vocabulary Categories</h1>
          <p>Organize your learning journey by topic and difficulty.</p>
        </div>
        <button>+ Add New Category</button>
      </header>

      <section className="grid">
        {categories.map((cat) => (
          <article className={`card ${cat.wide ? "wide" : ""}`} key={cat.title}>
            
            <div className="card-actions">

              <button>
                <img src="/assets/edit.svg" alt="edit" />
              </button>
              <button>
                <img src="/assets/trash.svg" alt="delete" />
              </button>
            
            </div>

            {cat.tag && <span className="tag">{cat.tag}</span>}

            <h3>{cat.title}</h3>

          </article>
        ))}

        <button className="add-card">
          <span>⊕</span>
          <strong>Add New Category</strong>
          <small>Create a custom study list</small>
        </button>
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
