import React from 'react'

function SignUp() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="confirmpass" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
