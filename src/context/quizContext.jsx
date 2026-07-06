import { createContext, useEffect, useState } from "react";
import useApi from "./ApiContext";

const QuizContext = createContext();

export default QuizContext;

export function QuizzProvider({ children }) {
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

    return (
    <QuizContext.Provider
      value={{
        loading,
        getQuizzes
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
