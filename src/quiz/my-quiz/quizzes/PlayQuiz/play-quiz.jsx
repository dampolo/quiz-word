import { useNavigate, useParams } from "react-router-dom";
import "./play-quiz.scss";
import { useEffect, useState } from "react";
import useQuiz from "../../../../context/useQuiz";
import { Link } from "react-router-dom";

function PlayQuiz() {
  const { getQuizWords, postQuizAnswers } = useQuiz();
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    target_word: "",
  });

  const [answers, setAnswers] = useState([]);

  function handleAnswer(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function adjustCurrentQuestion() {
    setAnswers((prev) => [
      ...prev,
      {
        id: quiz.answers[currentQuestion].id,
        target_word: formData.target_word,
      },
    ]);

    console.log(answers);
    
    setCurrentQuestion(currentQuestion + 1);
    setFormData({
      target_word: "",
    });

    const isLastQuestion = currentQuestion === quiz.answers.length - 1;

    if (isLastQuestion) {
      const payload = {
        direction: "FORWARD",
        answers,
      };

      try {
        await postQuizAnswers(id, payload);
        navigate("/my-quiz/all-quizzes/");
        
      } catch (error) {
         console.error("Quiz could not be submitted:", error);
      }
        return
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const quizData = await getQuizWords(id);
        setQuiz(quizData);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [id]);

  return (
    <section className="play-quiz">
      <div className="quiz-card">
        <Link to className="quiz-card__cancel" to={`/my-quiz/${id}/all-quiz-words`}>
          <img width={40} height={40} src="/assets/xbox.svg" alt="" srcset="" />
        </Link>
        <div className="quiz-card__header">
          <h1 className="quiz-card__title">
            {quiz?.answers?.[currentQuestion]?.source_word}
            <button type="button" className="quiz-card__help" aria-label="Help">
              ?
            </button>
          </h1>
        </div>

        <p className="quiz-card__subtitle">Übersetzte das Word</p>

        <form className="quiz-card__form">
          <label htmlFor="translation" className="quiz-card__label">
            Your Translation
          </label>

          <div className="quiz-card__input-wrapper">
            <input
              name="target_word"
              value={formData.target_word}
              onChange={handleAnswer}
              type="text"
              placeholder="Type your answer here..."
              className="quiz-card__input"
            />
          </div>
          {quiz?.answers?.[currentQuestion]?.target_word}
          <button
            type="button"
            className="main-quiz-button button"
            onClick={adjustCurrentQuestion}
          >
            <span>Weiter</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default PlayQuiz;
