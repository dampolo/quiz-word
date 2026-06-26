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

      {/* Private */}

      <Route path="/my-quiz" element={<MyQuiz />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="all-words" element={<AllWords />} />
        <Route path="quizzes" element={<Quizzes />} />
      </Route>
    </Routes>
  );
}

export default App;
