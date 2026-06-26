import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./PublicLayout.scss";

function MyQuiz() {
  return (
    <>
      <Header />
      <main className="main-quiz">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MyQuiz ;