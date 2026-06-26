import { useState } from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  const initialValues = {
    email: "",
    password1: "",
    password2: "",
    checked: false,
  };
  const [touched, setTouched] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [isPasswordTopVisible, togglePasswordVisibilityTop] = useState(false);
  const [isPasswordBottomVisible, togglePasswordVisibilityBottom] =
    useState(false);
  const [formErrors, setFormErrors] = useState({});
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+\-/*?&])[A-Za-z\d@$!%+\-/*?&]{10,}$/;

  const isFormValid =
    regexEmail.test(formValues.email) &&
    regexPassword.test(formValues.password1) &&
    formValues.password1 === formValues.password2 &&
    formValues.checked;

  function submit(e) {
    e.preventDefault();

    const errors = validateInput(formValues, {
      email: true,
      password1: true,
      password2: true,
      checked: true,
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form is valid!");
      // send data to server
    }
  }
  function handleChange(e) {

    const { name, value, type, checked } = e.target;
    
    const updatedValues = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    };
    
    setFormValues(updatedValues);
  }

  function handleBlur(e) {
    const { name, value, type, checked } = e.target;

    const updatedValues = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    };

    const newTouched = {
      ...touched,
      [name]: true,
    };

    setTouched(newTouched);
    setFormErrors(validateInput(updatedValues, newTouched));
  }

  function validateInput(values, touched) {
    const errors = {};

    if (touched.email && !regexEmail.test(values.email)) {
      errors.email = "E-Mail ist unvollständig/inkorrekt.";
    }

    if (touched.password1 && !regexPassword.test(values.password1)) {
      errors.password1 =
        "Mindestens 10 Zeichen erforderlich: ein Klein- u. ein Großbuchstabe, eine Zahl und ein Sonderzeichen.";
    }

    if (touched.password2 && values.password1 !== values.password2) {
      errors.notMatch = "Passwörter stimmen nicht überein.";
    }

    if (touched.checked && !values.checked) {
      errors.checked = "Bitte akzeptiere die Datenschutzerklärung.";
    }

    return errors;
  }

  return (
    <section className="main-content-customer">
      <Link className="arrow-back" to="/login" aria-label="Anmelden">
        {/* <Back /> */}
      </Link>

      <div className="form-title">
        <h1 className="form-title-name">Konto erstellen</h1>
      </div>

      <p className="description">
        Hast du schon ein Konto?{" "}
        <Link className="new-user-link" to="/login">
          Anmelden
        </Link>
      </p>

      <form onSubmit={submit}>
        <div className="input-container">
          <label htmlFor="email">Dein E-Mail</label>

          <input
            id="email"
            name="email"
            autoComplete="email"
            className="input-field"
            type="email"
            placeholder="beispielname@email.com"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="input-icon">
            <img
              width={24}
              height={24}
              aria-hidden="true"
              src="/assets/mail-icon-input-field.svg"
              alt=""
            />
          </div>

          <div className="warn-txt">
            <span>{formErrors.email}</span>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="password1">Passwort</label>

          <input
            id="password1"
            name="password1"
            autoComplete="new-password"
            type={isPasswordTopVisible ? "text" : "password"}
            className="input-field input-field-pwd-icon"
            placeholder="Passwort"
            value={formValues.password1}

            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button
            type="button"
            className="eye-button"
            onClick={() => togglePasswordVisibilityTop((prev) => !prev)}
          >
            <img
              width={24}
              height={24}
              className="pwd-eye"
              src={
                isPasswordTopVisible ? "/assets/eye.svg" : "/assets/eye-off.svg"
              }
              alt={isPasswordTopVisible ? "verstecken" : "zeigen"}
            />
          </button>

          <div className="input-icon">
            <img
              width={24}
              height={24}
              aria-hidden="true"
              src="/assets/pwd-lock-icon-input-field.svg"
              alt=""
            />
          </div>

          <div className="warn-txt">{formErrors.password1}</div>
        </div>

        <div className="input-container">
          <label htmlFor="password2">Wiederhole dein Passwort</label>

          <input
            id="password2"
            name="password2"
            autoComplete="new-password"
            className="input-field"
            type={isPasswordBottomVisible ? "text" : "password"}
            placeholder="Wiederhole dein Passwort"
            value={formValues.password2}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button
            type="button"
            className="eye-button"
            onClick={() => togglePasswordVisibilityBottom((prev) => !prev)}
          >
            <img
              width={24}
              height={24}
              className="pwd-eye"
              src={
                isPasswordBottomVisible
                  ? "/assets/eye.svg"
                  : "/assets/eye-off.svg"
              }
              alt={isPasswordBottomVisible ? "verstecken" : "zeigen"}
            />
          </button>

          <div className="input-icon">
            <img
              width={24}
              height={24}
              src="/assets/pwd-lock-icon-input-field.svg"
              alt=""
            />
          </div>

          <div className="warn-txt">{formErrors.notMatch}</div>
        </div>

        <div className="checkbox-container">
          <div className="checkbox-content">
            <input
              type="checkbox"
              name="checked"
              checked={formValues.checked}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="checkbox-description">
            <label htmlFor="checkbox">
              Ich stimme der{" "}
              <Link className="privacy" to="/legal">
                Datenschutzerklärung
              </Link>{" "}
              zu.
            </label>

            <div className="checkbox-description warn-txt">
              {formErrors.checked}
            </div>
          </div>
        </div>

        {/* <Preloader
          className={showPreloader ? "show-preloader" : "hide-preloader"}
        /> */}

        <div className="btn-container">
          <button type="submit" disabled={!isFormValid} className="main-quiz-button">
            Weiter
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateAccount;
