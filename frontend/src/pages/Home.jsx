import React from 'react'
import { Link } from 'react-router-dom'

function Home() {



  return (
    <div>
    <div className='flex justify-between items-center p-4 border-b-2'>
    <i>Welcome to Expense Tracker App!!!</i>
    <i className='bg-amber-800 text-white  rounded-md px-2'>Your profile is incomplete . <Link to={"/profile"} className='text-blue-500'>complete now</Link></i>
    </div>
  
    </div>
      
  )
}

export default Home
