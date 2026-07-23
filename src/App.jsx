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
import AllWords from "./quiz/my-quiz/all-words";
import ProtectedRoute from "./context/ProtectedRoute";
import { VocabularyProvider } from "./context/VocabularyContext";
import { QuizProvider } from "./context/QuizContext";
import { DialogProvider } from "./context/DialogContext/DialogContext";
import { Outlet } from "react-router-dom";
import EditWord from "./quiz/my-quiz/edit-word";
import AddNewWord from "./quiz/my-quiz/add-new-word";
import VocabularyCategories from "./quiz/my-quiz/all-categories";
import AddNewCategory from "./quiz/my-quiz/add-new-category";
import EditCategory from "./quiz/my-quiz/edit-category";
import AddNewQuiz from "./quiz/my-quiz/quizzes/add-new-quiz";
import Quizzes from "./quiz/my-quiz/quizzes/quizzes";
import AllQuizWords from "./quiz/my-quiz/quizzes/all-quiz-words";
import { ToastContainer } from "react-toastify";
import Profile from "./quiz/my-quiz/Profile/profile";
import EditProfile from "./quiz/my-quiz/Profile/EditProfile/edit-profile";
import Confirmation from "./components/Confirmation/confirmation";

function App() {
  return (
    // Auth
    <>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Website />} />
        <Route path="/login" element={<Login />} />
        <Route path="/impressum" element={<Privacy />} />
        <Route path="/datenschutz" element={<Legal />} />
        <Route path="/login-quiz" element={<LoginQuiz />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirmation" element={<Confirmation />} />

      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/my-quiz" element={<MyQuiz />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />


          <Route
            element={
              <VocabularyProvider>
                <QuizProvider>
                  <DialogProvider>
                    <Outlet />
                  </DialogProvider>
                </QuizProvider>
              </VocabularyProvider>
            }
          >
            {/* Vocabulary */}
            <Route path="all-words" element={<AllWords />} />
            <Route path=":id/edit-word" element={<EditWord />} />
            <Route path="add-new-word" element={<AddNewWord />} />
            <Route
              path="vocabulary-categories"
              element={<VocabularyCategories />}
            />
            <Route path="add-new-category" element={<AddNewCategory />} />
            <Route path=":id/edit-category" element={<EditCategory />} />

            {/* Quizzes */}
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="add-new-quiz" element={<AddNewQuiz />} />
            <Route path=":id/all-quiz-words" element={<AllQuizWords />} />
          </Route>
        </Route>
      </Route>
    </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            theme="light"
          />
          </>
  );
}

export default App;
