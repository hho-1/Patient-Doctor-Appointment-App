import React, { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import useDataCall from "../../hooks/useDataCall";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from './Appomodal.jsx'
import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentCalendar = ({id}) => {

  const [showModal, setShowModal] = React.useState(false);
  const [uhrZeit, setUhrZeit] = React.useState("");
  const [appoId, setAppoId] = React.useState("");
  const [datum, setDatum] = React.useState("");

  const {getData} = useDataCall()
  const navigate = useNavigate()
  const {appointments} = useSelector((state) => state.data)                   
  const {doctors} = useSelector((state) => state.data)                   
  const {patients} = useSelector((state) => state.data)                   
  const {currentUser} = useSelector((state) => state.auth)                   
  //let currentUser = "Jessica.Yvonne11pat@site.com"
  
  let day = []
  const [appArr, setAppArr] = useState([])
  //const [appThisDoctorThisDay, setAppThisDoctorThisDay] = useState([])
  let appThisDoctorThisDay = []
 
  useEffect(() => {
    getData("appointments")
    getData("doctors")
    getData("patients")
    handleDateSelect(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   handleDateSelect(new Date()); // İlk yüklemede bugünün tarihini almak için
  // }, [getData, id]); 
  
  const thisDoc = doctors.data.filter((doc) => {return doc.id === id}) 
  const thisPatient = patients.filter((pat) => {return pat.email === currentUser}) 
  //console.log(thisPatient)
  const patientName = thisPatient[0]?.firstName + " " + thisPatient[0]?.lastName
  const patientId = thisPatient[0]?.id
  

  const doctorName = thisDoc[0]?.title+ ". " + thisDoc[0]?.firstName + " " + thisDoc[0]?.lastName
  const doctorAdress = thisDoc[0]?.street + ", " + thisDoc[0]?.zipCode/*  + thisDoc[0]?.cityId */
  //console.log(doctorName)
  

  const handleDateSelect = async (value) => {
    
    const daysArray = value.toString().split(" ").slice(0,4)
    //console.log(daysArray)
    let month=""
    
    if(daysArray[1] === "Jan") month="01"
    if(daysArray[1] === "Feb") month="02"
    if(daysArray[1] === "Mar") month="03"
    if(daysArray[1] === "Apr") month="04"
    if(daysArray[1] === "May") month="05"
    if(daysArray[1] === "Jun") month="06"
    if(daysArray[1] === "Jul") month="07"
    if(daysArray[1] === "Aug") month="08"
    if(daysArray[1] === "Sep") month="09"
    if(daysArray[1] === "Oct") month="10"
    if(daysArray[1] === "Nov") month="11"
    if(daysArray[1] === "Dec") month="12"

    day = daysArray[3]+"-"+month+"-"+daysArray[2]
    //console.log(day)
    setDatum(daysArray[3]+"-"+month+"-"+daysArray[2])

    appThisDoctorThisDay = await appointments.filter((sch) => {return sch.doctorId === id}).filter((app) => {return app.date === day})
    setAppArr(appThisDoctorThisDay)
  }
  


  const handleHourClick = (uhr, appoId) => {
    if (currentUser) {
    //console.log(uhr)
    setShowModal(true)
    setUhrZeit(uhr)
    setAppoId(appoId)
    }
    else {
      // If there is a user who is not logged in, show an error message and redirect to the login page after a certain period of time
      toast.error("Bitte melden Sie sich an, um einen Termin auswählen.");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3000 milliseconds (3 seconds)
    }
  }
  

  return <div className="appointments-calendar flex flex-col justify-center items-center">
    <Calendar className="react-calendar" defaultView="month" locale="de-DE" onChange={handleDateSelect}/>
    <div className="hour-buttons text-center h-[210px] overflow-y-scroll">
      {
        appArr?.map((app, index) => {
          return <button disabled = {app.patientId ? true :false} onClick={() => handleHourClick(app.timeStart, app.id)} className={app.patientId ? "reserved" : "free duration-150"} key={index}>{app.timeStart}</button>
          
  
        })
      }
    </div>
    <Modal showModal={showModal} setShowModal={setShowModal} doctorName={doctorName} date={datum} address={doctorAdress} uhrZeit={uhrZeit} appoId={appoId} patientName={patientName} patientId={patientId}/>
    
    
    <ToastContainer />
  </div>;
};

export default AppointmentCalendar;
