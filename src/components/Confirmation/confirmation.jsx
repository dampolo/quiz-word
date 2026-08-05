import React, { useEffect } from "react";
import BackButton from "../BackButton/BackButton";
import { Link, useParams } from "react-router-dom";
import "./confirmation.scss";
import { useAuth } from "../../context/useAuth";

function Confirmation() {
  const { confirmationMessage, verifyEmail, setConfirmationMessage } =
    useAuth();
  const { uidb64, token } = useParams();

  useEffect(() => {
    if(uidb64 && token) {
      async function verify() {
        try {
        await verifyEmail(uidb64, token);
        setConfirmationMessage(
          "Dein E-Mail wurde erfolgreich bestätigt."
        );
      } catch (error) {
        console.error(error);
      }
    }
    verify();
  }
  }, [uidb64, token]);

  return (
    <main>
      <section className="main-content-customer">
        <BackButton to="/login" />

        <div className="form-title">
          <h1 className="form-title-name">Bestätigung</h1>
        </div>

        <div className="description">
          <p>{confirmationMessage}</p>

          <Link className="new-user-link confirmation" to="/login">
            Anmelden
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Confirmation;
