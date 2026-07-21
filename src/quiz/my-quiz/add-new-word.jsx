// import "./add-new-word.scss";
import useVocabulary from "../../context/useVocabulary";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import PreLoader from "../../components/PreLoader/PreLoader";

export default function AddNewWord() {
  const { categories, loading, createWord, getFiltredCategories, languages } =
    useVocabulary();

  const [formData, setFormData] = useState({
    language_id: "",
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
      await createWord(formData);

      // Reset form
      setFormData({
        language: "",
        language_id: "",
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

  useEffect(() => {
    if (!formData.language_id) return;
    getFiltredCategories(formData.language_id);
  }, [formData.language_id]);

  if (loading) {
    return (
      <div className="show-container ">
        <PreLoader />
      </div>
    );
  }

  return (
    <section className="add-word-page">
      <BackButton to="/my-quiz/all-words/" />
      <header className="page-header">
        <div>
          <h1>Add New Word</h1>
          <p>Expand your vocabulary with context and mnemonics.</p>
        </div>
      </header>

      <form className="word-card" onSubmit={handleSubmit}>
        <div className="form-group category-group">
          <label htmlFor="language_name">
            Sprache <span>*</span>
          </label>


          <select
            name="language_id"
            value={formData.language_id}
            onChange={handleChange}
          >
          <option value="">Wähle Sprache</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.language_name}
              </option>
            ))}
          </select>
        </div>

        {categories.length > 0 && (
          <div className="form-group category-group">
            <label>
              Kategorie <span>*</span>
            </label>


            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
            <option value="">Wähle Kategorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <hr />
        <section className="word-grid">
          {/* Source Word */}
          <div className="word-panel">
            <div className="panel-title">
              <span></span>
              <strong>SOURCE WORD</strong>
            </div>

            <label htmlFor="source_word">
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

            <label htmlFor="source_tip">Mnemonic Tip (Optional)</label>
            <input
              name="source_tip"
              value={formData.source_tip || ""}
              onChange={handleChange}
              placeholder="Visualize a spring bouncing back"
            />

            <label htmlFor="source_sentence">Example Sentence (Optional)</label>
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

            <label htmlFor="target_word">
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

            <label htmlFor="target_tip">Mnemonic Tip (Optional)</label>
            <input
              name="target_tip"
              value={formData.target_tip || ""}
              onChange={handleChange}
              placeholder="Sounds like 'silence' at the end"
            />

            <label htmlFor="target_sentence">Example Sentence (Optional)</label>
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
    </section>
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
