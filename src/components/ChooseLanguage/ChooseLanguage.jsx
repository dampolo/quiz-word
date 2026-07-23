import { Link } from "react-router-dom";
import { useState } from "react";
import BackButton from "../BackButton/BackButton";
import "./ChooseLanguages.scss";

const languages = [
  "English",
  "German",
  "French",
  "Spanish",
  "Italian",
  "Portuguese",
];

function ChooseLanguages() {
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [learningLanguages, setLearningLanguages] = useState([]);

  function handleCheckboxChange(language) {
    if (language === nativeLanguage) return;

    setLearningLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language],
    );
  }

  function handleNativeLanguageChange(e) {
    const language = e.target.value
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
      <section className="main-content-customer">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <p className="description languages">Choose your first language:</p>

            {languages.map((language) => (
              <label key={language} className="radio-option">
                <input
                  type="radio"
                  name="nativeLanguage"
                  value={language}
                  checked={nativeLanguage === language}
                  onChange={handleNativeLanguageChange}
                />
                {language}
              </label>
            ))}
          </div>

          <div className="input-container">
            <p className="description">
              Choose languages which you want to learn:
            </p>

            {languages.map((language) => (
              <label key={language} className="checkbox-option">
                <input
                  type="checkbox"
                  value={language}
                  checked={learningLanguages.includes(language)}
                  onChange={() => handleCheckboxChange(language)}
                />
                {language}
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
