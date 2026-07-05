import "./edit-category.scss";
import useVocabulary from "../../context/useVocabulary";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditCategory() {
  const { getCategory, updateCategory } = useVocabulary();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateCategory(Number(id), formData);
      navigate("/my-quiz/vocabulary-categories/");
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
    async function loadCategry() {
      try {
        const category = await getCategory(id);
        setFormData(category);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategry();
  }, [id]);

  return (
    <div className="add-category-card">
      <div className="form-header">
        <div className="header-icon">✚</div>

        <div>
          <h2>Edit Category</h2>
          <p>Organize your vocabulary by topics or themes.</p>
        </div>
      </div>

      <form className="category-form" onSubmit={handleSubmit}>
        <label htmlFor="categoryName">Category Name</label>

        <div className="input-wrap">
          <input
            id="categoryName"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
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
            ▣ Save
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditCategory;
