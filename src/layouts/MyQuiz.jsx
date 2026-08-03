import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./PublicLayout.scss";
import HeaderCustomer from "../quiz/my-quiz/header-customer";
import NavbarCustomer from "../quiz/my-quiz/navbar-customer";
import useVocabulary from "../context/useVocabulary";

function MyQuiz() {

  const { userLanguages } =
      useVocabulary();
	return (
	  <>
	  <main className="main-customer">
      <HeaderCustomer />

      <div className="main-content">
        <NavbarCustomer firstLanguage={userLanguages[0]?.id} />
          <Outlet />
      </div>
    </main>
      <Footer />
	  </>
  );
}

export default MyQuiz;
