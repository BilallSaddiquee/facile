import react, {useState} from 'react';
import img1 from '../images/Facebook.png';
import img2 from '../images/Illustration.png';
import img3 from '../images/instagram.png';
import img4 from '../images/Linkdin.png';
import img5 from '../images/logo.png';

import "../styles/signup.css"
function signUp(){

    const [modal, setModal] = useState(false);

    const toggleModal = () =>{
        setModal(!modal)
    }



    return (
        <div class="container">
            <div class="illu">
                <img src={img2} alt=""/>
            </div>
            <div class="left-section">
                <div class="logo">
                    <img src={img5} alt=""/>
                </div>
            </div>
            <div class="form-container">
                <div class="form-header">
                    <h2>Create your account</h2>
                </div>
                <form>
                    <input type="text" placeholder="Name" required/>
                    <input type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Password" required/>
                    <input type="password" placeholder="Confirm Password" required/>
                    <input type="tel" placeholder="Phone No." required/>
                    <div class="buttons-row">
                        <button type="submit" onClick={toggleModal}>Sign Up</button>
                        <button type="button">Face Auth</button>
                    </div>
                </form>
                <div class="form-separator">
                    <p>OR</p>
                </div>
                <div class="login-through">
                    <p>Login through</p>
                </div>
                <div class="logos-row">
                    <img src={img4} alt="Logo 1" />
                    <img src={img3} alt="Logo 2" />
                    <img src={img1} alt="Logo 3" />
                    </div>
                </div>
        </div>
    );

    }
export default signUp;