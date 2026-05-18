import "./website.scss";


function Website() {
  return (
    <section className="hero">
      <div className="hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <div className="hero__badge">✦ Progress Focused Learning</div>

          <h1 className="hero__title">
            Welcome on <span>quiz word</span>
          </h1>

          <p className="hero__description">
            on this webpage you can learn languages as you want and where you
            want. Master any language with cognitive clarity and scientifically
            backed methods.
          </p>

          <div className="hero__buttons">
            <a href="#" className="hero__button hero__button--primary">
              Register
              <span>→</span>
            </a>

            <a href="#" className="hero__button hero__button--secondary">
              Login
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero__image-wrapper">
          <div className="hero__image-card">

            {/* Floating Card */}
            <div className="hero__floating-card">
              <div className="hero__floating-top">
                <div className="hero__avatars">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <p>15k+ Learners online</p>
              </div>

              <div className="hero__progress">
                <div className="hero__progress-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Website;
