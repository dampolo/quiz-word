import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./PublicLayout.scss";
import HeaderCustomer from "../quiz/my-quiz/header-customer";

function MyQuiz() {
  return (
    <>
      <HeaderCustomer />
      <main className="main-quiz">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MyQuiz ;