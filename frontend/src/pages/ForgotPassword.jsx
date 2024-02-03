import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const resetError = () => {
    setTimeout(() => {
      setError(null);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { email } = formData;
      if (email.trim().length == 0) {
        throw new Error("Please fill all fields");
      }
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8T2tJrMoX-NMazsfAm00AGKxU27_xLtU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestType: "PASSWORD_RESET", email }),
        }
      );
      const data = await response.json();
      console.log("forgotpassword", data);
      if (data.error) {
        throw new Error(data.error.message);
      } else {
        setNote("Link send successful");
      }
      setFormData({
        email: "",
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      resetError();
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex border-2 p-4 flex-col justify-center items-center gap-4"
      >
        <p className="text-xl mb-2 p-2">Forgot Password</p>
        <p>Enter the email with which you have registered.</p>
        <input
          value={formData.email}
          onChange={handleChange}
          id="email"
          className="w-96 rounded-full px-8 p-2 text-lg border-2"
          type="text"
          placeholder="Email"
        />
        <button
          className="w-full bg-sky-500 rounded-full text-white p-1 hover:bg-sky-400"
          type="submit"
        >
          {loading ? "Sending" : "Send Link"}
        </button>
        <div
          className={`${
            error ? "border-red-500 flex" : "hidden"
          } border-2 w-[40vw]  justify-center self-center`}
        >
          {error && (
            <p className={`${error ? "flex" : "hidden"} text-red-500`}>
              {error}
            </p>
          )}
        </div>
        <div
          className={`${
            note ? "border-green-500 flex" : "hidden"
          } border-2 w-[40vw]  justify-center self-center`}
        >
          {note && (
            <p className={`${note ? "flex" : "hidden"} text-green-500`}>
              {note}
            </p>
          )}
        </div>
      </form>
      <div className="border-2 my-2 p-2 w-[40vw] flex justify-center cursor-pointer items-center bg-green-100 hover:border-green-200">
        Already a user?
        <Link className="text-blue-500" to={"/"}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
