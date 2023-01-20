import React, { useEffect, useState } from 'react'
import Vehicles from '../components/Vehicles';
import { searchAvailableVehicles, getAllCompanies, getAllCities, getReservations, cancelReservation } from '../web2Communication';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ClientHomePage = () => {

    const[city, setCity] = useState();
    const[company, setCompany] = useState();
    const[startDate, setStartDate] = useState();
    const[endDate, setEndDate] = useState();
    const[availableVehicles, setAvailableVehicles] = useState([]);
    const[sortDesc, setSort] = useState(false);
    const[myReservations, setMyReservation] = useState([]);
    const[render, setRender] = useState(false);
    const navigate = useNavigate();

    function gotoInfoPageClick()
    {
        navigate("/clientInfoPage");
    }

    function daysDiff(){
        let date_1 = new Date(endDate);
        let date_2 = new Date(startDate);
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays+1;
    }

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
            //console.log(companies[i])
            
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

            //console.log(cities[i]);
        }
    }

    async function loadReservations(){
        setMyReservation([])
        let reservations = await getReservations();
        setMyReservation(reservations)
    }

    useEffect(()=>{
        loadData();
        loadReservations();
    },[])

    useEffect(()=>{
        loadReservations();
        searchFunc();
    },[render])

    useEffect(()=>{
        if(sortDesc) availableVehicles.sort((a,b)=>{if(a.pricePerDay<b.pricePerDay)return 1; return -1;})
        else availableVehicles.sort((a,b)=>{if(a.pricePerDay>b.pricePerDay)return 1; return -1;})
    }, [sortDesc])

    async function searchFunc(){
        console.log({city,company,startDate,endDate});
        let x = await searchAvailableVehicles(city,company,startDate,endDate);
        for(var i = 0; i<x.length; i++){
            console.log(x[i].model)
            x[i].startDate = startDate;
            x[i].endDate = endDate;
            x[i].companyId = company;
        }
        console.log(x);
        setAvailableVehicles(x);
    }

    async function cancel(id){
        await cancelReservation(id); 
        setRender(!render)
    }

  return (
    <div style={{textAlign:"center"}}>
        <Header></Header>
      <div style={{display:"flex", marginTop:"20px", columnGap:"20px", justifyContent:"space-around"}}>
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
            <p>StartDate:</p>
            <input type="text" onChange={(e) => setStartDate(e.target.value)} ></input>
        </div>
        <div>
            <p>EndDate:</p>
            <input type="text" onChange={(e) => setEndDate(e.target.value)} ></input>
        </div>
       
      </div>
      <div>
        <button className='searchButton' onClick={searchFunc} style={{marginRight:"30px"}}>Search</button>
        {!sortDesc? <button className='sortBtn' onClick={e=>setSort(true)}>Sort DESC<span className="iconSortDesc"></span></button>:<button className='sortBtn' onClick={e=>setSort(false)}><span className="iconSortAsc"></span> Sort ASC</button>}
        <button className='sortBtn' style={{marginLeft:"30px"}} onClick={e=>{navigate("../reviewPage")}}>Leave a review</button>
        <button className='searchButton' onClick={gotoInfoPageClick} style={{marginRight:"30px", marginLeft:"30px"}}>Go to info page</button>
      </div>
      <div style={{display:"flex", justifyContent:"space-around"}}>
        <div style={{width:"60%"}}>
            <Vehicles vehicles={availableVehicles} dayDiff={daysDiff()} render={render} setRender={setRender}></Vehicles>
        </div>
        <div style={{width:"20%"}}>
            {
            myReservations.map((item,ind) => {
                return (
                  <div key={ind} style={{border:"3px solid green", borderRadius:"8px", width:"100%", position:"relative", marginTop:"20px"}}>
                        <h2>Resevation #{item.id}</h2>
                        <div style={{display:"flex", overflow:"hidden", marginLeft:"10px", marginBottom:"10px"}}>
                            <p>Vehicle:</p>
                            <h3 style={{fontSize:"16px", marginLeft:"10px"}}>{item.vehicle.brand} {item.vehicle.model}</h3>
                        </div>
                        <div style={{display:"flex", overflow:"hidden", marginLeft:"10px", marginBottom:"10px"}}>
                            <p>From:</p>
                            <h3 style={{fontSize:"16px", marginLeft:"10px"}}>{item.startDate}</h3>
                        </div>

                        <div style={{display:"flex", overflow:"hidden", marginLeft:"10px", marginBottom:"10px"}}>
                            <p>To:</p>
                            <h3 style={{fontSize:"16px", marginLeft:"10px"}}>{item.endDate}</h3>
                        </div>

                        <div style={{display:"flex", overflow:"hidden", marginLeft:"10px", marginBottom:"10px"}}>
                            <p>Total price:</p>
                            <h3 style={{fontSize:"16px", marginLeft:"10px"}}>{item.totalPrice} eur</h3>
                        </div>

                        <div style={{position:"absolute", bottom:"10px", right:"2px"}}>
                            <button className='cancelReservationBtn' onClick={e=>cancel(item.id)}>Cancel reservation</button>
                        </div>

                  </div>
                );
                })}
        </div>
      </div>
      

        
    </div>
  )
}

export default ClientHomePage