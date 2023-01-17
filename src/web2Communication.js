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
                const ret = json;
                console.log(ret);
                console.log("Token: " + ret["token"]);
                return ret["token"];
              });
        }
    })
  }

  export async function getClientInfo(token) {
    const url = "http://localhost:8085/api/client/findById";
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


  export async function updateClientUsername(value, token) {
    const url = "http://localhost:8085/api/client/updateUsername";
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

  export async function updateClientPassword(value, token) {
    const url = "http://localhost:8085/api/client/updatePassword";
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

  export async function updateClientEmail(value, token) {
    const url = "http://localhost:8085/api/client/updateEmail";
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

  export async function updateClientFirstName(value, token) {
    const url = "http://localhost:8085/api/client/updateFirstName";
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

  export async function updateClientLastName(value, token) {
    const url = "http://localhost:8085/api/client/updateLastName";
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

  export async function updateClientPhoneNumber(value, token) {
    const url = "http://localhost:8085/api/client/updatePhoneNumber";
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

  export async function updateClientPassepotNumber(value, token) {
    const url = "http://localhost:8085/api/client/updatePassepotNumber";
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

  export async function updateClientBirthDate(value, token) {
    const url = "http://localhost:8085/api/client/updateBirthDate";
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

  export async function getAllClientNotifications(token) {
    const url = "http://localhost:8080/api/notification/getNotificationsForClientId";
    var bearer = 'Bearer ' + token;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      // body: JSON.stringify({value})
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

  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////

  export async function searchAvailableVehicles(city, companyId, startDate, endDate) {
    const url = "http://localhost:8081/api/vehicle/search";
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({city,companyId, startDate, endDate})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function getAllCompanies() {
    const url = "http://localhost:8081/api/company";
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }
  export async function getAllCities() {
    const url = "http://localhost:8081/api/company/getCities";
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }


  export async function createReservation(vehicleId, startDate, endDate, companyId,token) {
    const url = "http://localhost:8081/api/reservation";
    var bearer = 'Bearer ' + token;

  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({vehicleId,companyId, startDate, endDate})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function getReservations() {
    const url = "http://localhost:8081/api/reservation";
    var bearer = 'Bearer ' + localStorage.getItem("Token");

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function cancelReservation(id) {
    const url = "http://localhost:8081/api/reservation";
    var bearer = 'Bearer ' + localStorage.getItem("Token");

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({id})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function getAllReviews(id, city) {
    const url = "http://localhost:8081/api/review/"+id+"/"+city;
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }
  export async function getAverageRatings() {
    const url = "http://localhost:8081/api/review/ratings";
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function getReservationsNotReviewed() {
    const url = "http://localhost:8081/api/reservation/notReviewed";
    var bearer = 'Bearer ' + localStorage.getItem("Token");

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function createReview(reservationId, rating, comment) {
    const url = "http://localhost:8081/api/review";
    var bearer = 'Bearer ' + localStorage.getItem("Token");

  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({reservationId, rating, comment})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function getUserReviews() {
    const url = "http://localhost:8081/api/review/userReviews";
    var bearer = 'Bearer ' + localStorage.getItem("Token");

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function deleteReview(reviewId) {
    const url = "http://localhost:8081/api/review";
    var bearer = 'Bearer ' + localStorage.getItem("Token");

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({reviewId})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function updateReview(reviewId, rating, comment) {
    const url = "http://localhost:8081/api/review";
    var bearer = 'Bearer ' + localStorage.getItem("Token");

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({reviewId, rating, comment})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
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

  export async function getCompanyInfo() {
    const url = "http://localhost:8081/api/company/getInfo";
    var bearer = 'Bearer ' + localStorage.getItem("Token");
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function updateCompanyInfo(name, description) {
    const url = "http://localhost:8081/api/company/updateCompany";
    var bearer = 'Bearer ' + localStorage.getItem("Token");
  
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({name, description})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function getAllTypes() {
    const url = "http://localhost:8081/api/companyVehicleType";
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function addVehicleToCompany(model, brand, registration, vehicleTypeId, pricePerDay) {
    const url = "http://localhost:8081/api/vehicle";
    var bearer = 'Bearer ' + localStorage.getItem("Token");
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({model, brand, registration, vehicleTypeId, pricePerDay})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function getCompanyVehicles() {
    const url = "http://localhost:8081/api/vehicle/search";
    var bearer = 'Bearer ' + localStorage.getItem("Token");
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function deleteCompanyVehicle(vehicleId) {
    const url = "http://localhost:8081/api/vehicle";
    var bearer = 'Bearer ' + localStorage.getItem("Token");
  
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({vehicleId})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
                return ret;
              });
        }
    })
  }

  export async function updateCompanyVehicle(vehicleId, model, brand, registration, pricePerDay) {
    const url = "http://localhost:8081/api/vehicle";
    var bearer = 'Bearer ' + localStorage.getItem("Token");
  
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : bearer
      },
      body: JSON.stringify({vehicleId, model, brand, registration, pricePerDay})
    })
    .then(response => {
        if(response.ok){
            return response.json().then(json => {
                const ret = json;
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