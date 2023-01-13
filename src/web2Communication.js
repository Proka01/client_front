//CLIENT
export async function registerClient(firstName, lastName, email, username, password, phoneNumber, passportNumber, birthDate) {

    const url = "http://localhost:8085/api/client/register";
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName, lastName, email, username, password, phoneNumber, passportNumber, birthDate})
    })
  
    console.log(JSON.stringify({firstName, lastName, email, username, password, phoneNumber, passportNumber, birthDate}))
  }

  export async function clientLogin(username, password) {
    const url = "http://localhost:8085/api/client/login";
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,password})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json["token"];
                console.log("Token: " + ret);
                return ret;
              });
        }
    })
  }


// MANAGER
  export async function registerManager(email, username, phoneNumber, password,firstName,lastName,companyName,birthDate) {

    const url = "http://localhost:8085/api/manager/register";
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName, lastName, email, username, password, phoneNumber, companyName, birthDate})
    })
  
    console.log(JSON.stringify({firstName, lastName, email, username, password, phoneNumber, companyName, birthDate}))
  }

  export async function managerLoing(username, password) {
    const url = "http://localhost:8085/api/manager/login";
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,password})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json["token"];
                console.log("Token: " + ret);
                return ret;
              });
        }
    })
  }

  
// ADMIN
export async function adminLogin(username, password) {
    const url = "http://localhost:8085/api/admin/login";
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,password})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json["token"];
                console.log("Token: " + ret);
                return ret;
              });
        }
    })
  }