import React from 'react'
import Sidebar from '../../components/doctor/Sidebar'
import Symptom from '../../components/doctor/Symptom'
import DoctorProfil from '../../components/doctor/ProfilDoctor'
import AppointmentCalendar from '../../components/doctor/AppointmentCalendar'
import AboutDoctor from '../../components/doctor/AboutDoctor'

import "../../components/doctor/DoctorPages.css"

const DetailDoctor = () => {
  return (
    <div className="grid grid-rows-5 grid-cols-8">
      <div className="row-span-5 col-span-1"><Sidebar/></div>
      <div className="row-span-1 col-span-7"><Symptom/></div>
      <div className="row-span-4 col-span-2"><DoctorProfil/></div>
      <div className="row-span-4 col-span-3"><AppointmentCalendar/></div>
      <div className="row-span-4 col-span-2"><AboutDoctor/></div>
      
    </div>
  )
}

export default DetailDoctor