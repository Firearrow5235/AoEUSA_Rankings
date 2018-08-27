const rp = require('request-promise');
const cheerio = require('cheerio');
var fs = require("fs");


var options = {
    uri: "https://usa.voobly.com",
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  
  //capture userData
  var userData = [];
  
  rp(options)
    .then(($) => {
      //finds each username & user id
      $('table').find('td a:nth-child(3n), td > span > a:nth-child(2n)').each(function(i, elem){
          //parse the user id (from <a> tags) to strip just the id
          var userid = $(this).attr('href');
          var n = userid.lastIndexOf('/');
          var user_id = userid.substring(n + 1);
          var username = $(this).text();
    
          //this is where we add the USA Player data to the Database
          //update the userData array and can be used to parse and do a database dump
          userData.push({id: i + 1, _userid: user_id, _username: username, _rating: null, _lastmatch: null, _createdAt: Date(), _updatedAt: Date()});
      
      });
  
      //console.log(userData);
      fs.writeFile('userdb.json', JSON.stringify(userData, null, 4), function(error){
        console.log('File successfully written! - Check your project directory for the userdb.json file');
      });
  
    })
    .catch((err) => {
      console.log(err);
  }); 
