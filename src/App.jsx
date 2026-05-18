import { Routes, Route } from "react-router-dom";
import LoginQuiz from "./quiz/login-quiz";
import CreateAccount from "./quiz/create-account";
import ForgotPassword from "./quiz/forgot-password";
import Privacy from "./components/privacy";
import Legal from "./components/legal";
import PublicLayout from "./layouts/PublicLayout";
import Website from "./website/website";
import Login from "./quiz/login-quiz";
import "./index.scss"


function App() {
  return (
    // Auth
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Website/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/impressum" element={<Privacy />} />
        <Route path="/datenschutz" element={<Legal />} />
        <Route path="/login-quiz" element={<LoginQuiz />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
