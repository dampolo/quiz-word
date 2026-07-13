import "./all-words.scss";
import useVocabulary from "../../context/useVocabulary";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FormDialog from "../../components/FormDialog/FormDialog";
import useQuiz from "../../context/useQuiz";

function AllWords() {
  const { words, loading, languages, getFiltredWords } = useVocabulary();
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ language, setLanguage ] = useState("")
  const { createQuiz } = useQuiz();

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

  if (loading) {
    return <p>Loading...</p>;
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
          + Add New Word
        </Link>
          </div>

      </div>

      <ul className="languages-list">
        <li className="langauge-single">
          <button className="langauge-button" onClick={() => (setLanguage("Ohne"))} >Ohne</button>
        </li>
        {languages.map((lang) => (
          <li className="langauge-single" key={lang.id}>
            <button className="langauge-button" onClick={() => (setLanguage(lang.language_name))}>
              {lang.language_name}
              </button>
          </li>
        ))}
      </ul>

      <div className="word-list">
        <div className="list-head">
          <div>+</div>
          <div>Rank</div>
          <div>Word & Translation</div>
          <div>Category</div>
          <div>Streak</div>
          <div>Actions</div>
        </div>
        {
          words.length === 0 ? (
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

            <Link to={`/my-quiz/${word.id}/edit-word`} className="actions">
            ✏️
            </Link>
            </div>
          ))
        )}
          
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
