import "./edit-word.scss";
import useVocabulary from "../../context/useVocabulary";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useDialog from "../../context/DialogContext/useDialgo";
import BackButton from "../../components/BackButton/BackButton";
import { toast } from 'react-toastify';

export default function EditWord() {
  const {
    getWord,
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


  const [formData, setFormData] = useState({
    language_name: "",
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
      await updateWord(Number(id), formData);
      toast.success("Word updated successfully!");
      navigate("/my-quiz/all-words/");
      getWords();
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    console.log(e.type, e.target.name, e.target.value);
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
    async function loadWord() {
      try {
        const word = await getWord(id);
        console.log(word);
        
        setFormData(word);
      } catch (err) {
        console.error(err);
      }
    }

    loadWord();
  }, [id]);

  useEffect(() => {
    if (!formData.language_name) return;
    getFiltredCategories(formData.language_name);
  }, [formData.language_name]);

  if (loading) {
    return <p>Loading...</p>;
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
          <label>
            Sprache <span>*</span>
          </label>

          <select
            name="language_name"
            value={formData.language_name}
            onChange={handleChange}
            required
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.language_name}>
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
              onInput={handleChange}
              placeholder="e.g. Resiliencia"
              autocomplete="off"
              required
            />

            <label>Mnemonic Tip (Optional)</label>
            <input
              name="target_tip"
              value={formData.target_tip || ""}
              onChange={handleChange}
              onInput={handleChange}
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
          <button type="button" onClick={handleDelete} className="save-btn">
            <img width={24} height={24} src="/assets/trash.svg" alt="" />
            Delete
          </button>

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
