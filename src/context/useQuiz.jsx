import { useContext } from "react";

import QuizContext from "./quizContext";

export default function useQuiz() {
    return useContext(QuizContext)
}