import React from 'react'

import './auth.css'
import RegisterPatientForm from '../../components/authForm/RegisterPatientForm'
import image from "../../assets/register.png"

const RegisterDoctor = () => {

  
  return (
    <div className="grid grid-cols-2 register-page">
      {/* Left side (Image) */}
      <div className="block m-auto ">
        <img
          //style={{ width: '700px', height: '700px' }}
          src={image}
          alt='Register'
        />
      </div>
      <div>
       <RegisterPatientForm />
      </div>
      
      
    </div>
  )
}

export default RegisterDoctor
