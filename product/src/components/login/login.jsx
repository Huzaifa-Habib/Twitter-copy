import "./login.css"
import { useState,useRef,useContext } from 'react';
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { GlobalContext } from '../../context/context';




let baseUrl = ""
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:3000";
  
}

else{
  baseUrl = "https://lazy-pear-caterpillar-slip.cyclic.app"
}



function Login() {
  axios.defaults.withCredentials = true

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const [email,setEmail] =useState ("") 
    const [password,setPassword] =useState ("") 
    let navigate = useNavigate();
    let { state, dispatch } = useContext(GlobalContext);


    const loginHandler = (event)=>{
        event.preventDefault()
        let errorDiv = document.getElementById("error")
        let alertDiv = document.getElementById("alert")


        axios.post(`${baseUrl}/api/v1/login`, {
            email:email,
            password:password
          },{ withCredentials: true })

          .then((response) => {
            console.log(response);
            event.target.reset();
            window.location.reload();
            dispatch({
              type: 'USER_LOGIN',
              payload: response.data.profile
            })

        
            

          }, (error) => {
            console.log(error);
            console.log(error.message)
            alertDiv.style.display = "block"
            errorDiv.textContent = error.message
            
            
          });
      



    }
    const closeHandler = () =>{
      let alertDiv = document.getElementById("alert")
      alertDiv.style.display = "none"

    }

    return (

        <div className='main-div'>
             <nav className='nav'>
                <img src="https://img.icons8.com/fluency/512/twitter.png" alt="" height="40" width="40" />

                <div className='right-side'>
                    <a href="/">Login</a>
                    <a href="/signup">Sign Up</a>

                </div>     
            </nav>    
          <div className="alerts-div" id="alert">
            <div className="error-div">
              <p id="error"></p>
              <button onClick={closeHandler}>Ok</button>

            </div>


          </div>

            <div className='sub-div'>
                <h3>Login to Your account</h3>
                <form onSubmit={loginHandler}>
                    <input ref={firstRef} className="mail-input" type="email" placeholder="Enter Email" required onChange={(e) =>{
                            setEmail(e.target.value)

                        }} />
                    <input ref={secondRef} type="password" placeholder="Enter Password" required onChange={(e) =>{
                            setPassword(e.target.value)

                        }}/>
                    <button type="submit">Login</button>
                </form>
                <a href="/signup">Didn't have an account?Register.</a> <br />
                <a href="/forget-password">Forget Password?</a>
                
                

            </div>
          
        </div>
      );


}


export default Login;
