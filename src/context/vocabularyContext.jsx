import { createContext, useEffect, useState } from "react";
import useApi from "./ApiContext";

const VocabularyContext = createContext();

export default VocabularyContext;

export function VocabularyProvider({ children }) {
  const api = useApi();

  const [words, setWords] = useState([]);
  const [categories, setCategories] = useState([]);

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
    }
  }

  async function getCategory(id) {
    const response = await fetch(`${api}categories/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load catgories.");
    }
    return await response.json();
  }

  async function getCategories() {
    setLoading(true);
    try {
      const response = await fetch(`${api}categories/`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load catgories.");
      }

      const data = await response.json();
      console.log("Response:", data);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
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

  async function createCategory(categoryData) {
    const response = await fetch(`${api}categories/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    const newCategory = await response.json();
    setWords((prev) => [...prev, newCategory]);

    return newCategory;
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

  async function updateCategory(id, categoryData) {
    const response = await fetch(`${api}categories/${id}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    const updatedCategory = await response.json();

    setWords((prev) =>
      prev.map((word) => (word.id === id ? updatedCategory : word)),
    );

    return updatedCategory;
  }

  async function deleteWord(id) {
    await fetch(`${api}words/${id}/`, {
      method: "DELETE",
      credentials: "include",
    });

    setWords((prev) => prev.filter((word) => word.id !== id));
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        await Promise.all([getWords(), getCategories()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <VocabularyContext.Provider
      value={{
        words,
        categories,
        loading,
        getWords,
        getWord,
        createWord,
        updateWord,
        updateCategory,
        deleteWord,
        getCategory,
        getCategories,
        createCategory,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
}
