import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./PublicLayout.scss";

function PublicLayout() {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
}

export default PublicLayout;