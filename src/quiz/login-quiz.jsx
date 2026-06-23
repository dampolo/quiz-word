import { useState } from "react";
import { Link } from "react-router-dom";

import "./login-quiz.scss";

function LoginQuiz() {
    const initialValues = { email: "", password: "" };

    const [formValues, setFormValues] = useState(initialValues);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
        
    }

    const loginWithEmailAndPassword = (e) => {
        e.preventDefault()
    }

    return (
        <section className="main-content-customer">
        <div className="form-title">
            <h1 className="form-title-name">Anmeldung</h1>
        </div>

        <p className="description">
            Wir empfehlen dir, die E-Mail-Adresse zu nutzen, die du bei der Arbeit
            verwendest.
        </p>
        <p className="description">
            Hast du kein konto?
            <Link className="new-user-link" to="/kurse/create-account">
            Konto erstellen
            </Link>
        </p>

        <form onSubmit={loginWithEmailAndPassword}>
            <div className="input-container">

                <pre>{JSON.stringify(formValues , undefined)}</pre>
            
            <label htmlFor="email">E-Mail-Adresse</label>
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

            <div className="warn-txt">
                {/* <span>{errorResponse()}</span>

                {userEmailInvalid && (
                <>
                    {userEmailRequired && (
                    <small>E-Mail ist ein Pflichtfeld.</small>
                    )}
                    {userEmailEmailError && (
                    <small>E-Mail ist unvollständig/inkorrekt.</small>
                    )}
                </>
                )} */}
            </div>
            </div>

            <div className="input-container">
            <label htmlFor="password">Passwort</label>
            <input
                autoComplete="current-password"
                className="input-field"
                // type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Passwort"
                value={formValues.password}
                onChange={handleChange}
            />

            <button
                type="button"
                className="eye-button"
                // onClick={togglePasswordVisibility}
            >
                <img
                width="24"
                height="24"
                className="pwd-eye"
                // src={
                //     isPasswordVisible ? "./assets/eye.svg" : "./assets/eye-off.svg"
                // }
                // alt={isPasswordVisible ? "verstecken" : "zeigen"}
                />
            </button>

            <div className="input-icon">
                <img
                width="24"
                height="24"
                aria-hidden="true"
                src="./assets/pwd-lock-icon-input-field.svg"
                alt=""
                />
            </div>

            <div className="warn-txt warn-txt-hight">
                {/* {passwordInvalid && (
                <>
                    {passwordRequired && (
                    <small>Password ist ein Pflichtfeld.</small>
                    )}

                    {passwordMinLength && (
                    <small id="password-error">
                        Mindestens 8 Zeichen erforderlich: ein Klein- u. ein
                        Großbuchstabe, eine Zahl und ein Sonderzeichen.
                    </small>
                    )}

                    {passwordPattern && !passwordMinLength && (
                    <small>Mindestanforderungen nicht erfüllt.</small>
                    )}
                </>
                )} */}
            </div>
            </div>

            {/* <Preloader
            className={
                mainStateService.showPreloader ? "show-preloader" : "hide-preloader"
            }
            /> */}

            <div className="btn-container">
            <button
                className="forward-btn main-btn-start-in-krypto"
                type="submit"
            >
                Anmelden
            </button>
            </div>

            <Link className="btn-password" to="/kurse/forgot-password">
            Passwort vergessen?
            </Link>

            <div className="seperator-container">
            <span className="sep-line-txt">ODER</span>
            </div>
        </form>

        </section>
    );
}

export default LoginQuiz;
