import { Routes, Route } from "react-router-dom";
import LoginQuiz from "./quiz/auth/login-quiz";
import CreateAccount from "./quiz/auth/create-account";
import ForgotPassword from "./quiz/auth/forgot-password";
import Privacy from "./components/privacy";
import Legal from "./components/legal";
import PublicLayout from "./layouts/PublicLayout";
import Website from "./website/website";
import Login from "./quiz/auth/login-quiz";
import Dashboard from "./quiz/my-quiz/dashboard";
import MyQuiz from "./layouts/MyQuiz";
import Profile from "./quiz/my-quiz/profile";
import AllWords from "./quiz/my-quiz/all-words";
import Quizzes from "./quiz/my-quiz/quizzes";
import ProtectedRoute from "./context/ProtectedRoute";
import { VocabularyProvider } from "./context/VocabularyContext";
import { Outlet } from "react-router-dom";
import EditWord from "./quiz/my-quiz/edit-word";
import AddNewWord from "./quiz/my-quiz/add-new-word";
import VocabularyCategories from "./quiz/my-quiz/all-categories";


function App() {
  return (
    // Auth
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Website />} />
        <Route path="/login" element={<Login />} />
        <Route path="/impressum" element={<Privacy />} />
        <Route path="/datenschutz" element={<Legal />} />
        <Route path="/login-quiz" element={<LoginQuiz />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/my-quiz" element={<MyQuiz />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />

          <Route element={<VocabularyProvider><Outlet /></VocabularyProvider>}>
            <Route path="all-words" element={<AllWords />} />
            <Route path=":id/edit-word" element={<EditWord />} />
            <Route path="add-new-word" element={<AddNewWord />} />
            <Route path="vocabulary-categories" element={<VocabularyCategories />} />

          </Route>
          
          <Route path="quizzes" element={<Quizzes />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
