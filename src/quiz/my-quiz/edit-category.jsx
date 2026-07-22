import "./edit-category.scss";
import useVocabulary from "../../context/useVocabulary";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import PreLoader from "../../components/PreLoader/PreLoader";
import { toast } from "react-toastify";


function EditCategory() {
  const { getCategory, updateCategory, getCategories, languages, loading } = useVocabulary();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    language_id: "",
    name: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateCategory(Number(id), formData);
      toast.success("Category updated successfully!");
      navigate("/my-quiz/vocabulary-categories/");
      getCategories()
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
        console.log(category);
        
        setFormData(category);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategry();
  }, [id]);

  if (loading) {
    return (
      <div className="show-container ">
        <PreLoader />
      </div>
    );
  }

  return (
    <section className="add-category-card">
            <BackButton to="/my-quiz/vocabulary-categories/" />
      <div className="form-header">
        <div className="header-icon">✚</div>

        <div>
          <h2>Edit Category</h2>
          <p>Organize your vocabulary by topics or themes.</p>
        </div>
      </div>

      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-group category-group">
          <label>
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
    </section>
  );
}
export default EditCategory;
