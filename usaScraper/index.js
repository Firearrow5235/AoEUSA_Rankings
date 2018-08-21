const rp = require('request-promise');
const cheerio = require('cheerio');

exports.teamScraper = function(url){
  
  const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  
  //an array to simulate the db
  const userData = [];
  
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
  
      console.log(userData);
      return userData;
  
    })
    .catch((err) => {
      console.log(err);
  }); 
 
};