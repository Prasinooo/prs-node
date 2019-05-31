var fs = require('fs');
fs.readFile('./path/to/file.txt', function (err, buf) {
  console.log(buf.toString());
});
