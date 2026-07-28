import BackButton from "../components/BackButton/BackButton";
import "./help-desk.scss";

function HelpDesk() {
  return (
    <main className="help-desk-main">

      <section className="help-desk">
      <BackButton to="/" />
        <h1>Die häufigsten Fragen</h1>
        <div className="help-desk-list-content">
          <details>
            <summary class="help-desk-button collapsible">
              Ist jetzt der richtige Zeitpunkt, um einzusteigen?
            </summary>
            <div class="help-desk-list-content">
              Einen perfekten Zeitpunkt gibt es nicht. Wichtiger als Timing ist
              ein sinnvoller Einstieg mit Struktur. Wer langfristig investieren
              möchte und schrittweise beginnt, für den ist es sinnvoll, jetzt
              mit dem ersten kleinen Schritt zu starten.
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}

export default HelpDesk;
