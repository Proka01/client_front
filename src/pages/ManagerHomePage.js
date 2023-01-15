import React, { useEffect, useState } from 'react'
import { addVehicleToCompany, getAllTypes, getCompanyInfo, updateCompanyInfo } from '../web2Communication'

const ManagerHomePage = () => {

  const [company, setCompany] = useState({name:''});
  const [newVehicleType, setNewVehicleType] = useState();

  async function loadData(){
    let companyL = await getCompanyInfo();
    setCompany(companyL);
    let input = document.getElementById("numOfVehiclesInput");
    input.value = companyL.numberOfVehicle + " vehicles";
    //console.log(company);

    let types = await getAllTypes();
    let typeSelect = document.getElementById("typeSelect");

    for (var i = 0; i < types.length; i++) {
      let option = document.createElement("option");
      option.setAttribute('value', types[i]["id"]);

      let optionText = document.createTextNode(types[i]["type"]);
      option.appendChild(optionText);

      typeSelect.appendChild(option);
      //console.log(companies[i])
    }

  }

  async function addVehicle(){
    let model = document.getElementById("modelInput").value;
    let brand = document.getElementById("brandInput").value;
    let registration = document.getElementById("registrationInput").value;
    let price = parseInt(document.getElementById("priceInput").value);


    if(model && brand && registration && price && newVehicleType!=undefined){
      console.log({model,brand,registration,price,newVehicleType})
      let response = await addVehicleToCompany(model,brand,registration,newVehicleType,price);
      console.log(response);
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
          <label style={{marginLeft:"30px", fontSize:"24px", color:"green", visibility:"hidden"}} id="infoLabel">
            Succesfully updated!
          </label>
        </div>
      </div>
      

      <div style={{marginTop:"20px"}}>
        <h1>Add vehicle</h1>
        <div style={{display:"flex", marginTop:"20px", columnGap:"20px", justifyContent:"space-around"}}>
          <div style={{width:"20%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Model:</p>
              </div>
              <input className='infoInput' id='modelInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          <div style={{width:"20%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Brand:</p>
              </div>
              <input className='infoInput' id='brandInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          <div style={{width:"20%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Registration:</p>
              </div>
              <input className='infoInput' id='registrationInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          <div style={{width:"20%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Price per day:</p>
              </div>
              <input className='infoInput' id='priceInput' style={{fontSize:"16px"}} placeholder={"Enter new company name"}></input>
          </div>
          
          <div style={{width:"20%"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <p style={{fontSize:"20px"}}>Model:</p>
              </div>
              <select id='typeSelect' className='infoInput' onChange={(e) => {setNewVehicleType(e.target.value); }} defaultValue={'DEFAULT'} style={{width:"200px", height:"45px", fontSize:"16px"}}>
                <option disabled value={"DEFAULT"}>Choose vehicle type</option>
            </select>
          </div>
        </div>
        <button className='sortBtn' onClick={addVehicle}>Confirm</button>
      </div>
    </div>
  )
}

export default ManagerHomePage