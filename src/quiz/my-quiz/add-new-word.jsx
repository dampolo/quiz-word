import "./add-new-word.scss";
import useVocabulary from "../../context/useVocabulary";
import { useState } from "react";

export default function AddNewWord() {
  const { categories, loading, createWord } = useVocabulary();

  const [formData, setFormData] = useState({
    category: "",

    source_word: "",
    target_word: "",

    source_tip: "",
    target_tip: "",

    source_sentence: "",
    target_sentence: "",
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createWord(formData);

      // Reset form
      setFormData({
        category: "",
        source_word: "",
        target_word: "",
        source_tip: "",
        target_tip: "",
        source_sentence: "",
        target_sentence: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(formData);
    
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
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

      <form className="word-card" onSubmit={handleSubmit}>
        <div className="form-group category-group">
          <label>
            Category <span>*</span>
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
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
            wordName="source_word"
            tipName="source_tip"
            sentenceName="source_sentence"
            values={formData}
            onChange={handleChange}
          />

          <WordPanel
            badge="ES"
            title="TARGET WORD"
            label="Spanish Translation"
            placeholder="e.g. Resiliencia"
            tipPlaceholder="Sounds like 'silence' at the end"
            sentencePlaceholder="Su resiliencia tras el revés fue admirable."
            wordName="target_word"
            tipName="target_tip"
            sentenceName="target_sentence"
            values={formData}
            onChange={handleChange}
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
  values,
  onChange,
  wordName,
  tipName,
  sentenceName,
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
      <input
        name={wordName}
        value={values[wordName]}
        onChange={onChange}
        placeholder={placeholder}
        required
      />

      <label>Mnemonic Tip (Optional)</label>
      <input
        name={tipName}
        value={values[tipName]}
        onChange={onChange}
        placeholder={tipPlaceholder}
      />

      <label>Example Sentence (Optional)</label>
      <textarea
        name={sentenceName}
        value={values[sentenceName]}
        onChange={onChange}
        placeholder={sentencePlaceholder}
      />
    </div>
  );
}
