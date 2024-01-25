import React, { useEffect } from 'react'
import useDataCall from '../../hooks/useDataCall'
import { useSelector } from 'react-redux'


const DoctorProfil = () => {

  const {getData} = useDataCall()
  const myData = useSelector((state)=>state.data)
  //const {doctor_id} = useParams()                     //Bu sayfada doctor id parametreden alinmali

  //console.log(doctor_id)
  let doctor_id = "65b2357172eae03f1e0f5294"       //örnek bir tane

  useEffect(() => {
    getData("doctors")
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(myData)

  const doctorData = myData.doctors.data
  console.log(doctorData)

  const thisDoctor = doctorData.filter((doct) => doct.id === doctor_id)
  console.log(thisDoctor[0].branchId.name)

  // const cityData = myData.cities
  // console.log(myData.cities)
  // const thisCity = cityData.filter((cit) => cit._id === thisDoctor[0].cityId)
  // const thisCityName = thisCity[0].name

  useEffect(() => {

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='text-center flex flex-col justify-center items-center'>
      <img className='doctor-image' src='https://www.thewmch.com/wp-content/uploads/2023/02/female-doctor-using-her-digital-tablet-free-vector.jpg' alt="doctor-pic"/>
      <h1 className='text-xl font-bold doctor-profil-name'>{thisDoctor[0].title}. {thisDoctor[0].firstName} {thisDoctor[0].lastName}</h1>
      <h2 className='text-xl doctor-profil-name'>{thisDoctor[0].branchId.name}</h2>
      <div className='flex justify-between doctor-profil-location'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <h3>{thisDoctor[0].cityId.name}</h3>
      </div>
      <div className='flex justify-between doctor-profil-phone'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>

        <h3>{thisDoctor[0].phone}</h3>
      </div>
      <div className='flex justify-between doctor-profil-website'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <a href="www.example.com">{thisDoctor[0].website}</a>
      </div>
      <button className='termin-button duration-150'>TERMIN VEREINBAREN</button>
      
    </div>
  )
}

export default DoctorProfil