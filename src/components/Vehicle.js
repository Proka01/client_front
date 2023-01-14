import React from 'react'

const Vehicle = ({car, dayDiff}) => {
  return (
    <div className='vehicle' style={{width:"50%", marginLeft:"auto", marginRight:"auto", marginTop:"80px"}}>
        <div><h1>{car.brand + " " + car.model}</h1></div>
        <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"20px", marginBottom:"20px"}}>
            <div style={{width:"50%"}}>
                <p style={{fontSize:"24px"}}>{car.vehicleType.type}</p>
                <p style={{marginTop:"20px", fontSize:"12px"}}>{car.vehicleType.description}</p>
            </div>
            <div>
                <h2>Price: {dayDiff*car.pricePerDay} eur</h2>
                <button className='reservationButton' style={{marginTop:"20px"}}>Make reservation</button>
            </div>
        </div>
    </div>
  )
}

export default Vehicle