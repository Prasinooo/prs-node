var fs = require('fs');
var readable = fs.createReadStream('./original.txt');
var writeable = fs.createWriteStream('./copy.txt');
readable.pipe(writeable);
