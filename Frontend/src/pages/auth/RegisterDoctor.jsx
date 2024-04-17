import React from 'react'

import './auth.css'
import RegisterDoctorForm from '../../components/authForm/RegisterDoctorForm'
import image from "../../assets/register.png"
import Header from '../../components/header/Header'

const RegisterDoctor = () => {

  
  return (
    <>
    <Header/>
    <div className="h-[100vh] grid grid-rows-7 md:grid-cols-2 register-page pt-[75px]">
      <div className="block row-span-2 md:grid-cols-1">
        <div className='md:h-[90vh] md:flex md:flex-col md:items-center md:justify-center'>
          <img
            src={image}
            alt='Register'  
          />
        </div>
        
      </div>
      <div className='row-span-5 md:grid-cols-1 mt-3'>
       <RegisterDoctorForm />
      </div>
      
      
    </div>
    </>
    
  )
}

export default RegisterDoctor
