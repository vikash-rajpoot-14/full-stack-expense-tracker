import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../App';


function Header() {
  const navigate = useNavigate();
  const Ctx = useContext(context);

  const handleSignOut = async (e) => {
    e.preventDefault();
    Ctx.setToken(null);
     Ctx.setUser(null);
    navigate("/")
  }

  return (
    <header className='bg-slate-200 shadow-md sticky top-0'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Expense</span>
          <span className='text-slate-700'>Tracker</span>
        </h1>
        </Link>
        <ul className='flex gap-4'>
          {Ctx.User &&
            <img
              className='rounded-full h-7 w-7 object-cover'
              src={Ctx.User?.profilePicture}
              alt='profile'
            />
          }
          {Ctx.User ? <li onClick={handleSignOut} className='hover:cursor-pointer text-slate-700 hover:underline'> Sign Out</li> : (
            <div className='flex gap-8'>
              <Link to='/signup'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  Sign Up
                </li>
              </Link>
              <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  Sign In
                </li>
              </Link>
            </div>
            )}
        </ul>
      </div>
    </header>
  )
}

export default Header
