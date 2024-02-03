import './App.css'
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className='h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
