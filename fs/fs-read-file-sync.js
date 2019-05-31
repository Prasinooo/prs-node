var fs = require('fs');
var http = require('http');
fs.readFileSync('./output.dat');

http.createServer(function (req, res) {
  fs.readFileSync('./output.dat');
}).listen(3000);
