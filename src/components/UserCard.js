import React from 'react'
import { restrictClient } from '../web2Communication'

const UserCard = ({user, setRerender, render}) => {

  async function loadAllClients(){
    console.log(user)
    await restrictClient(localStorage.getItem("Token"), !user.restricted, user.username);
    setRerender(!render);
  }

  function onBtnClick()
  {
    loadAllClients();
  }

  return (
    <div>
      <div style={{width:"100%", border:"3px solid #1d6c12", borderRadius:"9px", padding:"10px", marginBottom:"10px", backgroundColor:"#f8f8f8"}}>
        <p><b>First name: &nbsp;</b> {user.firstName}</p><br/>
        <p><b>Last name: &nbsp;</b> {user.lastName}</p><br/>
        <p><b>Email: &nbsp;</b> {user.email}</p><br/>
        <p><b>Phone number: &nbsp;</b> {user.phoneNumber}</p><br/>
        <div style={{display: "flex", justifyContent:"space-evenly", paddingLeft:"40%"}}>
            <button 
                className={`aleksaRedBtn aleksaBtn ${user.restricted?'disabled':'not_disabled'}`}
                disabled = {user.restricted?true:false} 
                onClick={onBtnClick}>Restric</button>

            <button 
                className={`loginBtn aleksaBtn ${user.restricted?'not_disabled':'disabled'}`}
                onClick={onBtnClick}
                disabled = {user.restricted?false:true}>Unrestrict</button>
        </div>
    </div>
    </div>
  )
}

export default UserCard
