import { createContext, useState } from "react";
import useApi from "./ApiContext";

const QuizContext = createContext();

export default QuizContext;

export function QuizProvider({ children }) {
  const api = useApi();
  const [loading, setLoading] = useState(false);

  async function getQuizzes() {
    setLoading(true);

    try {
      const response = await fetch(`${api}quizzes/`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load words.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function createQuiz(quizData) {
    const response = await fetch(`${api}quizzes/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    const newQuiz = await response.json();
    return newQuiz;
  }

  async function getQuizWords(id) {
    setLoading(true);

    try {
      const response = await fetch(`${api}quizzes/${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load words.");
      }

      const data = await response.json();

      return data;
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuiz(id) {
    const response = await fetch(`${api}quizzes/${id}/`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete quiz");
    }
  }

  return (
    <QuizContext.Provider
      value={{
        loading,
        createQuiz,
        deleteQuiz,
        getQuizWords,
        getQuizzes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
