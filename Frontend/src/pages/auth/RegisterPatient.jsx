import React from 'react'

import './auth.css'
import RegisterPatientForm, { registerSchema } from '../../components/authForm/RegisterPatientForm'
import image from "../../assets/register.png"
import { Formik } from "formik"
import useAuthCall from '../../hooks/useAuthCall'

const RegisterDoctor = () => {

  const { regPatient } = useAuthCall()
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
      <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              regPatient({ ...values, password2: values.password })
              actions.resetForm()
              actions.setSubmitting(false)
            }}
            component={(props) => <RegisterPatientForm {...props} />}
          ></Formik>
      </div>
      
      
    </div>
  )
}

export default RegisterDoctor
