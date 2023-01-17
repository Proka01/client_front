export async function getManagerInfo(token) {
    const url = "http://localhost:8085/api/manager/findById";
    var bearer = 'Bearer ' + token;
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      //body: JSON.stringify()
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                console.log(ret);

                return ret;
              });
        }
    })
  }


  export async function updateManagerUsername(value, token) {
    const url = "http://localhost:8085/api/manager/updateUsername";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }

  export async function updateManagerPassword(value, token) {
    const url = "http://localhost:8085/api/manager/updatePassword";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }

  export async function updateManagerEmail(value, token) {
    const url = "http://localhost:8085/api/manager/updateEmail";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }

  export async function updateManagerFirstName(value, token) {
    const url = "http://localhost:8085/api/manager/updateFirstName";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }

  export async function updateManagerLastName(value, token) {
    const url = "http://localhost:8085/api/manager/updateLastName";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }

  export async function updateManagerPhoneNumber(value, token) {
    const url = "http://localhost:8085/api/manager/updatePhoneNumber";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }

  export async function updateManagerCompanyName(value, token) {
    const url = "http://localhost:8085/api/manager/updateCompanyName";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }

  export async function updateManagerBirthDate(value, token) {
    const url = "http://localhost:8085/api/manager/updateBirthDate";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({value})
    })
    .then(response => {
        if(response.ok){
            return response.text();
        }
    })
  }