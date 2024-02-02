import React from 'react'

function SignUp() {
  return (
    <div>
      <form className='flex border-2 p-4 flex-col justify-center items-center gap-4'>
        <p className='text-xl mb-2 p-2'>SignUp</p>
        <input className='px-8 p-2 text-lg border-2' type="text" placeholder="Email" />
        <input className='px-8 p-2 text-lg border-2' type="password" placeholder="Password" />
        <input className='px-8 p-2 mb-4 text-lg border-2' type="confirmpass" placeholder="Confirm Password" />
        <button className='w-full mb-4 bg-sky-500 rounded-full text-white p-1' type="submit">Sign Up</button>
      </form>
      <div className='border-2 my-2 p-2 flex justify-center cursor-pointer items-center bg-green-100 hover:border-green-200'>Have an account?Login</div>
    </div>
  )
}

export default SignUp
