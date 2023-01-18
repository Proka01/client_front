import React,{useState,useEffect} from 'react'
import Header  from '../components/Header'
import Notifications from '../components/Notifications';
import { getAllNotifications, getAllClients } from '../web2Communication';
import "../style/adminHomePage.css";
import UserCard from '../components/UserCard';
import UserCards from '../components/UserCards';



const AdminHomePage = () => {
  const [notifList, setNotifList] = useState([]);
  const [filteredNotifList, setFilteredNotifList] = useState([]);
  const [dateFrom, setDateFrom] = useState("-");
  const [dateTo, setDateTo] = useState("-");
  const [notifType, setNotifType] = useState("-");
  const [clientList, setClientList] = useState([]);
  const [rerender, setRerender] = useState(false);
  
  const aleksa = {
    firstName: "aleksa",
    lastName: "prokic",
    phoneNumber: "55555",
    passportNumber: "99999999",
    email: "aleksa@gmail.com",
    restricted: false
  }
  
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

  async function loadAllNotifications(){
    let response = await getAllNotifications(localStorage.getItem("Token"));

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

  async function loadAllClients(){
    let response = await getAllClients(localStorage.getItem("Token"));
    console.log(response);

    let tmpArr = [];
    for (let i = 0; i < response.length; i++) {
      tmpArr.push({
        id: parseInt(i + 1),
        clientId: response[i]["id"],
        firstName: response[i]["firstName"],
        lastName: response[i]["lastName"],
        email: response[i]["email"],
        phoneNumber: response[i]["phoneNumber"],
        username: response[i]["username"],
        restricted: response[i]["restricted"]
      })
    }

    console.log(tmpArr);    
    setClientList(tmpArr);
  }

  useEffect(() => {
    loadAllNotifications();
    loadAllClients();
    }, []);

  useEffect(() => {
    loadAllNotifications();
    loadAllClients();
    }, [rerender]);
  
  return (
    <div>
      <Header/>
        <div className='leftRightDiv'>
          <div className='leftDiv'>
            <h1 id='restrict'>Restric users:</h1>
            <UserCards userCards={clientList} setRerender={setRerender} render={rerender}/>
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

export default AdminHomePage
