var express = require('express');
var app = new express();
var router = require("./router");


//set up static path for our css
app.use("/css", express.static(__dirname + "/css"));

app.route('/')
    .get(function(req, res){
        router.tableData(req, res);
    });

app.listen(process.env.PORT);