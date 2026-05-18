import "./website.scss";

function Website() {
  return (
    <main>
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
              want. Master any language with cognitive clarity and
              scientifically backed methods.
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
      {/* HOW TO USE IT */}
      <section className="steps" id="how-it-works">
        <div className="steps__container">
          {/* Heading */}
          <div className="steps__heading">
            <h2 className="steps__title">How to use it</h2>

            <p className="steps__subtitle">
              Discover the intuitive steps to mastering a new language at your
              own pace with our progress-first philosophy.
            </p>
          </div>

          {/* Cards */}
          <div className="steps__card">
            {/* Card 1 */}
            <div className="steps__single-card">
              <div className="steps__icon steps__icon--purple">🌐</div>

              <h3 className="steps__card-title">Choose Anywhere</h3>

              <p className="steps__card-text">
                Select from over 40 languages. Whether at home or on the go,
                your progress stays synchronized across all devices.
              </p>
            </div>

            {/* Card 2 */}
            <div className="steps__single-card">
              <div className="steps__icon steps__icon--green">🧠</div>

              <h3 className="steps__card-title">Smart Quizzes</h3>

              <p className="steps__card-text">
                Our AI adapts to your learning speed, generating personalized
                word quizzes that challenge you just enough.
              </p>
            </div>

            {/* Card 3 */}
            <div className="steps__single-card">
              <div className="steps__icon steps__icon--orange">📈</div>

              <h3 className="steps__card-title">Track Progress</h3>

              <p className="steps__card-text">
                Visual data dashboards show your vocabulary growth and fluency
                levels in real-time. No more guessing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Website;
