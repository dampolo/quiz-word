import "./footer.scss";

function Footer() {
    const currentDate = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Left Side */}
        <div className="footer__brand">
          <h2 className="footer__logo">QuizWord</h2>

          <p className="footer__copyright">
            © { currentDate } QuizWord. Empowering progress through language.
          </p>
        </div>

        {/* Center Links */}
        <div className="footer__links">
          <a href="#" className="footer__link">
            Privacy Policy
          </a>

          <a href="#" className="footer__link">
            Terms of Service
          </a>

          <a href="#" className="footer__link">
            Help Center
          </a>

          <a href="#" className="footer__link">
            Contact Us
          </a>
        </div>

        {/* Right Icons */}
        <div className="footer__socials">
          <a href="#" className="footer__social">
            ↗
          </a>

          <a href="#" className="footer__social">
            ✉
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
