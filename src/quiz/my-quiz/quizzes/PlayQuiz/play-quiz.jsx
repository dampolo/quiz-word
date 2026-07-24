import "./play-quiz.scss";

function PlayQuiz() {
  return (
    <section className="play-quiz">
      <div className="quiz-card">
        <button type="button" className="quiz-card__cancel">
            <img width={40} height={40} src="/assets/xbox.svg" alt="" srcset="" />
          </button>
        <div className="quiz-card__header">
          <h1 className="quiz-card__title">
            l'enthousiasme
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
              id="translation"
              type="text"
              placeholder="Type your answer here..."
              className="quiz-card__input"
            />
          </div>

          <button type="submit" className="main-quiz-button button">
            <span>Weiter</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default PlayQuiz;
