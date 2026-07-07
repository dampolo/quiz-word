import "./../all-words.scss";
import useQuiz from "../../../context/useQuiz";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AllQuizWords() {
  const { getQuizWords } = useQuiz();
  const { id } = useParams();

   const [quiz, setQuiz] = useState(null);

  useEffect(() => {
      async function loadQuizWords() {
        try {
          const data = await getQuizWords(id);
          console.log(data);
          
          setQuiz(data);
        } catch (err) {
          console.error(err);
        }
      }
  
      loadQuizWords();
    }, [id, getQuizWords]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="vocabulary">
      <div className="vocabulary__header">
        <div>
          <h1>Your Vocabulary{quiz?.quiz_name}</h1>
          <p>
            Organize and track your learning progress. Manage definitions,
            categories, and review schedules for all your saved expressions.
          </p>
        </div>

        <Link className="main-quiz-button add-btn" to="/my-quiz/add-new-word">+ Add New Word</Link>
      </div>

      <div className="word-list">
        <div className="list-head">
          <div>Rank</div>
          <div>Word & Translation</div>
          <div>Category</div>
          <div>Streak</div>
          <div>Actions</div>
        </div>

        {quiz?.answers.map((word) => (
          <div className="list-row" key={word.id}>
            <div className="rank">#{word.source_rank}</div>

            <div className="word">
              <h3>{word.source_word}</h3>
              <span>»</span>
              <p>{word.target_word}</p>
            </div>

            <div>
              <span className={`badge ${word.category_name}`}>
                {word.category_name}
              </span>
            </div>

            <div className="streak">
              🔥
              <strong>{word.streak}</strong>
              <span>Days</span>
            </div>

            <Link to={`/my-quiz/${word.id}/edit-word`} className="actions">✏️</Link>
          </div>
        ))}

        <div className="pagination">
          <span>Showing 4 of 1,240 words</span>

          <div className="pages">
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>31</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>

      <div className="cards">
        <div className="card goal">
          <h3>Today's Goal</h3>
          <p>Review 20 new words to keep your streak alive.</p>

          <div className="progress">
            <div className="progress-fill"></div>
          </div>

          <small>12 / 20 Words • 60%</small>
        </div>

        <div className="card mastery">
          <h3>Mastery Level</h3>
          <p>You've reached B2 fluency level in Vocabulary.</p>
        </div>

        <div className="card review">
          <h3>Flashcard Review</h3>
          <p>Ready to test your memory on recent additions?</p>

          <button>Start Review Session</button>
        </div>
      </div>
    </div>
  );
}

export default AllQuizWords;
