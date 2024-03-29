import React, { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { context } from "../App";

function SignUp() {
  const [formData, setFormData] = useState({
    confirmpass: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const Ctx = useContext(context)

  const resetError=()=>{
    setTimeout(()=>{
      setError(null)
    }, 1500);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {email, password, confirmpass} = formData;
      if(email.trim().length==0 || password.trim().length==0 || confirmpass.trim().length==0){
        throw new Error('Please fill all fields')
      }
      if(password!==confirmpass){
        throw new Error('Passwords do not match')
      }
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8T2tJrMoX-NMazsfAm00AGKxU27_xLtU",
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
        Ctx.setToken(data.idToken);
        Ctx.setUser(data);
        setNote("SignUp successful")

      }
      setFormData({
        confirmpass: "",
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
    <div className="flex flex-col justify-center items-center  h-full">
      <form
        onSubmit={handleSubmit}
        className="flex border-2 p-4 flex-col justify-center items-center gap-4"
      >
        <p className="text-xl mb-2 p-2">SignUp</p>
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
        <input
         value={formData.confirmpass}
          onChange={handleChange}
          id="confirmpass"
          className="w-72 px-8 p-2 mb-4 text-lg border-2"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          className="w-full bg-sky-500 rounded-full text-white p-1 hover:bg-sky-400"
          type="submit"
        >
         {loading ? "Signing" : "SignUp"}
        </button>
        {error && <p className={`${error ? "flex":"hidden"} text-red-500`}>{error}</p>}
        {note && <p className={`${note ? "flex":"hidden"} text-green-500`}>{note}</p>}
      </form>
      <div to="/signup" className="border-2 w- my-2 p-2 px-20 flex justify-center cursor-pointer items-center bg-green-100 hover:border-green-200">
        Have an account?<Link to={"/"} className="text-blue-500">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
