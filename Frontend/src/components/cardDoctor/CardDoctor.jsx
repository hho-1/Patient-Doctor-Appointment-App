import React from 'react'
import "./cardDoctor.css"
import doctorImage from './assets/doctor.png'
import starIcon from './assets/star.png'
const CardDoctor = ({address, title, firstName, lastName, zipCode}) => {
  return (
    <div className='cardDoctor'>
      <div className="doctorImage">
        <img src={doctorImage} alt="doctorImage" />
      </div>
      <div className="doctorInfo">

        <div className="doctor-middleInfo">
          <div className="doctorName">
            <h2><span>{title}.</span>  {firstName} {lastName}</h2>
            <h3>Kinderarzt</h3>
            <p><span>Adresse: </span>{address.split(" ").slice(0, 2).join(" ")}, {zipCode}</p>
          </div>

          <div className="doctorRate">
            <div className="starRate">
              <img src={starIcon} alt="" />
              <p>4.9</p>
            </div>
            <p> <span>5</span> Jahre Erfahrung</p>

          </div>
        </div>

        <button className="doctor-info-btn">MEHR INFOS</button>
      </div>


    </div>
  )
}

export default CardDoctor