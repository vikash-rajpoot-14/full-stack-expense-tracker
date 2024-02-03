import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
const [user,setUser] = useState([])
const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [note, setNote] = useState(null);

 
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
