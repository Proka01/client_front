import React, { useEffect, useState } from 'react'
import { getCompanyInfo, updateCompanyInfo } from '../web2Communication'

const ManagerHomePage = () => {

  const [company, setCompany] = useState({name:''});

  async function loadData(){
    let companyL = await getCompanyInfo();
    setCompany(companyL);
    let input = document.getElementById("numOfVehiclesInput");
    input.value = company.numberOfVehicle + " vehicles";
    console.log(company);
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
      <div style={{position:"absolute", left:"45%"}}>
        <button className='updateBtn'  onClick={updateInfo}>Update</button>
        <label style={{marginLeft:"30px", fontSize:"24px", color:"green", visibility:"hidden"}} id="infoLabel">
          Succesfully updated!
        </label>
      </div>
    </div>
  )
}

export default ManagerHomePage