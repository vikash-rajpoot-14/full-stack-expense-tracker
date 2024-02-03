import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";

function LogIn() {
    const [formData, setFormData] = useState({
        password: "",
        email: "",
      });
      const navigate = useNavigate();
      const [error, setError] = useState(null);
      const [note, setNote] = useState(null);
      const [loading, setLoading] = useState(false)
      console.log(formData);
    
      const resetError=()=>{
        setTimeout(()=>{
          setError(null)
        }, 1500);
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const {email, password} = formData;
          if(email.trim().length==0 || password.trim().length==0 ){
            throw new Error('Please fill all fields')
          }
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8T2tJrMoX-NMazsfAm00AGKxU27_xLtU",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          const data = await response.json();
          console.log("data", data);
          if(data.error){
            throw new Error(data.error.message)
          }else{
            localStorage.setItem('token',JSON.stringify(data.idToken))
              setNote("Login successful")
            }
          setFormData({
            password: "",
            email: "",
          });
          setLoading(false);
          navigate("/home")
        } catch (error) {
          setError(error.message);
          setLoading(false);
          resetError()
        }
      };
    
      const handleChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.id]: event.target.value });
      };
      return (
        <div className='flex flex-col justify-center items-center h-full'>
          <form
            onSubmit={handleSubmit}
            className="flex border-2 p-4 flex-col justify-center items-center gap-4"
          >
            <p className="text-xl mb-2 p-2">LogIn</p>
            <input
             value={formData.email}
              onChange={handleChange}
              id="email"
              className="w-72 px-8 p-2 text-lg border-2"
              type="text"
              placeholder="Email"
            />
            <input
             value={formData.password}
              onChange={handleChange}
              id="password"
              className="w-72 px-8 p-2 text-lg border-2"
              type="password"
              placeholder="Password"
            />
            <button
              className="w-full bg-sky-500 rounded-full text-white p-1 hover:bg-sky-400"
              type="submit"
            >
             {loading ? "Logining" : "Login"}
            </button>
            <p onClick={()=>navigate("/forgotpassword")} className='text-blue-400 cursor-pointer underline'>forgot password</p>
            {error && <p className={`${error ? "flex":"hidden"} text-red-500`}>{error}</p>}
            {note && <p className={`${note ? "flex":"hidden"} text-green-500`}>{note}</p>}
          </form>
          <div  className="border-2 my-2 p-2 px-[52px] flex justify-center cursor-pointer items-center bg-green-100 hover:border-green-200">
            Don't have an account?<Link className="text-blue-500" to={"/signup"}>Signup</Link>
          </div >
        </div>
      )
}

export default LogIn
