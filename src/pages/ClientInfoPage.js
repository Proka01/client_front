import React, {useEffect, useState} from 'react'
import Header  from '../components/Header'
import Row from '../components/Row'
import "../style/clientInfoPage.css";
import { getClientInfo } from '../web2Communication'
import { updateClientUsername, updateClientPassword, updateClientLastName, updateClientEmail } from '../web2Communication'
import { updateClientPassepotNumber,updateClientPhoneNumber, updateClientFirstName, updateClientBirthDate, getAllClientNotifications } from '../web2Communication'
import Notifications from '../components/Notifications';

const ClientInfoPage = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passeportNum, setPasseportNum] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [notifList, setNotifList] = useState([]);
  const [filteredNotifList, setFilteredNotifList] = useState([]);
  const [dateFrom, setDateFrom] = useState("-");
  const [dateTo, setDateTo] = useState("-");
  const [notifType, setNotifType] = useState("-");

  // var arr = [
  //   {
  //     id: 1,
  //     type: "ACTIVATION_EMAIL",
  //     date: "2023-01-01",
  //     msg: "Hello Aleksa Prokic activate your account at  http://localhost:8085/api/client/verify/766909 with code 766909 !!!"
  //   },
  //   {
  //     id: 2,
  //     type: "ACTIVATION_EMAIL",
  //     date: "2023-01-02",
  //     msg: "Hello Aleksa Prokic activate your account at  http://localhost:8085/api/client/verify/766909 with code 766909 !!!"
  //   },
  //   {
  //     id: 3,
  //     type: "ACTIVATION_EMAIL",
  //     date: "2023-01-03",
  //     msg: "Hello Aleksa Prokic activate your account at  http://localhost:8085/api/client/verify/766909 with code 766909 !!!"
  //   }
  // ];

  function onFilterClick()
  {
    let tmpArr = [];

    if(notifType == "-") tmpArr = notifList;
    else
    {
      for(let i = 0; i < notifList.length; i++)
      {
        if(notifList[i]["type"] == notifType) tmpArr.push(notifList[i]);
      }
    }

    console.log(tmpArr);

    let tmpArr2 = [];
    if(dateFrom != "-" && dateTo != "-")
    {
      var from = new Date(dateFrom.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
      var to = new Date(dateTo.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

      for(let i = 0; i < tmpArr.length; i++)
      {
        let date = new Date(tmpArr[i]["date"].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        console.log(from + " <= " + date + " <= " + to);
        if(date >= from && date <= to) tmpArr2.push(tmpArr[i]);
      }
    }
    else
      tmpArr2 = tmpArr;

    console.log(tmpArr2);
    setFilteredNotifList(tmpArr2);
    setNotifType("-");
  }

  async function loadClientInfoAsyncCall(){
    let response = await getClientInfo(localStorage.getItem("Token"));

    setUsername(response["username"]);
    setPassword(response["password"]);
    setEmail(response["email"]);
    setFirstName(response["firstName"]);
    setLastName(response["lastName"]);
    setBirthDate(response["birthDate"]);
    setPhoneNumber(response["phoneNumber"]);
    setPasseportNum(response["passportNumber"]);
  }

  async function loadClientNotifAsyncCall(){
    let response = await getAllClientNotifications(localStorage.getItem("Token"));

    let tmpArr = [];
    for (let i = 0; i < response.length; i++) {
      tmpArr.push({
        id: parseInt(i + 1),
        type: response[i]["notificationType"],
        date: response[i]["notificationDate"],
        msg: response[i]["emailMsg"]
      })
    }

    setNotifList(tmpArr);
    setFilteredNotifList(tmpArr);
  }

    useEffect(() => {
      loadClientInfoAsyncCall();
      loadClientNotifAsyncCall();
      }, []);

  return (
    <div >
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
                  placeholder="From: ex. yyyy-mm-dd or -"
                  onChange={(e) => setDateFrom(e.target.value)}
                />

                <input
                  type='text'
                  id='dateTo'
                  name='dateTo'
                  placeholder="To: ex. yyyy-mm-dd or -"
                  onChange={(e) => setDateTo(e.target.value)}
                />

                <input
                  type='text'
                  id='notifType'
                  name='notifType'
                  placeholder="ex: - or ACTIVATION_EMAIL"
                  onChange={(e) => setNotifType(e.target.value)}
                />
              </div>

              <div className='buttonDiv'>
                <input disabled={true} className="hideMe" ></input>
                <input disabled={true} className="hideMe"></input>
                <button className='loginBtn aleksaBtn' onClick={onFilterClick}>Filter</button>
              </div>

              <div className='notifDiv'>
                <Notifications notifications={filteredNotifList}/>
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default ClientInfoPage
