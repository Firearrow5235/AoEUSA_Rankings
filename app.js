//just starting the stock server for now

const http = require("http");
const router = require("./router");

http.createServer(function (req, res) {
    // body...
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end();
}).listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");