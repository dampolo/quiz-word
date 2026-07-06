import { useEffect, useState } from "react";
import "./quizzes.scss";
import { Link } from "react-router-dom";
import useQuiz from "../../context/useQuiz";

function Quizzes() {
  const { getQuizzes } = useQuiz();
  const [quizzes, setQuizzes] = useState([]);


  useEffect(() => {
    async function loadQuizzes() {
      const data = await getQuizzes();
      setQuizzes(data);
      console.log(data);
      
    }

    loadQuizzes();
  }, []);


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

          {quizzes.map(() => (
            <h3>quiz</h3>

          ))

          }
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
