import "./add-new-category.scss";
import { Link, useNavigate } from "react-router-dom";
import useVocabulary from "../../context/useVocabulary";
import { useState } from "react";
import BackButton from "../../components/BackButton/BackButton";

function AddNewCategory() {
  const { createCategory, languages } = useVocabulary();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    language_id: "",
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createCategory(formData);
      setFormData({ language_id: "", name: "" });
      navigate("/my-quiz/vocabulary-categories/");
    } catch (err) {
      console.error(err);
      
    }

  }

  return (
    <div className="add-category-card">
      <BackButton to="/my-quiz/vocabulary-categories/" />

      <div className="form-header">
        <div className="header-icon">✚</div>

        <div>
          <h2>Add New Category</h2>
          <p>Organize your vocabulary by topics or themes.</p>
        </div>
      </div>

      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-group category-group">
          <label htmlFor="language_id">
            Sprache <span>*</span>
          </label>

          <select
            name="language_id"
            value={formData.language_id}
            onChange={handleChange}
            required
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.language_name}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="categoryName">Category Name</label>
        <div className="input-wrap">
          <input
            id="categoryName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            autocomplete="off"
            placeholder="e.g., Business Travel"
          />
          <span className="input-icon">⌘</span>
        </div>

        <small>Short, descriptive names work best for navigation.</small>

        <div className="color-section">
          <h4>Selected Color Theme</h4>

          <div className="color-options">
            <button type="button" className="color-option active purple" />
            <button type="button" className="color-option green" />
            <button type="button" className="color-option orange" />
            <button type="button" className="color-option pink" />
          </div>
        </div>

        <div className="form-actions">
          <Link
            type="button"
            className="main-quiz-button-cancel"
            to="/my-quiz/vocabulary-categories"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="main-quiz-button save-btn"
            disabled={formData.name.trim().length < 3}
          >
            <img
              width={24}
              height={24}
              src="/assets/save-word-icon.svg"
              alt=""
            />
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddNewCategory;
