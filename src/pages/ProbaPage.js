import React from 'react'
import { useState, useEffect } from 'react';
import { getReservationsNotReviewed } from '../web2Communication';

const ProbaPage = () => {
    const[selectedReservation, setSelectedReservation] = useState({});

    async function loadData(){

        let notReviewed = await getReservationsNotReviewed();
        let reservationSelect = document.getElementById("reservationSelect");
        while (reservationSelect.options.length > 1) {
        reservationSelect.remove(reservationSelect.length-1);
        }
        for(var i = 0; i<notReviewed.length; i++){
        let option = document.createElement("option");
        option.setAttribute('value', notReviewed[i]["id"]);

        let optionText = document.createTextNode(notReviewed[i]["id"]);
        option.appendChild(optionText);

        reservationSelect.appendChild(option);
        }
        console.log(notReviewed);
    }


  return (
    <div>
    <h2>Leave a review</h2>
    <div style={{display:"flex", marginTop:"20px"}}>
        <h3 style={{marginLeft:"0px", marginTop:"auto", marginBottom:"auto"}}>Select reservation:</h3>
        <select id='reservationSelect' onChange={(e) => console.log(e.target.value)} defaultValue={'DEFAULT'} style={{marginLeft:"30px",height:"45px", padding:"10px 15px"}}>
          <option disabled value={"DEFAULT"}>Choose reservation</option>
        </select>
    </div>
    <label style={{display:"block"}}>prokic</label>
    <button>Send review </button>
  </div>
  )
}

export default ProbaPage