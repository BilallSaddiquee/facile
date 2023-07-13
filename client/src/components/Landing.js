import react from 'react';
import "../styles/mainpage.css";
import img1 from "../images/logofecile.png";
import img2 from "../images/second.png";
import img3 from "../images/teamwork.png";
import img4 from "../images/illustrationlandingpage.png";
import img5 from "../images/connect.png";


function Mainpage() {
    return (
        <>

            <body>
                <header className="header" >
                    <nav className="nav">
                        <img src={img1} alt="Facile" className="nav__logo" id="logo" />
                        <ul className="nav__links">
                            <li className="nav__item">
                                <a className="nav__link" href="#section--1">Home</a>
                            </li>
                            <li className="nav__item">
                                <a className="nav__link" href="#section--2">About</a>
                            </li>
                            <li className="nav__item">
                                <a className="nav__link" href="#section--3">Workspaces</a>
                            </li>
                            <li className="nav__item">
                                <a className="nav_link nav_link--btn btn--show-modal" href="/">Login</a>
                            </li>
                            <li className="nav__item">
                                <a className="nav_link nav_link--btn btn--show-modal" href="/">Signup</a>
                            </li>
                        </ul>
                    </nav>


                    <div className="header__title">
                        <section className="header-content">
                            <h1>
                                {/* <!-- Green highlight effect --> */}
                                <span>FACILE</span>
                            </h1>
                            <h4>Connect to the world, find anything you need. <br />
                                Make your work facile, your productivity platform.</h4>
                            <button type="button" className="btn btn-primary">Create Workspaces</button>
                        </section>

                        <img src={img4} className="header__img" alt="Minimalist bank items" />
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
                            <img src={img5} data-src="img/connect.jpg" alt="Computer" className="features__img lazy-img" />
                            <div className="features__feature">
                                {/* <div className="features__icon">
                                    <svg>
                                        <use href="img/icons.svg#icon-monitor"></use>
                                    </svg>
                                </div> */}
                                <h5 className="features__header">Connect to the world</h5>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias
                                    sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam
                                    debitis ducimus.
                                </p>
                            </div>
                        </section>
                        <section className="feature-two">
                            <div className="features__feature">
                                <div className="features__icon">
                                    <svg>
                                        <use xlink: href="img/icons.svg#icon-globe"></use>
                                    </svg>
                                </div>
                                <h5 className="features__header">Everything you need in one place</h5>
                                <p>
                                    Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
                                    inventore ab? Nulla incidunt eius numquam sequi iste pariatur
                                    quibusdam!
                                </p>
                            </div>
                            <img src={img2} data-src="img/second.png" alt="Plant" className="features__img lazy-img" />
                        </section>
                        <section className="feature-three">
                            <img src={img3} data-src="img/teamwork.jpg" alt="Credit card" className="features__img lazy-img" />
                            <div className="features__feature">
                                <div className="features__icon">
                                    <svg>
                                        <use xlink: href="img/icons.svg#icon-trending-up"></use>
                                    </svg>
                                </div>
                                <h5 className="features__header">Achieve your goals in Teamwork</h5>
                                <p>
                                    Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
                                    eveniet consequatur odit quam quos possimus assumenda dicta fuga
                                    inventore ab.
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
                    <img src="img/logo fecile.png" alt="Logo" className="footer__logo" />
                    <p className="footer__copyright">
                        &copy; Copyright. Use for learning or your portfolio. Don't use to teach. Don't claim
                        as your own product.
                    </p>
                </footer>

                <div className="modal hidden">
                    <button className="btn--close-modal">&times;</button>
                    <h2 className="modal__header">
                        Create Your Account
                    </h2>
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
                            <a className="next--step" href="login.html">Next &rarr;</a>
                            <a className="next--step" href="login.html">Log in </a>
                        </section>

                    </form>
                </div>
                <div className="overlay hidden"></div>
            </body>

               
        </>  
                
    );
}

export default Mainpage;