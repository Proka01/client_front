import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { addVehicleToCompany, deleteCompanyVehicle, getAllTypes, getCompanyInfo, getCompanyVehicles, updateCompanyInfo, updateCompanyVehicle } from '../web2Communication'

const ManagerHomePage = () => {

  const [company, setCompany] = useState({name:''});
  const [newVehicleType, setNewVehicleType] = useState();
  const [companyVehicles, setCompanyVehicles] = useState([]);
  const navigate = useNavigate();

  function gotoInfoPageClick()
    {
        navigate("/managerInfoPage");
    }

  async function loadData(){
    let companyL = await getCompanyInfo();
    setCompany(companyL);
    let input = document.getElementById("numOfVehiclesInput");
    input.value = companyL.numberOfVehicle + " vehicles";
    //console.log(company);

    let types = await getAllTypes();
    let typeSelect = document.getElementById("typeSelect");

    while (typeSelect.options.length > 1) {
      typeSelect.remove(typeSelect.length-1);
    }
    
    for (var i = 0; i < types.length; i++) {
      let option = document.createElement("option");
      option.setAttribute('value', types[i]["id"]);

      let optionText = document.createTextNode(types[i]["type"]);
      option.appendChild(optionText);

      typeSelect.appendChild(option);
      //console.log(companies[i])
    }

    let vehicles = await getCompanyVehicles();
    setCompanyVehicles(vehicles);
    input.value = vehicles.length;
    //console.log(vehicles);

  }

  async function addVehicle(){
    let model = document.getElementById("modelInput").value;
    let brand = document.getElementById("brandInput").value;
    let registration = document.getElementById("registrationInput").value;
    let price = parseInt(document.getElementById("priceInput").value);


    if(model && brand && registration && price && newVehicleType!=undefined){
      console.log({model,brand,registration,price,newVehicleType})
      let response = await addVehicleToCompany(model,brand,registration,newVehicleType,price);
      if(response["message"]!=undefined && response["message"].includes("Successfully")){
        console.log("Success" + response);
        loadData();
      }
    }

  }

  async function deleteVehicle(vehicle){
    console.log(vehicle.id);
    let response = await deleteCompanyVehicle(vehicle.id);

    if(response["message"]!=undefined && response["message"].includes("Successfully")){
      console.log("Success" + response);
      loadData();
    }
  }

  async function updateVehicle(vehicle){
    let model = document.getElementById(vehicle.id+"ModelInput").value;

    let brand = document.getElementById(vehicle.id+"BrandInput").value;

    let registration = document.getElementById(vehicle.id+"RegistrationInput").value;

    let price = document.getElementById(vehicle.id+"PriceInput").value;

    console.log({model,brand,registration,price})

    if(model && brand && registration && price){
      console.log({model,brand,registration,price})
      let response = await updateCompanyVehicle(vehicle.id, model,brand,registration,price);
      
      if(response["message"]!=undefined && response["message"].includes("Successfully")){
        console.log("Success" + response);
        loadData();
      }
    }

  }

  async function updateInfo(){
    let name = document.getElementById("nameInput").value;
    if(!name) name = company.name;
    let description = document.getElementById("descriptionInput").value;
    if(!description) description = company.description;
    let response = await updateCompanyInfo(name,description);
    if(response!=undefined){
      document.getElementById("infoLabel").style.visibility = "visible";
      loadData();
      setTimeout(function(){
        document.getElementById("infoLabel").style.visibility = 'hidden';
      },3000)
    }
  }
  

  useEffect(()=>{
    loadData();
  },[])

  return (
    <div style={{textAlign:"center"}}>
      <Header></Header>
      <div>
        <h1 style={{marginTop:"20px"}}>Update company info</h1>
        <div style={{display:"flex", marginTop:"20px", columnGap:"20px", justifyContent:"space-around"}}>
          <div style={{width:"25%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"24px"}}>Company name:</p>
                <h2>{company.name}</h2>
              </div>
              <input id='nameInput' className='infoInput' placeholder={"Enter new company name"}></input>
          </div>
          <div style={{width:"25%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"24px"}}>Description:</p>
                <h2>{company.description}</h2>
              </div>
              <input id='descriptionInput' className='infoInput' placeholder={"Enter new company description"}></input>
          </div>
          <div style={{width:"25%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"24px"}}>Number of vehicles:</p>
              </div>
              <input id='numOfVehiclesInput' className='infoInput' readOnly disabled></input>
          </div>
        </div>
        <div >
          <button className='updateBtn' style={{marginLeft:"16%"}} onClick={updateInfo}>Update</button>
          <button className='searchButton' onClick={gotoInfoPageClick} style={{marginRight:"30px", marginLeft:"30px"}}>Go to info page</button>
          <label style={{marginLeft:"30px", fontSize:"24px", color:"green", visibility:"hidden"}} id="infoLabel">
            Succesfully updated!
          </label>
        </div>
      </div>
      

      <div style={{marginTop:"20px"}}>
        <h1>Add vehicle</h1>
        <div style={{display:"flex", marginTop:"20px", columnGap:"20px", justifyContent:"space-around"}}>
          <div style={{width:"15%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Model:</p>
              </div>
              <input className='infoInput' id='modelInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          <div style={{width:"15%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Brand:</p>
              </div>
              <input className='infoInput' id='brandInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          <div style={{width:"15%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Registration:</p>
              </div>
              <input className='infoInput' id='registrationInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          <div style={{width:"15%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Price per day:</p>
              </div>
              <input className='infoInput' id='priceInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          
          <div style={{width:"15%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Vehicle type:</p>
              </div>
              <select id='typeSelect' className='infoInput' onChange={(e) => {setNewVehicleType(e.target.value); }} defaultValue={'DEFAULT'} style={{width:"100%", height:"45px", fontSize:"16px"}}>
                <option disabled value={"DEFAULT"}>Choose vehicle type</option>
            </select>
          </div>
        </div>
        <button className='sortBtn' onClick={addVehicle}>Confirm</button>
      </div>

      <div style={{overflow:"hidden"}}>
      {
        companyVehicles.map((item,ind) => {
          return (
              <div key={ind} style={{width:"45%", float:"left", alignItems:"center", marginTop:"20px", border:"4px solid green", marginLeft:"3%", borderRadius:"8px"}}>
                <h2>Vehicle #{item.id}</h2>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
                  <h3 style={{marginTop:"auto", marginBottom:"auto", fontSize:"22px", marginLeft:"20%"}}>Model: </h3>
                  <input id={item.id+"ModelInput"} style={{marginTop:"auto", marginBottom:"auto", fontSize:"16px", width:"250px", marginRight:"10%"}} className='infoInput' defaultValue={item.model} type="text" required/>
                </div>
                
                <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
                  <h3 style={{marginTop:"auto", marginBottom:"auto", fontSize:"22px", marginLeft:"20%"}}>Brand: </h3>
                  <input id={item.id+"BrandInput"} style={{marginTop:"auto", marginBottom:"auto", fontSize:"16px", width:"250px", marginRight:"10%"}} className='infoInput' defaultValue={item.brand} type="text" required/>
                </div>

                <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
                  <h3 style={{marginTop:"auto", marginBottom:"auto", fontSize:"22px", marginLeft:"20%"}}>Registration: </h3>
                  <input id={item.id+"RegistrationInput"} style={{marginTop:"auto", marginBottom:"auto", fontSize:"16px", width:"250px", marginRight:"10%"}} className='infoInput' defaultValue={item.registration} type="text" required/>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px", marginBottom:"20px"}}>
                  <h3 style={{marginTop:"auto", marginBottom:"auto", fontSize:"22px", marginLeft:"20%"}}>Price per day: </h3>
                  <input id={item.id+"PriceInput"} style={{marginTop:"auto", marginBottom:"auto", fontSize:"16px", width:"250px", marginRight:"10%"}} className='infoInput' defaultValue={item.pricePerDay} type="text" required/>
                </div>

                <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px", marginBottom:"20px"}}>
                  <button onClick={e=>updateVehicle(item)} style={{marginTop:"auto", marginBottom:"auto", fontSize:"22px", marginLeft:"20%"}} className="saveBtn">Save changes</button>
                  <button onClick={e=>deleteVehicle(item)} style={{marginTop:"auto", marginBottom:"auto", fontSize:"22px", marginRight:"10%"}} className='deleteBtn' type="text" required>
                    Delete vehicle
                  </button>
                </div>
                
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default ManagerHomePage