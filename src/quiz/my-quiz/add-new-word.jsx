import "./add-new-word.scss";
import useVocabulary from "../../context/useVocabulary";


export default function AddNewWord() {
    const { categories, loading } = useVocabulary();

      if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="add-word-page">
      <header className="page-header">
        <button className="back-btn">←</button>
        <div>
          <h1>Add New Word</h1>
          <p>Expand your vocabulary with context and mnemonics.</p>
        </div>
      </header>

      <form className="word-card">
        <div className="form-group category-group">
          <label>
            Category <span>*</span>
          </label>

              <select required>
          {categories.map((category) => (
            <option  key={category.id} > {category.name}</option>
        ))}
          </select>
        </div>

        <hr />

        <section className="word-grid">
          <WordPanel
            badge="EN"
            title="SOURCE WORD"
            label="English Term"
            placeholder="e.g. Resilience"
            tipPlaceholder="Visualize a spring bouncing back"
            sentencePlaceholder="Her resilience after the setback was admirable."
          />

          <WordPanel
            badge="ES"
            title="TARGET WORD"
            label="Spanish Translation"
            placeholder="e.g. Resiliencia"
            tipPlaceholder="Sounds like ‘silence’ at the end"
            sentencePlaceholder="Su resiliencia tras el revés fue admirable."
            green
          />
        </section>

        <div className="pro-tip">
          <span>💡</span>
          <div>
            <strong>Pro Tip</strong>
            <p>
              Adding an example sentence helps our AI generate better flashcard
              variations for your next study session.
            </p>
          </div>
        </div>

        <hr />

        <div className="actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            ▣ Save Word
          </button>
        </div>
      </form>
    </main>
  );
}

function WordPanel({
  badge,
  title,
  label,
  placeholder,
  tipPlaceholder,
  sentencePlaceholder,
  green,
}) {
  return (
    <div className={`word-panel ${green ? "green" : ""}`}>
      <div className="panel-title">
        <span>{badge}</span>
        <strong>{title}</strong>
      </div>

      <label>
        {label} <span>*</span>
      </label>
      <input placeholder={placeholder} required />

      <label>Mnemonic Tip (Optional)</label>
      <input placeholder={tipPlaceholder} />

      <label>Example Sentence (Optional)</label>
      <textarea placeholder={sentencePlaceholder} />

      <label>Frequency Rank</label>
      <input placeholder="1-5000" />
    </div>
  );
}