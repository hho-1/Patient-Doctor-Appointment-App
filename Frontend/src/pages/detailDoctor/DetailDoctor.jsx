import React, { useEffect } from 'react'
import Sidebar from '../../components/doctor/Sidebar'
import Symptom from '../../components/doctor/Symptom'
import DoctorProfil from '../../components/doctor/ProfilDoctor'
import AppointmentCalendar from '../../components/doctor/AppointmentCalendar'
import AboutDoctor from '../../components/doctor/AboutDoctor'

import "../../components/doctor/DoctorPages.css"
import useDataCall from '../../hooks/useDataCall'
import { useSelector } from 'react-redux'

const DetailDoctor = () => {

  const {getData} = useDataCall()
  const {doctors} = useSelector((state)=>state.data)
  let doctor_id = "65b257cf1cb1cfeca6da7e27"


  const thisDoctor = doctors?.data?.filter((item, i) => {return item.id === doctor_id})
  //console.log(thisDoctor)

  useEffect(() => {
    
    getData("doctors")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  return (
    <>
    {
      !thisDoctor?.length ? (<p>Loading...</p>) : (
        <div className="grid grid-rows-5 grid-cols-8 w-100">
          <div className="row-span-5 col-span-1"><Sidebar/></div>
          <div className="row-span-1 col-span-7"><Symptom/></div>
          <div className="row-span-4 col-span-2"><DoctorProfil  {...thisDoctor[0]}/></div>
          <div className="row-span-4 col-span-3"><AppointmentCalendar/></div>
          <div className="row-span-4 col-span-2"><AboutDoctor {...thisDoctor[0]}/></div>
    
    </div>
      )
    }
    </>
  )
  
}

export default DetailDoctor