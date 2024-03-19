import React from 'react'
import bgRegister from '../images/Register.png'

const Register = () => {
  return (
    <div className ="grid grid-cols-2 px-4 font-special items-center h-screen overflow-hidden bg-gradient-to-r from-purple-dark to-red-deep">
      <title>BITU3973 | Register</title>
      <div className='text-white'>
        <h1><b>Register</b></h1> 
        <p>Sign up a new account now!</p>
      </div>
      <div>
        <img src={bgRegister} alt ="Sign Up img" className=' w-screen'/>
      </div>
    </div>
  )
}

export default Register