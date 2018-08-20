const request = require('request');
const cheerio = require('cheerio');

//crude user 'db' just for test purposes
const user_db = require('./user_db');

var last_match_id = '#18263811';
var curr_opponent = "ArtOfTheTroll";
var curr_user = "125072332";
var most_recent_match_id = null;
var curr_match_id = null;
var match_data = [];

request.get({
    url: "https://www.voobly.com/login",
    jar: true,
    followAllRedirects: true
}, function(err, resp, body){
    
    request.post({
        
        url: "https://www.voobly.com/login/auth",
        jar: true,
        followAllRedirects: true,
        form: { username: "USA_USER", password: "lp200303"}
    }, function(err, resp, body){
        
        //console.log(body);
        request.get({ //get2
            url: "https://www.voobly.com/profile/view/" + curr_user + "/Matches", //hardcoded for now
            jar: true,
            followAllRedirects: true
        }, function(err, resp, body){
            
            var $ = cheerio.load(body);
            
            //still need to loop and find all users and handle if none exist
            //also, do we need to COUNT how many show up?
            /*
            if( $("td:contains('" + curr_opponent + " has won')").text() ){//hardcoded for now
                console.log("Discern is a loser!");
            } else {
                console.log("Discern won");
            }
            */
            
            
            //most recent match #
            //just a little helper to find the index of the last match td which is "12"
            /*
            $('table').find('td').each(function(i, elem){
                console.log(i + ". " + $(this).text());
            });
            */
            
            //update to the most recent match id for all future purposes
            most_recent_match_id = $('table td').eq(12).text();
            
            //update last_match
            if(last_match_id == most_recent_match_id){//let's just jump out and move on right away
                return
                
            } else {
                
                //add our games to the array
                var index = 12;
                while(curr_match_id !== most_recent_match_id && index < 76){
                    
                    //some sanitation
                    var loser, winner;
                    
                    if( $('table td').eq(index - 1).text().split("]")[1] )
                    {
                        
                        loser = $('table td').eq(index - 1).text().split("]")[1];
                        
                    } else {
                        
                        loser = $('table td').eq(index - 1).text().split(" ")[0];
                        
                    } 
                    
                    
                    if ( $('table td').eq(index - 2).text().split("]")[1] )
                    
                    {
                        
                        winner = $('table td').eq(index - 2).text().split("]")[1];
                        winner = winner.split(" ")[0];
                        
                    } else {
                        
                        winner = $('table td').eq(index - 2).text().split(" ")[0];
                        
                    }
                    
                    //end sanitation
                    
                    match_data.push(
                        {'match_id': $('table td').eq(index).text(), 
                        'losing_team': loser,
                        'winning_team': winner
                        });
                    index = index + 7;
                }
                
            }
                
                //use the updated array to update our db for any USA internal matches
                //fake game
                
                match_data.push({"match_id":"#99999999","losing_team":"Discern","winning_team":"ArtOfTheTroll"});
                
                //console.log(JSON.stringify(match_data));
                
                match_data.forEach(function(match){
                    
                    fakeDb.forEach(function(user){
                        if(match.losing_team == user._username && curr_user !== user._userid)
                        
                        {
                            console.log(curr_user + " played vs " + match.losing_team + " and won!");
                        } 
                        
                        else if(match.winning_team == user._username && curr_user !== user._userid)
                        
                        {
                            console.log(curr_user + " played vs " + match.winning_team + " and lost! FeelsBadMan");
                            
                        }
                            
                    });       
                            
                });


            }); // end of get2
        
    }); //end of post
    
}); //end of get


//https://www.webniraj.com/2015/03/16/nodejs-scraping-websites-using-request-and-cheerio/

var fakeDb = [{ id: 1,
    _userid: '125072332',
    _username: 'Discern',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 2,
    _userid: '3867',
    _username: 'Spring',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 3,
    _userid: '124691575',
    _username: 'ArtOfTheTroll',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 4,
    _userid: '124468178',
    _username: 'RAY',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 5,
    _userid: '124612152',
    _username: 'Superfluous',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 6,
    _userid: '124574972',
    _username: 'sheldosd77',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 7,
    _userid: '124713150',
    _username: 'SirGibson',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 8,
    _userid: '124736041',
    _username: 'SilverHawk',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 9,
    _userid: '124749620',
    _username: 'Wrath_27',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 10,
    _userid: '124757303',
    _username: 'we3kings',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 11,
    _userid: '124827272',
    _username: '_Scotty',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 12,
    _userid: '124831468',
    _username: '__Trump__',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 13,
    _userid: '124868466',
    _username: 'Snowshawnskate',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 14,
    _userid: '124903905',
    _username: 'bullmeister',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 15,
    _userid: '125020892',
    _username: 'Baryon',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 16,
    _userid: '125029397',
    _username: 'KnightMayor93',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 17,
    _userid: '125098634',
    _username: 'RedFox_',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 18,
    _userid: '125110997',
    _username: 'Outpost_Malone',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 19,
    _userid: '124506589',
    _username: 'roth8277',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 20,
    _userid: '124498817',
    _username: 'Willis_35',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 21,
    _userid: '72549',
    _username: '_MilenKo',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 22,
    _userid: '166018',
    _username: 'StSnoopy',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 23,
    _userid: '218525',
    _username: '_Locke',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 24,
    _userid: '123426574',
    _username: 'IamKilroy',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 25,
    _userid: '124022865',
    _username: 'BRIAN___',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 26,
    _userid: '124052271',
    _username: 'AlphaAndOmega',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 27,
    _userid: '124108304',
    _username: 'Uhtredshield',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 28,
    _userid: '124205987',
    _username: 'Jacobs',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 29,
    _userid: '124213129',
    _username: 'Potroast',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 30,
    _userid: '124238490',
    _username: '_Angrenost_',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 31,
    _userid: '124253744',
    _username: 'o_PYRO_o',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 32,
    _userid: '124269045',
    _username: 'MiniMog',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 33,
    _userid: '124280794',
    _username: 'Troy',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 34,
    _userid: '124310407',
    _username: 'Tuang',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 35,
    _userid: '124472409',
    _username: 'Jomenall',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 36,
    _userid: '124484591',
    _username: 'Tocaraca',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' },
  { id: 37,
    _userid: '125115455',
    _username: 'DockBlocker',
    _rating: null,
    _lastmatch: null,
    _createdAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)',
    _updatedAt: 'Sat Aug 18 2018 03:29:33 GMT+0000 (UTC)' }];