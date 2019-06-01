var fs = require('fs');
fs.watchFile('./watch-files/w-file-1.txt', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});
