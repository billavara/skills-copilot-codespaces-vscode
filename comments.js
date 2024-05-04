// Create web server
// 1. load 'http' module
var http = require('http');
var fs = require('fs');
var url = require('url');

// 2. create server
http.createServer(function (req, res) {
    // 3. parse request
    var path = url.parse(req.url).pathname;
    console.log(path);

    // 4. route the path
    switch (path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Hello, World!</h1>');
            res.end();
            break;
        case '/index.html':
            fs.readFile(__dirname + path, function (err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.write('Oh no! Couldn\'t find that page!');
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                }
            });
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('Oh no! Couldn\'t find that page!');
            res.end();
            break;
    }
}).listen(3000);

console.log('Server running at http://localhost:3000/');