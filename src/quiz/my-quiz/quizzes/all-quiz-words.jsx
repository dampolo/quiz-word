import "./../all-words.scss";
import useQuiz from "../../../context/useQuiz";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./all-quiz-words.scss";

function AllQuizWords() {
  const { getQuizWords, deleteQuiz, getAttemptQuizScore, getAttemptDetails } =
    useQuiz();
  const { id } = useParams();
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState([]);

  const [quiz, setQuiz] = useState(null);

  const [details, setDetails] = useState([]);

  async function handleDelete() {
    try {
      await deleteQuiz(id);
      navigate("/my-quiz/quizzes/");

      // Update your UI here
    } catch (error) {
      console.error(error);
      // Show an error message
    }
  }

  async function handleAttemptDetails(id) {
    try {
      const data = await getAttemptDetails(id);
      setDetails(data.answers);
      console.log(data);
      // setQuiz(data.)
    } catch (err) {
      console.log(err);
    }

    // do something with the id
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [quizData, attemptsData] = await Promise.all([
          getQuizWords(id),
          getAttemptQuizScore(id),
        ]);

        setQuiz(quizData);
        setAttempts(attemptsData);
        console.log(attemptsData);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, [id]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="vocabulary">
      <div className="vocabulary__header">
        <div>
          <h1>Quiz: {quiz?.quiz_name}</h1>
          <p>
            Organize and track your learning progress. Manage definitions,
            categories, and review schedules for all your saved expressions.
          </p>
        </div>

        <Link className="main-quiz-button add-btn" to="/my-quiz/add-new-word">
          + Add New Word
        </Link>
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

            <button to={`/my-quiz/${word.id}/edit-word`} className="actions">
              ✏️
            </button>
          </div>
        ))}
      </div>

      {/* ATTEMPTS */}
      <div className="attempt-list">
        <div className="list-head-attempt">
          <div>SCORE</div>
          <div>DIRECTION</div>
          <div>Datum</div>
          <div>Actions</div>
        </div>

        {attempts.map((attempt) => (
          <div className="list-row-attempt" key={attempt.id}>
            <div className="rank">#{attempt.score}</div>

            <div className="word">
              <span>{attempt.direction}</span>
            </div>

            {/* to={`/my-quiz/${word.id}/edit-word`} */}
            <div>
              {new Date(attempt.finished_at).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
            <button
              onClick={() => handleAttemptDetails(attempt.id)}
              className="actions"
            >
              🔍
            </button>
          </div>
        ))}
      </div>

      {/* ATTEMPTS ENDE */}

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
      {/* DEATAILS */}
      <div className="vocabulary-card">
        <div className="card-header">
          <h3>Vocabulary details</h3>
          <span className="badge">{details.length} Words Total</span>
        </div>

        <div className="table">
          {details.length === 0 ? (
            <p>Click on 🔍 to see the details.</p>
          ) : (
            details.map((item) => (
              <div
                key={item.id}
                className={`table-row ${!item.is_correct ? "wrong" : ""}`}
              >
                <div className="status">
                  <span
                    className={item.is_correct ? "icon success" : "icon error"}
                  >
                    {item.is_correct ? "✓" : "✕"}
                  </span>
                </div>

                <div className="column">
                  <span className="label">SOURCE WORD</span>
                  <h4>{item.correct_answer}</h4>
                </div>

                <div className="column">
                  <span className="label">YOUR ANSWER</span>
                  <p className={!item.is_correct ? "incorrect" : ""}>
                    {item.user_answer}
                  </p>
                </div>

                <div className="column">
                  <span className="label">CORRECT MEANING</span>
                  <p className="correct">{item.correct_answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* DETAILS ENDE */}
      <button>
        <img onClick={handleDelete} src="/assets/trash.svg" alt="delete" />
      </button>
    </div>
  );
}

export default AllQuizWords;
