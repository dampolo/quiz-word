import "./edit-word.scss";
import useVocabulary from "../../context/useVocabulary";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditWord() {
  const { getWord, updateWord, categories, loading } = useVocabulary();

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    source_word: "",
    target_word: "",
    source_tip: "",
    target_tip: "",
    source_sentence: "",
    target_sentence: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateWord(Number(id), formData);
      navigate("/my-quiz/all-words/");
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function loadWord() {
      try {
        const word = await getWord(id);
        setFormData(word);
      } catch (err) {
        console.error(err);
      }
    }

    loadWord();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="add-word-page">
        <Link to="/my-quiz/all-words" className="back-btn">←</Link>
      <header className="page-header">
        <div>
          <h1>Edit Dein Word</h1>
          <p>You can edit and adjust your word</p>
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
            badge=""
            title="SOURCE WORD"
            label="Term"
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
            badge=""
            title="TARGET WORD"
            label="Translation"
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
            Update Word
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
