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
      console.log("Response:", data);
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
      console.log(data);
      
      return data;
    } finally {
      setLoading(false);
    }
  }

  return (
    <QuizContext.Provider
      value={{
        loading,
        createQuiz,
        getQuizWords,
        getQuizzes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
