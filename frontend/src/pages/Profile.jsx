import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

function Profile() {
  const [form, setForm] = useState({ name: "", image: "" });
  const [error, setError] = useState(null);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  console.log("user", user);

  //   console.log("error", error);
  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const resetError = () => {
    setTimeout(() => {
      setError(null);
      setNote(null);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, image } = form;
      if (name.trim().length == 0 || image.trim().length == 0) {
        throw new Error("Please fill all fields");
      }
      const idToken = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8T2tJrMoX-NMazsfAm00AGKxU27_xLtU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ displayName: name, idToken, photoUrl: image }),
        }
      );
      const data = await response.json();
      //   console.log("update", data);

      if (data.error) {
        throw new Error(data.error.message);
      } else {
        setNote("Update successful");
      }
      setForm({
        image: "",
        name: "",
      });
      setLoading(false);
      // navigate("/home")
      resetError();
    } catch (error) {
      setError(error.message);
      setLoading(false);
      resetError();
    }
  };

  const handleverify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const idToken = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8T2tJrMoX-NMazsfAm00AGKxU27_xLtU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestType: "VERIFY_EMAIL", idToken }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      } else {
        setNote("Verification code sent");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);

    }
  };

  useEffect(() => {
    const idToken = JSON.parse(localStorage.getItem("token"));
    try {
        setLoading(true);
      async function getUser() {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8T2tJrMoX-NMazsfAm00AGKxU27_xLtU",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          }
        );
        const data = await response.json();
        setUser(data.users[0]);
        setForm({
          image: data.users[0].photoUrl,
          name: data.users[0].displayName,
        });
      }
      getUser();
      setLoading(false)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-4 p-4 border-b-2">
        <i>Winner never quit Quitter never wins!!</i>
        <i className="md:w-96 w-auto bg-amber-800 text-white rounded-md px-2">
          Your Profile is <i className="font-semibold">64%</i> completed. A
          complete profile has higher chances of landing a job .
          <Link to={"/profile"} className="mx-2 text-blue-500">
            complete now
          </Link>
        </i>
      </div>

      <div className="w-[80vw] box-border self-end m-2">
        <div className="flex justify-between mx-4 px-4 items-center ">
          <h2 className="font-semibold">Verify Email</h2>
          <button
            disabled={user?.emailVerified}
            className={`${
              user?.emailVerified
                ? "bg-orange-900 text-white hover:bg-orange-800"
                : "border-orange-800 text-orange-900 hover:bg-orange-800 hover:text-white"
            } p-1 px-2 border-2 rounded-md`}
            onClick={handleverify}
          >
            {user?.emailVerified && !loading ? "verified": loading ? "verifing":"verify"}
          </button>
        </div>
        <p className="border-b-2 m-2 "></p>
        <div className="mx-4 flex p-4 justify-between items-center">
          <h2 className="font-semibold text-lg">Contact Details</h2>
          <button className="bg- p-1 px-2 text-orange-900 border-2 border-orange-800 rounded-md">
            Cancel
          </button>
        </div>
        <form className="text-center " onSubmit={handleSubmit}>
          <div className="flex-col md:flex-row flex justify-center gap-16 p-2 items-center">
            <div className="flex gap-2 items-center">
              <FaGithub />
              <div className="flex w-auto">
                <label htmlFor="name">Full Name:</label>
                <input
                  value={form?.name}
                  onChange={handleChange}
                  placeholder="name..."
                  id="name"
                  type="text"
                  className="ml-12 px-4 border-2 w-96"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <CiGlobe />
              <div className="flex  w-auto">
                <label htmlFor="image">Profile Photo URL:</label>
                <input
                  value={form?.image}
                  onChange={handleChange}
                  placeholder="image..."
                  id="image"
                  type="text"
                  className="ml-12 px-4 border-2 w-96"
                />
              </div>
            </div>
          </div>
          <div className="relative right-[36vw]">
            <button
              className="bg-orange-800 text-white  p-1 px-2 rounded-md"
              type="submit"
            >
              Update
            </button>
          </div>
          <p className="border-b-2 m-2 "></p>
        </form>
      </div>
      <div
        className={`${
          error ? "border-red-500 flex" : "hidden"
        } border-2 w-[60vw]  justify-center self-center`}
      >
        {error && (
          <p className={`${error ? "flex" : "hidden"} text-red-500`}>{error}</p>
        )}
      </div>
      <div
        className={`${
          note ? "border-green-500 flex" : "hidden"
        } border-2 w-[60vw]  justify-center self-center`}
      >
        {note && (
          <p className={`${note ? "flex" : "hidden"} text-green-500`}>{note}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
