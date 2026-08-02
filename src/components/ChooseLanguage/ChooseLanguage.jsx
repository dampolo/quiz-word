import { Form, Link } from "react-router-dom";
import { useState } from "react";
import BackButton from "../BackButton/BackButton";
import "./ChooseLanguages.scss";
import useVocabulary from "../../context/useVocabulary";


function ChooseLanguages() {
  const {languages} = useVocabulary()

  const [nativeLanguage, setNativeLanguage] = useState("");
  const [learningLanguages, setLearningLanguages] = useState([]);

  function handleCheckboxChange(id) {
    if (id === nativeLanguage) return;
    setLearningLanguages((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  }

  function handleNativeLanguageChange(e) {
    const language = Number(e.target.value)
    setLearningLanguages([])
    setNativeLanguage(language)

    setLearningLanguages((prev) => prev.includes(language) ? prev : [...prev, language])

}

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      nativeLanguage,
      learningLanguages,
    });
  }

  return (
    <main>
      <section className="main-content-customer choose-languages">
        <form onSubmit={handleSubmit}>
          <h1 className="form-title">Wähle deine Sprachen</h1>
          <div className="input-container">
            <p className="description languages">Wähle deine Muttersprache:</p>

            {languages.map((language) => (
              <label key={language.id} className="radio-option">
                <input
                  type="radio"
                  name="nativeLanguage"
                  value={language.id}
                  checked={nativeLanguage === language.id}
                  onChange={handleNativeLanguageChange}
                />
                {language.language_name}
              </label>
            ))}
          </div>

          <div className="input-container">
            <p className="description">
              Wähle Sprache die du lernen möchtest :
            </p>

            {languages.map((language) => (
              <label key={language.id} className="checkbox-option">
                <input
                  type="checkbox"
                  value={language.id}
                  checked={learningLanguages.includes(language.id)}
                  onChange={() => handleCheckboxChange(language.id)}
                />
                {language.language_name}
              </label>
            ))}
          </div>

          <button
            className="main-quiz-button"
            type="submit"
            disabled={!nativeLanguage || learningLanguages.length < 2}
          >
            Confirm
          </button>
        </form>
      </section>
    </main>
  );
}

export default ChooseLanguages;
