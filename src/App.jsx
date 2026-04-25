import { Routes, Route } from "react-router-dom";
import LoginQuiz from "./quiz/login-quiz";
import CreateAccount from "./quiz/create-account";
import ForgotPassword from "./quiz/forgot-password";

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login-quiz" element={<LoginQuiz />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

    </Routes>
  );
}

export default App
