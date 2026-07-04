import "./add-new-category.scss";

function AddNewCategory() {
      return (
    <div className="add-category-card">
      <div className="form-header">
        <div className="header-icon">✚</div>

        <div>
          <h2>Add New Category</h2>
          <p>Organize your vocabulary by topics or themes.</p>
        </div>
      </div>

      <form className="category-form">
        <label htmlFor="categoryName">Category Name</label>

        <div className="input-wrap">
          <input
            id="categoryName"
            type="text"
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
          <button type="button" className="cancel-btn">
            Cancel
          </button>

          <button type="submit" className="save-btn">
            ▣ Save
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddNewCategory