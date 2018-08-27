//setting up routers, oh boy...
var commonHeader = { 'Content-Type': 'html' };
var fs = require('fs');

var tableData = function(req, res){
    
    if(req.url == "/"){
        res.status(200, commonHeader);
        var userdb = fs.readFileSync('./userdb.json');
        userdb = JSON.parse(userdb);
        res.render('table.ejs', { json: userdb });
        
    } else {
        res.send("404 cmonBruh");
    }
};

module.exports.tableData = tableData;

