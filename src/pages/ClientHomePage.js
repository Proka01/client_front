import React, { useEffect, useState } from 'react'
import Vehicles from '../components/Vehicles';
import { searchAvailableVehicles, getAllCompanies } from '../web2Communication';

const ClientHomePage = () => {

    const[city, setCity] = useState();
    const[company, setCompany] = useState();
    const[startDate, setStartDate] = useState();
    const[endDate, setEndDate] = useState();
    const[availableVehicles, setAvailableVehicles] = useState([]);


    function daysDiff(){
        let date_1 = new Date(endDate);
        let date_2 = new Date(startDate);
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    async function loadData(){

        let companySelect = document.getElementById("companySelect");
        

        let x = await getAllCompanies();
        for (var i = 0; i < x.length; i++) {
            let option = document.createElement("option");
            option.setAttribute('value', x[i]["id"]);

            let optionText = document.createTextNode(x[i]["name"]);
            option.appendChild(optionText);

            companySelect.appendChild(option);
            console.log(x[i])
            //Do something
        }
    }

    useEffect(()=>{
        loadData();
    },[])

    async function searchFunc(){
        console.log({city,company,startDate,endDate});
        let x = await searchAvailableVehicles(city,company,startDate,endDate);
        console.log(x);
        setAvailableVehicles(x);
    }

  return (
    <div style={{textAlign:"center"}}>
      <div style={{display:"flex", marginTop:"20px", columnGap:"20px", justifyContent:"space-around"}}>
        <div>
            <p>City:</p>
            <input type="text" onChange={(e) => setCity(e.target.value)} ></input>
        </div>
        <div>
            <p>Company:</p>
            <select id='companySelect' onChange={(e) => setCompany(e.target.value)} defaultValue={'DEFAULT'}>
                <option disabled value={"DEFAULT"}>Choose company</option>
            </select>
        </div>
        <div>
            <p>StartDate:</p>
            <input type="text" onChange={(e) => setStartDate(e.target.value)} ></input>
        </div>
        <div>
            <p>EndDate:</p>
            <input type="text" onChange={(e) => setEndDate(e.target.value)} ></input>
        </div>
       
      </div>
      <div>
        <button className='searchButton' onClick={searchFunc}>Search</button>
      </div>

      <Vehicles vehicles={availableVehicles} dayDiff={daysDiff()}></Vehicles>

        
    </div>
  )
}

export default ClientHomePage