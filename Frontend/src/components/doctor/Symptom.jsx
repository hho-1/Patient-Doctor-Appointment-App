import React from 'react'

const Symptom = () => {
  return (
    <div className='sypmtoms h-32 text-center'>
      <p className='text-xl symptoms-title font-bold'>Leistungsspektrum und behandelte Symptome</p>
      <span className='symptom-buttons text-lg'>Kopfschmerzen</span>
      <span className='symptom-buttons text-lg'>Zahnschmerzen</span>
      <span className='symptom-buttons text-lg'>Fieber</span>
      <span className='symptom-buttons text-lg'>Schwindelgefühl</span>
      <span className='symptom-buttons text-lg'>Erkältung</span>
    </div>
  )
}

export default Symptom