const http = require("http");
const router = require("./router");
var scraper = require("./usaScraper");


http.createServer(function (req, res) {
    // body...
    scraper.teamScraper('https://usa.voobly.com');
}).listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");