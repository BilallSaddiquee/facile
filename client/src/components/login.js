import react from 'react';
import img1 from '../images/Facebook.png';
import img3 from '../images/instagram.png';
import img4 from '../images/Linkdin.png';
import "../styles/login.css"
function Login() {


        return (
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
                    <a href="">forgot password?</a>
                    <button>Sign In</button>
                    <p>Don,t have account <a>SignUp</a></p>
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

export default Login;