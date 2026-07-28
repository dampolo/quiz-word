import "./all-words.scss";
import useVocabulary from "../../context/useVocabulary";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FormDialog from "../../components/FormDialog/FormDialog";
import useQuiz from "../../context/useQuiz";
import PreLoader from "../../components/PreLoader/PreLoader";

function AllWords() {
  const { words, loading, languages, getFiltredWords, nextPage, getWords } =
    useVocabulary();
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [active, setActive] = useState("");
  const { createQuiz } = useQuiz();

  const [currentPage, setCurrentPage] = useState(1);

  console.log(active);

  function handleCheckboxChange(id, checked) {
    setSelectedWordIds((prev) => {
      if (checked) {
        return [...prev, id];
      }
      return prev.filter((item) => item !== id);
    });
  }

  function openDialog() {
    setDialogOpen(true);
  }

  async function handleCreateQuiz(quizName) {
    const payload = {
      quiz_name: quizName,
      words: selectedWordIds,
    };

    try {
      await createQuiz(payload);

      setDialogOpen(false);
      setSelectedWordIds([]);
    } catch (error) {
      console.error("Failed to create quiz:", error);
      // Optionally show an error message to the user
    }
  }

  useEffect(() => {
    getFiltredWords(language);
  }, [language]);

  useEffect(() => {
    getWords(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="show-container ">
        <PreLoader />
      </div>
    );
  }

  return (
    <div className="vocabulary">
      <div className="vocabulary__header">
        <div>
          <h1>Your Vocabulary</h1>
          <p>
            Organize and track your learning progress. Manage definitions,
            categories, and review schedules for all your saved expressions.
          </p>
        </div>

        <div className="create-buttons">
          <button
            type="submit"
            onClick={openDialog}
            className="main-quiz-button create-quiz"
            disabled={selectedWordIds.length < 3}
          >
            +
          </button>

          <Link className="main-quiz-button add-btn" to="/my-quiz/add-new-word">
            ➕ Add New Word
          </Link>
        </div>
      </div>

      <ul className="languages-list">
        <>
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
                    setLanguage(lang.id);
                    setActive(lang.language_name);
                  }}
                >
                  {lang.language_name}
                </button>
              </li>
            ))}
        </>
      </ul>

      <div className="word-list">
        <div className="list-head">
          <div className="check">+</div>
          <div className="rank">Rank</div>
          <div className="word">Word & Translation</div>
          <div className="category">Category</div>
          <div className="streak">Streak</div>
          <div className="actions">Actions</div>
        </div>
        {words.length === 0 ? (
          <p className="no-words">Du hast hier keine Wörter.</p>
        ) : (
          words.map((word) => (
            <div className="list-row" key={word.id}>
              <div>
                <input
                  type="checkbox"
                  checked={selectedWordIds.includes(word.id)}
                  onChange={(e) =>
                    handleCheckboxChange(word.id, e.target.checked)
                  }
                />
              </div>

              <div className="rank">#{word.target_rank}</div>

              <div className="word">
                <h3>{word.source_word}</h3>
                <span>»</span>
                <p>{word.target_word}</p>
              </div>

              <div className="category">
                <span className={`badge ${word.category_name}`}>
                  {word.category_name}
                </span>
              </div>

              <div className="streak">
                🔥
                <strong>{word.streak}</strong>
                <span>Days</span>
              </div>

              <Link to={`/my-quiz/${word.id}/edit-word`} className="actions">
                ✏️
              </Link>
            </div>
          ))
        )}

        <div className="pagination">
          <span>Showing 4 of 1,240 words</span>

          <div className="pages">
            <button
              className="btn-next"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              fr
            </button>
              {currentPage}
            <button
              className="btn-next"
              disabled={!nextPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Weiter
            </button>
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
      <FormDialog
        open={dialogOpen}
        selectedWordsCount={selectedWordIds.length}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateQuiz}
      />
    </div>
  );
}

export default AllWords;
