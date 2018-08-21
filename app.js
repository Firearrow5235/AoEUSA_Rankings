const http = require("http");
var scraper = require("./scraper");


http.createServer(function (req, res) {
    scraper.scrapeit('https://usa.voobly.com');
}).listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", () => {
    console.log("server running");
});