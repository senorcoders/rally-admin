'use strict'
/*exports.requestRallyToken = function() {
    let post_data= {
          "email": "admin@senorcoders.com",
          "password": "helium33"
        }
          
        var args = {
            data: post_data,
            headers: { "Content-Type": "application/json", "Authorization": this.token }
        };

        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this

        client.registerMethod('jsonMethod', 'http://api.provethisconcept.com/authenticate', 'POST')
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
          // parsed response body as js object
          //$that.token = dataOrganizations.auth_token
          alert(dataOrganizations.auth_token);
          return dataOrganizations.auth_token
          //$that. get_objectives()
        })
}*/




import axios from 'axios';
exports.requestRallyToken = function() {  
  alert("asdasf");
  const BASE_URL = 'http://api.provethisconcept.com';
  return "alsdjas";
  /*const url = `${BASE_URL}/authenticate`;

  axios.post(url, {
    email: 'admin@senorcoders.com',
    password: 'helium33'
  })
  .then(function (response) {
    //alert( JSON.stringify(response.data) )
    axios.defaults.headers.common['Authorization'] = response.data;
  })
  .catch(function (error) {
    console.log(error.data);
  });*/
  
}

/* function get_objectives() {
  const url = `${BASE_URL}/api/objectives`;
  get_token().then(function (){
    return axios.get(url).then(response => response.data);  
  })
  
}*/