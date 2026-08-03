import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../BackButton/BackButton";
import "./ChooseLanguages.scss";
import useVocabulary from "../../context/useVocabulary";

function ChooseLanguages() {
  const { languages, postLanguages } = useVocabulary();
  const navigate = useNavigate();
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [learningLanguages, setLearningLanguages] = useState([]);

  function handleCheckboxChange(id) {
    setLearningLanguages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }
  function handleNativeLanguageChange(e) {
    const language = Number(e.target.value);
    setNativeLanguage(language);
    setLearningLanguages((prev) => prev.filter((item) => item !== language));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      native_language_id: nativeLanguage,
      learning_languages_id: learningLanguages,
    };

    try {
      await postLanguages(payload);
      navigate(`/my-quiz/all-words?language=${payload.learning_languages_id[0]}`)
    } catch (err) {
      console.error(err);
    }
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
                  disabled={language.id === nativeLanguage}
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
