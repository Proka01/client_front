import React, {useEffect, useState} from 'react'
import Header  from '../components/Header'
import Row from '../components/Row'
import "../style/clientInfoPage.css";
import { getClientInfo } from '../web2Communication'
import { updateClientUsername, updateClientPassword, updateClientLastName, updateClientEmail } from '../web2Communication'
import { updateClientPassepotNumber,updateClientPhoneNumber, updateClientFirstName, updateClientBirthDate } from '../web2Communication'


const ClientInfoPage = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passeportNum, setPasseportNum] = useState("");
  const [birthDate, setBirthDate] = useState("");

  async function loadClientInfoAsyncCall(){
    let response = await getClientInfo(localStorage.getItem("Token"));
    console.log(String(localStorage.getItem("Token")))
    console.log("response :" + response["username"]);

    setUsername(response["username"]);
    setPassword(response["password"]);
    setEmail(response["email"]);
    setFirstName(response["firstName"]);
    setLastName(response["lastName"]);
    setBirthDate(response["birthDate"]);
    setPhoneNumber(response["phoneNumber"]);
    setPasseportNum(response["passportNumber"]);
  }

    useEffect(() => {
      loadClientInfoAsyncCall();
      }, []);

  return (
    <div>
        <Header/>
        <div className='leftRightDiv'>
          <div className='leftDiv'>
            <h1 id='clientInfo'>Client info:</h1>
            <div className='rowDiv'>
              <Row defaultValue={username} placeholder={username} title="Username" setAtribute={setUsername} updateHttpRequest={updateClientUsername}/>
              <Row defaultValue={password} placeholder={password} title="Password" setAtribute={setPassword} updateHttpRequest={updateClientPassword}/>
            </div>
            
            <div className='rowDiv'>
              <Row defaultValue={email} placeholder={email} title="Email" setAtribute={setEmail} updateHttpRequest={updateClientEmail}/>
              <Row defaultValue={firstName} placeholder={firstName} title="First name" setAtribute={setFirstName} updateHttpRequest={updateClientFirstName}/>
            </div>

            <div className='rowDiv'>
              <Row defaultValue={lastName} placeholder={lastName} title="Last name" setAtribute={setLastName} updateHttpRequest={updateClientLastName}/>
              <Row defaultValue={birthDate} placeholder={birthDate} title="Birth date" setAtribute={setBirthDate} updateHttpRequest={updateClientBirthDate}/>
            </div>
          
            <div className='rowDiv'>
                <Row defaultValue={passeportNum} placeholder={passeportNum} title="Passeport number" setAtribute={setPasseportNum} updateHttpRequest={updateClientPassepotNumber}/>
                <Row defaultValue={phoneNumber} placeholder={phoneNumber} title="Phone number" setAtribute={setPhoneNumber} updateHttpRequest={updateClientPhoneNumber}/>
            </div>

          </div>
          <div className='rightDiv'>
            <h1 id='notifications'>Notifications:</h1>
            <div className='filterDiv'>
              <div className='inputDiv'>
                <input
                  type='text'
                  id='dateFrom'
                  name='dateFrom'
                  placeholder="Date from: ex. yyyy-mm-dd"
                  // onChange={}
                />

                <input
                  type='text'
                  id='dateTo'
                  name='dateTo'
                  placeholder="Date to: ex. yyyy-mm-dd"
                  // onChange={}
                />

                <input
                  type='text'
                  id='notifType'
                  name='notifType'
                  placeholder="Notification type"
                  // onChange={}
                />
              </div>

              <div className='buttonDiv'>
                <input disabled={true} className="hideMe" ></input>
                <input disabled={true} className="hideMe"></input>
                <button className='loginBtn aleksaBtn'>Filter</button>
              </div>

              <div className='notifDiv'>
                <p>notif div</p>
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default ClientInfoPage
