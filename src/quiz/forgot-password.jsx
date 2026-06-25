import { useState } from "react";
import "./forgot-password.scss";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const isEmailValid = regexEmail.test(formValues.email);


  function recoveryForm(e) {
    e.preventDefault();
    setFormErrors(validateInput(formValues));
    setFormValues(initialValues)
  }

  function handleChange(e) {
    const { name, value } = e.target;  
    const updatedValues = {
      ...formValues,
      [name]: value,
    };
    setFormValues(updatedValues);
    setFormErrors(validateInput(updatedValues));    
  }


  function validateInput(values) {
    const errors = {};

    if (!regexEmail.test(values.email)) {
      errors.email = "E-Mail ist unvollständig/inkorrekt.";
    }

    return errors;
  };
  

  return (
    <section className="main-content-customer">
      <Link className="arrow-back" to="/login" aria-label="Anmelden">
        <app-back></app-back>
      </Link>

      <div className="form-title">
        <h1 className="form-title-name">Passwort vergessen</h1>
      </div>

      <form className="form" onSubmit={recoveryForm}>
        <div className="input-container">
          <label htmlFor="email">Bitte gib deine E-Mail ein:</label>

          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="beispielname@email.com"
            autoComplete="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <div className="input-icon">
            <img
              width="24"
              height="24"
              aria-hidden="true"
              src="./assets/mail-icon-input-field.svg"
              alt=""
            />
          </div>

          <div className="warn-txt">{formErrors.email}</div>
        </div>

        <p className="description">
          Wir senden Dir eine E-Mail, <br />
          über die Du dein Passwort ändern kannst.
        </p>

        <div className="btn-container">
          <Link className="back-button" to="/customer/profile">
            Abbrechen
          </Link>

          <button
            className="main-quiz-button"
            type="submit"
            disabled={!isEmailValid}
          >
            E-Mail senden
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgotPassword;
