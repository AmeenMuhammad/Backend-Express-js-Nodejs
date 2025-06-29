let http = require('http');
const { listen } = require('.');
http.createServer(function (req, res) {
    res.writeHead(200, {'content-type' : 'text/html'});
    res.end("wellcome node js code");
}).listen(8080);

