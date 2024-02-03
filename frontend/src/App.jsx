import { createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const context = createContext(null);

function App() {
  const [token, setToken] = React.useState(null);
  const [User, setUser] = React.useState(null);
  
  return (
    <context.Provider value={{token, setToken, User, setUser}}>
      <div className="h-screen">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </context.Provider>
  );
}

export default App;
