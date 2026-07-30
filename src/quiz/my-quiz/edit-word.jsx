import "./edit-word.scss";
import useVocabulary from "../../context/useVocabulary";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useDialog from "../../context/DialogContext/useDialgo";
import BackButton from "../../components/BackButton/BackButton";
import { toast } from "react-toastify";
import PreLoader from "../../components/PreLoader/PreLoader";

export default function EditWord() {
  const {
    getConcept,
    updateWord,
    deleteWord,
    categories,
    getFiltredCategories,
    loading,
    getWords,
    languages,
  } = useVocabulary();

  const { openDialog } = useDialog();

  const { id } = useParams();
  const navigate = useNavigate();

  const [moreSource, setMoreSource] = useState(false);
  const [moreTarget, setMoreTarget] = useState(false);

  const [formData, setFormData] = useState({
    translations: [
      {
        id: 1,
        word: "",
        tip: "",
        sentence: "",
        category_id: "",
      },
      {
        id: "",
        word: "",
        tip: "",
        sentence: "",
        category_id: "",
      },
    ],
  });

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    try {
      await updateWord(Number(id), formData);
      toast.success("Word updated successfully!");
      navigate("/my-quiz/all-words/");
      console.log("Form Data: ", formData);

      getWords();
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

  function handleDelete() {
    openDialog({
      title: "Delete word?",
      description: "This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmButtonClass: "main-quiz-button",
      cancelButtonClass: "main-quiz-button-cancel",

      onConfirm: deleteCurrentWord,
    });
  }

  async function deleteCurrentWord() {
    try {
      await deleteWord(Number(id));
      navigate("/my-quiz/all-words/");
      getWords();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function loadConcept() {
      try {
        const word = await getConcept(id);
        console.log(word);

        setFormData(word);
      } catch (err) {
        console.error(err);
      }
    }

    loadConcept();
  }, [id]);

  useEffect(() => {
    if (!formData.language_id) return;
    getFiltredCategories(formData.language_id);
  }, [formData.language_id]);

  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0].id,
      }));
    }
  }, [categories]);

  if (loading) {
    return (
      <div className="show-container ">
        <PreLoader />
      </div>
    );
  }

  return (
    <main className="add-word-page">
      <BackButton to="/my-quiz/all-words/" />
      <header className="page-header">
        <div>
          <h1>Edit Dein Word</h1>
          <p>You can edit and adjust your word</p>
        </div>
      </header>

      <form className="word-card" onSubmit={handleSubmit}>
        <div className="form-group category-group">
          <label htmlFor="language_id">
            Sprache <span>*</span>
          </label>

          <option value="">Select Language</option>

          <select
            name="language_id"
            value={formData.language_id}
            onChange={handleChange}
            required
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
            <label htmlFor="category">
              Kategorie <span>*</span>
            </label>

            <option value="">Wähle Kategorie</option>

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
        )}

        <hr />
        <section className="word-grid">
          {/* Source Word */}
          <div className={`word-parent ${moreSource ? "add-more-option" : ""}`}>
            <div
              className={`word-panel ${moreSource ? "add-more-option" : ""}`}
            >
              <div className="panel-title">
                <span></span>
                <strong>SOURCE WORD</strong>
              </div>

              <label htmlFor="source_word">
                Term <span>*</span>
              </label>
              <input
                name="word"
                value={formData.translations[0].word}
                onChange={(e) => handleChange(0, e)}
                placeholder="e.g. Resilience"
                autoComplete="off"
                required
              />

              <label
                htmlFor="source_tip"
                className={`${moreSource ? "" : "source_tip"}`}
              >
                Tip (Optional)
              </label>
              <input
                type="text"
                name="tip"
                value={formData.translations[0].tip}
                onChange={(e) => handleChange(0, e)}
                placeholder="Visualize a spring bouncing back"
              />

              <label htmlFor="source_sentence">
                Example Sentence (Optional)
              </label>
              <textarea
                name="sentence"
                value={formData.translations[0].sentence}
                onChange={(e) => handleChange(0, e)}
                placeholder="Her resilience after the setback was admirable."
              />
            </div>
            <div className="button-container">
              {!moreSource ? (
                <button
                  className="more-source-button"
                  type="button"
                  onClick={() => setMoreSource((prev) => !prev)}
                >
                  mehr
                </button>
              ) : (
                <button
                  className="more-source-button"
                  type="button"
                  onClick={() => setMoreSource((prev) => !prev)}
                >
                  weniger
                </button>
              )}
            </div>
          </div>
          {/* Target Word */}
          <div className={`word-parent ${moreTarget ? "add-more-option" : ""}`}>
            <div
              className={`word-panel green ${moreTarget ? "add-more-option" : ""}`}
            >
              <div className="panel-title">
                <span></span>
                <strong>TARGET WORD</strong>
              </div>

              <label htmlFor="target_word">
                Translation <span>*</span>
              </label>
              <input
                type="text"
                name="word"
                value={formData.translations[1].word || ""}
                onChange={(e) => handleChange(1, e)}
                placeholder="e.g. Resiliencia"
                autocomplete="off"
                required
              />

              <label
                htmlFor="target_tip"
                className={`${moreTarget ? "" : "target_tip"}`}
              >
                Tip (Optional)
              </label>
              <input
                type="text"
                name="tip"
                value={formData.translations[1].tip}
                onChange={(e) => handleChange(1, e)}
                placeholder="Sounds like 'silence' at the end"
                autoComplete="off"
              />

              <label htmlFor="target_sentence">
                Example Sentence (Optional)
              </label>
              <textarea
                name="sentence"
                value={formData.translations[1].sentence}
                onChange={(e) => handleChange(1, e)}
                placeholder="Su resiliencia tras el revés fue admirable."
              />
            </div>
            <div className="button-container">
              {!moreTarget ? (
                <button
                  className="more-target-button"
                  type="button"
                  onClick={() => setMoreTarget((prev) => !prev)}
                >
                  mehr
                </button>
              ) : (
                <button
                  className="more-target-button"
                  type="button"
                  onClick={() => setMoreTarget((prev) => !prev)}
                >
                  weniger
                </button>
              )}
            </div>
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

        <div className="action-buttons">
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            <img width={24} height={24} src="/assets/trash.svg" alt="trash" />
          </button>

          <Link to="/my-quiz/all-words" className="main-quiz-button-cancel">
            Cancel
          </Link>
          <button type="submit" className="save-btn">
            Update Word
          </button>
        </div>
      </form>
    </main>
  );
}
