import React, { useState, useEffect } from 'react';
import { getAllCities, getAllCompanies, getAllReviews } from '../web2Communication';

const ReviewPage = () => {
  const[city,setCity] = useState();

  const[company,setCompany] = useState();

  const[allReviews, setAllReviews] = useState([]); 

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
}

  async function searchReviews(){
    console.log({city, company})
    let reviews = await getAllReviews(company, city);
    setAllReviews(reviews);
    //console.log(reviews);
  }
useEffect(()=>{
  loadData();
},[])


  return (
    <div>
       <h1>Review Page</h1>

       <div style={{display:"flex"}}>
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
                  <div style={{border:"4px solid green", borderRadius:"16px", marginTop:"20px", width:"80%",
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
          
          <div style={{width:"50%", height:"100px" , backgroundColor:"blue"}}>

          </div>
       </div>
    </div>
  )
}

export default ReviewPage