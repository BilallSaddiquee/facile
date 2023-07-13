import react, { useState } from "react";
import img1 from "../images/logofecile.png";
import img2 from "../images/second.png";
import img3 from "../images/teamwork.jpg";
import img4 from "../images/illustration_Landing.png";
import img5 from "../images/connect.jpg";
import Create_workspace from "./Create_workspace";

function Landing() {

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleSignUpClick = () => {
    setShowLoginPopup(true);
  };

  return (
    <>
      <style>
        {`
    :root {
  --color-primary: #105bd2;
  --color-secondary: #ffcb03;
  --color-tertiary: #ff585f;
  --color-primary-darker: #F99746;
  --color-secondary-darker: #ffbb00;
  --color-tertiary-darker: #fd424b;
  --color-primary-opacity: #5ec5763a;
  --color-secondary-opacity: #ffcd0331;
  --color-tertiary-opacity: #ff58602d;
  --gradient-primary: linear-gradient(to top left, #39b385, #9be15d);
  --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03);
  --gradient-cancellation: linear-gradient(to top left, #e52a5a, #ff585f);
  --white: #ffffff;
  --black: #000000;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  color: #444;
  line-height: 1.9;
  background-size: cover;
  width: 100%;

}

/* GENERAL ELEMENTS */
.section {
  border-top: 1px solid #ddd;

  transition: transform 1s, opacity 1s;
}

.section--hidden {
  opacity: 0;
  transform: translateY(8rem);
}

.section__title {
  max-width: 80rem;
  margin: 0 auto 8rem auto;
  padding: 5rem;
}

.section__description {
  font-size: 3rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.section__header {
  font-size: 3.5rem;
  line-height: 1.3;
  font-weight: 500;
}
.overview__img{
  display: block;
    margin-left: auto;
    margin-right: auto;
    width: 45%;
}

.btn {
  display: inline-block;
  background-color: var(--color-primary);
  font-size: 1.6rem;
  font-family: inherit;
  font-weight: 500;
  border: none;
  padding: 1rem 3rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--white);
  text-decoration: none;
}

.btn:hover {
  background-color: var(--color-primary-darker);
}

.btn--text {
  display: inline-block;
  background: none;
  font-size: 1.7rem;
  font-family: inherit;
  font-weight: 500;
  color: var(--color-primary);
  border: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  cursor: pointer;
  transition: all 0.3s;
  width: max-content;
}



/* This is BAD for accessibility! Don't do in the real world! */


img {
  transition: filter 0.5s;
}

.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    z-index: 9999;
  }
  
  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }


/* NAVIGATION */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  width: 100%;
  padding: 0 6rem;
  z-index: 100;
  flex-direction: row;
  background-color: white;
}

/* nav and stickly className at the same time */
.nav.sticky {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.95);
  margin-top: 0;
}

.nav__logo {
  height: 4.5rem;
  transition: all 0.3s;
}

.nav__links {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 2rem;
}

.nav__link:link,
.nav__link:visited {
  font-size: 1.7rem;
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  display: block;
  transition: all 0.3s;
}

.nav__link--btn:link,
.nav__link--btn:visited {
  padding: 0.2rem 2.5rem;
  border-radius: 1.5rem;
  background-color: var(--color-primary);
  color: #ffffff;
}

.nav__link--btn:hover,
.nav__link--btn:active {
  color: inherit;
  background-color: var(--color-primary-darker);
  color: var(--black);
}



/* HEADER */
.header {
  padding: 0 0rem;
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #609dff;
}

.header__title {
  max-width: 115rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 5%;
  align-items: center;
  gap: 5rem;
}
.header-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}


.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: inherit;
  bottom: 23px;
  right: 28px;
  width: 280px;
}


.form-popup {
  display: none;
  position: inherit;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

h1 {
  font-size: 10rem;
  line-height: 1;
}

h4 {
  font-size: 2.4rem;
  font-weight: 500;
}

.header__img {
  max-width: 100%;
}


.highlight {
  position: relative;
  margin-left: 10px;
}

.highlight::after {
  display: block;
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.7;
  transform: scale(1.07, 1.05) skewX(-15deg);
  background-image: var(--gradient-primary);
}

/* FEATURES */
.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  margin: 0 12rem;
}

.feature-one,
.feature-two,
.feature-three {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.features__img {
  width: 100%;
}

.features__feature {
  align-self: center;
  justify-self: center;
  width: 70%;
  font-size: 1.5rem;
}

.features__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-opacity);
  height: 5.5rem;
  width: 5.5rem;
  border-radius: 50%;
  margin-bottom: 2rem;
}

.features__icon svg {
  height: 2.5rem;
  width: 2.5rem;
  fill: var(--color-primary);
}

.features__header {
  font-size: 2rem;
  margin-bottom: 1rem;
}




/* FOOTER */
.footer {
  padding: 5rem 3rem;
  background-color: #404145;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.footer__nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}


.footer__logo {
  height: 5rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 5rem;
}

.footer__copyright {
  font-size: 1.4rem;
  color: #c3c3c3;
  text-align: center;
}


/* MODAL WINDOW */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 40rem;
  display: block;
  background-color: #f3f3f3;
  padding: 5rem 6rem;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.5s;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: all 0.5s;
}

.modal__header {
  font-size: 3.25rem;
  margin-bottom: 4.5rem;
  line-height: 1.5;
}

.modal__form {
  margin: 0 3rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 2.5rem;
}

.modal__form label {
  font-size: 1.7rem;
  font-weight: 500;
}

.modal__form input {
  font-size: 1.7rem;
  padding: 1rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}

.modal__form button {
  grid-column: 1 / span 2;
  justify-self: center;
  margin-top: 1rem;
}

.btn--close-modal {
  font-family: inherit;
  color: inherit;
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  font-size: 4rem;
  cursor: pointer;
  border: none;
  background: none;
}

.hidden {
  visibility: hidden;
  opacity: 0;
}

/* COOKIE MESSAGE */
.cookie-message {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  background-color: var(--white);
  color: #bbb;
  font-size: 1.3rem;
  font-weight: 400;0
  padding: 1rem;
  z-index: 999;
}`}
      </style>

      <body>
        <header className="header">
          <nav className="nav">
            <img src={img1} alt="Facile" className="nav__logo" id="logo" />
            <ul className="nav__links">
              <li className="nav__item">
                <a className="nav__link" href="#section--1">
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#section--2">
                  About
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#section--3">
                  Workspaces
                </a>
              </li>
              <li className="nav__item">
                <a className="btn" href="/">
                  Login
                </a>
              </li>
              <li className="nav__item">
                <a className="btn" href="/">
                  Signup
                </a>
              </li>
            </ul>
          </nav>

          <div className="header__title">
            <section className="header-content">
              <h1>
                <span>FACILE</span>
              </h1>
              <h4>
                Connect to the world, find anything you need. <br />
                Make your work facile, your productivity platform.
              </h4>
              {/* <button type="button" className="btn btn-primary" onclick="openForm()">Create Workspaces</button> */}

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignUpClick}
                style={{ marginBottom: "20px" }}
              >
                Create Workspaces
              </button>
              {showLoginPopup && (
        <div className="popup-container">
          <div className="popup">
            <Create_workspace onClose={() => setShowLoginPopup(false)} />
          </div>
        </div>
      )}
            </section>

            <img
              src={img4}
              className="header__img"
              alt="Minimalist bank items"
            />
          </div>
        </header>

        <section className="section section-1 " id="section--1">
          <div className="section__title">
            <h2 className="section__description">Features</h2>
            <h3 className="section__header">
              All you need to connect with the Loop
            </h3>
          </div>

          <div className="features">
            <section className="feature-one">
              <img
                src={img5}
                data-src="img/connect.jpg"
                alt="Computer"
                className="features__img lazy-img"
              />
              <div className="features__feature">
                {/* <div className="features__icon">
                                    <svg>
                                        <use href="img/icons.svg#icon-monitor"></use>
                                    </svg>
                                </div> */}
                <h5 className="features__header">Connect to the world</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  alias sint quos? Accusantium a fugiat porro reiciendis saepe
                  quibusdam debitis ducimus.
                </p>
              </div>
            </section>
            <section className="feature-two">
              <div className="features__feature">
                <div className="features__icon">
                  {/*                                 
                                    <svg>
                                        <use xlink: href="img/icons.svg#icon-globe"></use>
                                    </svg> */}
                </div>
                <h5 className="features__header">
                  Everything you need in one place
                </h5>
                <p>
                  Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
                  inventore ab? Nulla incidunt eius numquam sequi iste pariatur
                  quibusdam!
                </p>
              </div>
              <img
                src={img2}
                data-src="img/second.png"
                alt="Plant"
                className="features__img lazy-img"
              />
            </section>
            <section className="feature-three">
              <img
                src={img3}
                data-src="img/teamwork.jpg"
                alt="Credit card"
                className="features__img lazy-img"
              />
              <div className="features__feature">
                {/* <div className="features__icon">
                                    <svg>
                                        <use xlink: href="img/icons.svg#icon-trending-up"></use>
                                    </svg>
                                </div> */}
                <h5 className="features__header">
                  Achieve your goals in Teamwork
                </h5>
                <p>
                  Quasi, fugit in cumque cupiditate reprehenderit debitis animi
                  enim eveniet consequatur odit quam quos possimus assumenda
                  dicta fuga inventore ab.
                </p>
              </div>
            </section>
          </div>
        </section>

        <section className="section " id="section--2">
          <div className="section__title">
            <h2 className="section__description">Overview</h2>
            <h3 className="section__header">
              Everything as simple as possible, but no simpler.
            </h3>
          </div>
        </section>
        <div>
          <img src="img\overview.jpg" className="overview__img" alt="" />
        </div>

        {/* <!-- footer --> */}
        <footer className="footer">
          <img src={img1} alt="Logo" className="footer__logo" />
          <p className="footer__copyright">
            &copy; Copyright. Use for learning or your portfolio. Don't use to
            teach. Don't claim as your own product.
          </p>
        </footer>

        <div className="modal hidden">
          <button className="btn--close-modal">&times;</button>
          <h2 className="modal__header">Create Your Account</h2>
          <form>
            <section className="modal__form">
              <label>First Name</label>
              <input type="text" />
              <label>Last Name</label>
              <input type="text" />
              <label>Email Address</label>
              <input type="email" />
            </section>
            <section className="form-buttons">
              <a className="next--step" href="login.html">
                Next &rarr;
              </a>
              <a className="next--step" href="login.html">
                Log in{" "}
              </a>
            </section>
          </form>
        </div>
        <div className="overlay hidden"></div>
      </body>
    </>
  );
}

export default Landing;
