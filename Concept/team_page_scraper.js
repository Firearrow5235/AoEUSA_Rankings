const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `https://usa.voobly.com/`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

const fakeDb = [];

rp(options)
  .then(($) => {
    //console.log($);
    $('table').find('td a:nth-child(3n), td > span > a:nth-child(2n)').each(function(i, elem){
        //console.log($(this).eq(1).text());
        var userid = $(this).attr('href');
        var n = userid.lastIndexOf('/');
        var user_id = userid.substring(n + 1);
        var username = $(this).text();
        
        
        //this is where we add the USA Player data to the Database
        fakeDb.push({id: i + 1, _userid: user_id, _username: username, _rating: null, _lastmatch: null, _createdAt: Date(), _updatedAt: Date()});
    
    });

    console.log(fakeDb);

    
  })
  .catch((err) => {
    console.log(err);
});


    //https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
    //https://quickdb.js.org/