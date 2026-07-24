import { useParams } from "react-router-dom";
import "./play-quiz.scss";
import { useEffect, useState } from "react";
import useQuiz from "../../../../context/useQuiz";

function PlayQuiz() {
  const { getQuizWords } = useQuiz();
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [formData, setFormData] = useState({
    target_word: "",
  })

  const [answers, setAnswers] = useState([])

  const payload = {
    direction: "FORWARD",
    answers
  }

  function handleAnswer(e) {
    const { name, value,} = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))    
  }


  function adjustCurrentQuestion() {
    setAnswers((prev) => [
      ...prev, 
      {
        id: quiz.answers[currentQuestion].id,
        target_word: formData.target_word
      }
    ]);

    setCurrentQuestion(currentQuestion + 1)

    setFormData({
      target_word: ""
    })
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
        <button type="button" className="quiz-card__cancel">
          <img width={40} height={40} src="/assets/xbox.svg" alt="" srcset="" />
        </button>
        <div className="quiz-card__header">

            <h1 className="quiz-card__title">
              {quiz?.answers?.[currentQuestion]?.source_word}
              <button
                type="button"
                className="quiz-card__help"
                aria-label="Help"
              >
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
