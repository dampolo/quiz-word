import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./PublicLayout.scss";

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="main-auth">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;