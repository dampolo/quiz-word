import useVocabulary from "../../context/useVocabulary";
import "./quizzes.scss";
import { Link } from "react-router-dom";

function Quizzes() {
  const { categories, loading } = useVocabulary();

  console.log(categories);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="vocab-page">
      <header className="topbar">
        <div>
          <h1>Active Quizzes</h1>
          <p>
            Continue your learning journey. Test your knowladge on recently
            added vocabulary or focus on your weak areas{" "}
          </p>
        </div>

        <Link
          className="main-quiz-button add-new-category-button"
          to="/my-quiz/add-new-category"
        >
          + Add New Quiz
        </Link>
      </header>

      {/* Quiz */}
      <div className="category">
        <article className="vocab-card">
          <h3>Kitchen Vocabulary</h3>
          <div className="vocab-card__footer">
            <div className="vocab-card__meta">
              <span>▦</span>
              <strong>45 Words</strong>
            </div>

            <div className="vocab-card__updated">
              <span>LAST UPDATED</span>
              <strong>2 days ago</strong>
            </div>
          </div>
        </article>
        {/* Quiz END */}

        <Link className="add-card" to="/my-quiz/add-new-category">
          <span>⊕</span>
          <strong>Create Custom Quiz</strong>
          <small>
            Hand-pick words from your library to focus your study session
          </small>
        </Link>
      </div>
    </section>
  );
}

export default Quizzes;
