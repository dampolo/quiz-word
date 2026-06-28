import { useState } from "react";
import Logo from "../../components/logo";
import DialogCustomer from "./dialog-customer";

function HeaderCustomer() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function showDialog() {
    setIsProfileVisible(true);
  }

  function closeDialog() {
    setIsProfileVisible(false);
  }

  function openMenu() {
    setIsMenuOpen((prev) => !prev);
  }
  return (
    <header-customer>
      <a href="/">
        <Logo />
      </a>

      <img
        width={45}
        height={45}
        className="message"
        src="/assets/bell.svg"
        alt="Nachrichten"
      />

      <button onClick={showDialog}>
        <img
          width={40}
          height={40}
          className="profile-img"
          src="/assets/profile.svg"
          alt="Profile"
        />
      </button>

      <div
        className={`hide-container ${isProfileVisible ? "show-container" : ""}`}
        onClick={closeDialog}
      >
        <DialogCustomer />
      </div>

      <button
        onClick={openMenu}
        className={`hamburger hamburger--collapse ${
          isMenuOpen ? "is-active" : ""
        }`}
        type="button"
        aria-label={isMenuOpen ? "Schließe das Menu" : "Öffne das Menu"}
        aria-expanded={isMenuOpen}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </header-customer>
  );
}

export default HeaderCustomer;
