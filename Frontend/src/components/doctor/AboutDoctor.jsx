import React, { useEffect } from 'react'
import useDataCall from '../../hooks/useDataCall'

const AboutDoctor = ({about, languages}) => {

  const {getData} = useDataCall()
  


  useEffect(() => {
    getData("doctors")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='about-doctor flex flex-col justify-center items-center text-center'>
      <h1 className='text-xl uber-mich font-bold'>Über mich</h1>
      <p className='text-md mt-3'>
        {about}
      </p>
      <button className='text-lg'>Sprachen: Deutsch, {languages.map((lang) => lang, ",")}</button>

    </div>
  )
}

export default AboutDoctor