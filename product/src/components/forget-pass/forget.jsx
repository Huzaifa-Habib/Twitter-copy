import axios from "axios"
import {useState,useContext,useRef} from 'react';
import {useNavigate} from "react-router-dom"

import "./forget.css"




let baseUrl = ""
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:3000";
  
}

else{
  baseUrl = "https://lazy-pear-caterpillar-slip.cyclic.app"
}


function ForgetPass() {
    const [verifyEmail, setVerifyEmail] = useState(null)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [otp, setOtp] = useState(null)
    const [newPass, setNewPass] = useState(null)
    let navigate = useNavigate();




    const OtpRequestHandler = (()=>{
        axios.post(`${baseUrl}/api/v1/forget-password`, {
            email:verifyEmail,
          },{ withCredentials: true })

          .then((response) => {
            console.log(response.data.message);
            setIsOtpSent(true)
          }, (error) => {
            console.log(error);    
          });
      

       }) 

    const changePassHandler = ((e)=>{
      e.preventDefault()
      axios.post(`${baseUrl}/api/v1/forget-password-2`, {
          email:verifyEmail,
          otp:otp,
          newPassword:newPass
        },{ withCredentials: true })

        .then((response) => {
          console.log(response.data.message);

        }, (error) => {
          console.log(error);    
        });
     }) 



    return(
      
        <div className="main-div">
          
         <h3>Reset Your Password</h3>

          {(isOtpSent == false)?
          <div>
            <input type="email" placeholder="Enter Email" onChange={(e) =>{
                setVerifyEmail(e.target.value)
             }}/>

             <button onClick={OtpRequestHandler}>Send OTP</button>

          </div>
    
          :
          <div>
            <form onSubmit={changePassHandler}>
              <input type="number" placeholder="Enter Your OTP"onChange={(e) =>{
                setOtp(e.target.value)
             }} /> 
              <input type="text" placeholder="Enter Your New Password"onChange={(e) =>{
                setNewPass(e.target.value)
             }}
              />
              <button type="submit">Update</button>

            </form>
            

          </div>
          }
           

        </div>
     
    )

}

export default ForgetPass