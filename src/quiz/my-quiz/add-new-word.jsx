import "./add-new-word.scss";
import useVocabulary from "../../context/useVocabulary";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      <Link to="/my-quiz/all-words" className="back-btn">
        ←
      </Link>
      <header className="page-header">
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

          {/* Source Word */}
          <div className="word-panel">
            <div className="panel-title">
              <span></span>
              <strong>SOURCE WORD</strong>
            </div>

            <label>
              Term <span>*</span>
            </label>
            <input
              name="source_word"
              value={formData.source_word || ""}
              onChange={handleChange}
              placeholder="e.g. Resilience"
              autocomplete="off"
              required
            />

            <label>Mnemonic Tip (Optional)</label>
            <input
              name="source_tip"
              value={formData.source_tip || ""}
              onChange={handleChange}
              placeholder="Visualize a spring bouncing back"
            />

            <label>Example Sentence (Optional)</label>
            <textarea
              name="source_sentence"
              value={formData.source_sentence || ""}
              onChange={handleChange}
              placeholder="Her resilience after the setback was admirable."
            />
          </div>

          {/* Target Word */}
          <div className="word-panel green">
            <div className="panel-title">
              <span></span>
              <strong>TARGET WORD</strong>
            </div>

            <label>
              Translation <span>*</span>
            </label>
            <input
              name="target_word"
              value={formData.target_word || ""}
              onChange={handleChange}
              placeholder="e.g. Resiliencia"
              autocomplete="off"
              required
            />

            <label>Mnemonic Tip (Optional)</label>
            <input
              name="target_tip"
              value={formData.target_tip || ""}
              onChange={handleChange}
              placeholder="Sounds like 'silence' at the end"
            />

            <label>Example Sentence (Optional)</label>
            <textarea
              name="target_sentence"
              value={formData.target_sentence || ""}
              onChange={handleChange}
              placeholder="Su resiliencia tras el revés fue admirable."
            />
          </div>
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
          <Link to="/my-quiz/all-words" className="cancel-btn">
            Cancel
          </Link>
          <button type="submit" className="save-btn">
            <img
              width={24}
              height={24}
              src="/assets/save-word-icon.svg"
              alt=""
            />
            Save Word
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
