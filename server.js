var http = require('http');
const PORT = 8080;

function handleRequest(req, res) {
	console.log(req.headers);
	res.end(JSON.stringify({data: {
		x: 5,
		y: 6,
		z: 7,
	}}));
}

var server = http.createServer(handleRequest);
server.listen(PORT, function() {
	console.log('Listening on ' + PORT + ' port');
});