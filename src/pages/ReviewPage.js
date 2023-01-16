import React, { useState, useEffect } from 'react';
import { createReview, getAllCities, getAllCompanies, getAllReviews, getAverageRatings, getReservationsNotReviewed } from '../web2Communication';
import ProbaPage from './ProbaPage';

const ReviewPage = () => {
  const[city,setCity] = useState();

  const[company,setCompany] = useState();

  const[allReviews, setAllReviews] = useState([]); 
  const[ratings, setRatings] = useState([]);
  const[NotReviewed, setNotReviewed] = useState([]);
  const[selectedReservation, setSelectedReservation] = useState({});

  async function loadData(){

    let companySelect = document.getElementById("companySelect");
    let citySelect = document.getElementById("citySelect");
    

    let companies = await getAllCompanies();
    while (companySelect.options.length > 1) {
        companySelect.remove(companySelect.length-1);
      }
      
    for (var i = 0; i < companies.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', companies[i]["id"]);

        let optionText = document.createTextNode(companies[i]["name"]);
        option.appendChild(optionText);

        companySelect.appendChild(option);        
    }

    let cities = await getAllCities();
    while (citySelect.options.length > 1) {
        citySelect.remove(citySelect.length-1);
    }
      
    for(var i = 0; i<cities.length; i++){
        let option = document.createElement("option");
        option.setAttribute('value', cities[i]);

        let optionText = document.createTextNode(cities[i]);
        option.appendChild(optionText);

        citySelect.appendChild(option);
    }

    let rating = await getAverageRatings();
    setRatings(rating);
    //console.log(ratings);

    let notReviewed = await getReservationsNotReviewed();
    setNotReviewed(notReviewed);
    let reservationSelect = document.getElementById("reservationSelect");
    while (reservationSelect.options.length > 1) {
      reservationSelect.remove(reservationSelect.length-1);
    }
    for(var i = 0; i<notReviewed.length; i++){
      console.log(notReviewed[i])
      let option = document.createElement("option");
      option.setAttribute('value', i);

      let optionText = document.createTextNode(notReviewed[i]["id"]);
      option.appendChild(optionText);

      reservationSelect.appendChild(option);
    }


    //console.log(notReviewed);
  }

  async function searchReviews(){
    //console.log({city, company})
    let reviews = await getAllReviews(company, city);
    if(reviews!=undefined)setAllReviews(reviews);
    //console.log(reviews);
  }

  function changeSelectedReservation(reservationInd){
    let res = NotReviewed[reservationInd];
    setSelectedReservation(res);
    console.log(NotReviewed[reservationInd]);
    let lbl = document.getElementById("infoReservationLabel");
    lbl.innerHTML = 'Info: ' + res.vehicle.brand + ' ' +res.vehicle.model + ' from ' + res.startDate + ' to ' + res.endDate;

  }

  async function sendReview(){
    let rating = document.getElementById("ratingInput").value;

    let comment = document.getElementById("commentInput").value;

    if(selectedReservation.id!=undefined && comment){
      console.log({selectedReservation, comment, rating})
      let response = await createReview(selectedReservation.id, rating, comment);
      if(response["message"]!=undefined && response["message"].includes("Successfully")){
        alert("Successfully created review");
        loadData();
      }
    }
  }


useEffect(()=>{
  loadData();
},[])


  return (
    <div>
       <h1 style={{ marginTop:"10px", textAlign:"center", fontSize:"40px"}}>Review Page</h1>

       <div style={{display:"flex", marginTop:"30px"}}>

          <div style={{width:"40%"}}>
            <div style={{width:"100%", display:"flex", justifyContent:"space-evenly"}}>
              <div>
                <p>City:</p>
                <select id='citySelect' onChange={(e) => setCity(e.target.value)} defaultValue={'DEFAULT'} style={{width:"200px", height:"45px", padding:"10px 15px"}}>
                    <option disabled value={"DEFAULT"}>Choose city</option>
                </select>
              </div>
              <div>
                <p>Company:</p>
                <select id='companySelect' onChange={(e) => setCompany(e.target.value)} defaultValue={'DEFAULT'} style={{width:"200px", height:"45px", padding:"10px 15px"}}>
                    <option disabled value={"DEFAULT"}>Choose company</option>
                </select>
              </div>
              <div>
                <button className='reviewSearchButton' onClick={searchReviews} style={{borderRadius:"10px"}}>Search</button>
              </div>
            </div>
            <div style={{width:"100%", textAlign:"center"}}>
            {
            allReviews.map((item,ind) => {
              return (
                  <div key={ind} style={{border:"4px solid green", borderRadius:"16px", marginTop:"20px", width:"80%",
                   marginLeft:"auto", marginRight:"auto", overflow:"hidden"}}>
                    <h1>Review #{item.id}</h1>
                    <div style={{display:"flex", justifyContent:"space-around", marginTop:"10px"}}>
                      <h2>Company: {item.reservation.company.name}</h2>
                      <h2>Vehicle: {item.reservation.vehicle.brand +" "+item.reservation.vehicle.model}</h2>
                    </div>
                    <p style={{marginTop:"10px", fontSize:"20px"}}>Comment: {item.comment}</p>   
                    <h3 style={{marginTop:"10px",marginRight:"24px", marginBottom:"10px" ,fontSize:"20px", float:"right"}}>Rating: {item.rating}*</h3>                  
                  </div>
                );
              })}
            </div>
          </div>
          
          <div style={{width:"30%", marginLeft:"3%"}}>
          <div>
              <h2>Leave a review</h2>
              <div style={{display:"flex", marginTop:"20px"}}>
                  <h3 style={{marginLeft:"0px", marginTop:"auto", marginBottom:"auto"}}>Select reservation:</h3>
                  <select id='reservationSelect' onChange={(e) => changeSelectedReservation(e.target.value)} defaultValue={'DEFAULT'} style={{marginLeft:"30px",height:"45px", padding:"10px 15px"}}>
                    <option disabled value={"DEFAULT"}>Choose reservation</option>
                  </select>
              </div>
              <label id='infoReservationLabel' style={{display:"block", marginTop:"20px", fontStyle:"italic"}}>{}</label>
              <div style={{display:"flex", marginTop:"20px"}}>

                <input id='commentInput' type={'text'} style={{display:"block", width:"295px"}} placeholder={"Enter comment"}></input>
                <input id='ratingInput' defaultValue={1} type={'number'} min={1} max={5} style={{marginLeft:"20px"}}></input>

              </div>
              
              <button className='reviewSendButton' onClick={sendReview}>Send review </button>
            </div>
          </div>

          <div style={{width:"20%", height:"100px" ,  textAlign:"center", marginLeft:"2%"}}>
            <h2>Average rating</h2>
          {
            ratings.map((item,ind) => {
              return (
                  <div key={item.company.name} style={{borderBottom:"2px solid green", display:'flex', justifyContent:"space-around", marginTop:"20px"}}>
                      <div><p>Company: </p><h3>{item.company.name}</h3></div>
                      <div><p>Average: </p><h3>{item.avg}*</h3></div>
                  </div>
                );
              })}
          </div>

       </div>
    </div>
  )
}

export default ReviewPage