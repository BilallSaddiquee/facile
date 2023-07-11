import react from 'react';
import img1 from '../images/Facebook.png';
import img2 from '../images/Illustration.png';
import img3 from '../images/instagram.png';
import img4 from '../images/Linkdin.png';
import img5 from '../images/logo.png';


import "../styles/login.css"
function login(){

    return(
        <div class="container">
        <div class="top">
            <div class="logo">
                <img src="images/signin logo in circke.png" alt="" />
            </div>
            <div class="name">
                <h1>Welcome To Fecile</h1>
            </div>
        </div>
        <div class="input">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <a href="">forgot your password ?</a>
            <button>Sign In</button>
        </div>
        <div class="using">
            <p>Log in using</p>
        </div>
        <div class="socials">
            <img src={img4} alt="" />
            <img src={img3} alt="" />
            <img src={img1} alt="" />
        </div>
    </div>
    );
}

export default login;