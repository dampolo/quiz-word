import React from "react";
import BackButton from "../BackButton/BackButton";
import { Link } from "react-router-dom";
import "./confirmation.scss";

function Confirmation() {
  return (
    <main>
      <section className="main-content-customer">
        <BackButton to="/login" />

        <div className="form-title">
          <h1 className="form-title-name">Bestätigung</h1>
        </div>

        <div className="description">
          <p>
            Du bist erfolgreich registriert. Um dich anzumelden, musst du dein
            E-Mail bestätigen!'
          </p>

          <Link className="new-user-link confirmation" to="/login">Anmelden</Link>
        </div>
      </section>
    </main>
  );
}

export default Confirmation;
