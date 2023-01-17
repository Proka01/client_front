import React, {useEffect} from 'react'
import Header  from '../components/Header'
import Row from '../components/Row'
import { getClientInfo } from '../web2Communication'
import jwt from 'jwt-decode'

// const callAsyncGetClientInfo = async (e) =>{
// 	e.preventDefault();

// 	//web2 http request
// 	let clientInfo = getClientInfo(localStorage.getItem(""))

// 	if(token!=undefined){
// 		localStorage.setItem("Token",token);
	
// 		console.log("Token from JSON:");
// 		console.log(token);

// 		//navigate("/clientHomePage");
// 		navigate("/clientInfoPage");
// 	}

//     // setPassword("");
//     // setUsername("");
//  } 


const ClientInfoPage = () => {

    useEffect(() => {
        var retrievedObject = localStorage.getItem('Token');
        console.log(JSON.parse(retrievedObject));
      }, []);

  return (
    <div>
        <Header/>
        <Row defaultValue={"in"} placeholder="input 1" />
        <Row defaultValue={"in"} placeholder="input 2" />
        <Row defaultValue={"in"} placeholder="input 3" />
    </div>
  )
}

export default ClientInfoPage
