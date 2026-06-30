import { createContext, useEffect, useState } from "react";
import useApi from "./ApiContext";

const VocabularyContext = createContext();

export default VocabularyContext

export function VocabularyProvider({ children }) {
  const api = useApi();

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getWords() {
    setLoading(true);

    try {
      const response = await fetch(`${api}words/`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load words.");
      }

      const data = await response.json();
      console.log("Response:", data);
      setWords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getWord(id) {
    const response = await fetch(`${api}words/${id}/`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Word not found.");
    }

    return await response.json();
  }

  async function createWord(wordData) {
    const response = await fetch(`${api}words/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wordData),
    });

    const newWord = await response.json();
    setWords((prev) => [...prev, newWord]);

    return newWord;
  }

  async function updateWord(id, wordData) {
    const response = await fetch(`${api}words/${id}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wordData),
    });

    const updatedWord = await response.json();

    setWords((prev) =>
      prev.map((word) => (word.id === id ? updatedWord : word)),
    );

    return updatedWord;
  }

  async function deleteWord(id) {
    await fetch(`${api}words/${id}/`, {
      method: "DELETE",
      credentials: "include",
    });

    setWords((prev) => prev.filter((word) => word.id !== id));
  }

  useEffect(() => {
    getWords();
  }, []);

  return (
    <VocabularyContext.Provider
      value={{
        words,
        loading,
        getWords,
        getWord,
        createWord,
        updateWord,
        deleteWord,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
}
