import { useLocation } from "react-router-dom";

function QuizResults() {
  const { state } = useLocation();
  console.log(state);
  
  const details = state?.results || [];

    debugger
  return (
    <div className="vocabulary-card">
      <div className="card-header">
        <h3>Vocabulary details</h3>
        <span className="badge">{details.length} Words Total</span>
      </div>

      <div className="table">
        {details.map((item) => (
          <div
            key={item.id}
            className={`table-row ${!item.is_correct ? "wrong" : ""}`}
          >
            <div className="status">
              <span className={item.is_correct ? "icon success" : "icon error"}>
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
        ))}
      </div>
    </div>
  );
}

export default QuizResults;
