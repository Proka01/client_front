import React from 'react'
import { createReservation } from '../web2Communication'

const Vehicle = ({car, dayDiff, render, setRender}) => {

  async function makeReservation(){
    console.log(car.id,car.startDate,car.endDate,car.companyId)
    let response = await createReservation(car.id,car.startDate,car.endDate, car.companyId, localStorage.getItem("Token"));
    console.log(String(localStorage.getItem("Token")))
    console.log("response :" + response);
    setRender(!render)
  }

  return (
    <div className='vehicle' style={{width:"100%", marginLeft:"auto", marginRight:"auto", marginTop:"80px"}}>
        <div><h1>{car.brand + " " + car.model}</h1></div>
        <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"20px", marginBottom:"20px"}}>
            <div style={{width:"50%"}}>
                <p style={{fontSize:"24px"}}>{car.vehicleType.type}</p>
                <p style={{marginTop:"20px", fontSize:"12px"}}>{car.vehicleType.description}</p>
            </div>
            <div>
                <h2>Price: {dayDiff*car.pricePerDay} eur</h2>
                <button className='reservationButton' style={{marginTop:"20px"}} onClick={makeReservation}>Make reservation</button>
            </div>
        </div>
    </div>
  )
}

export default Vehicle