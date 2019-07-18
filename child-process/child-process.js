var cp = require('child_process');
cp.execFile('ls', ['non-existent-directory-to-list'],
  function (err, stdout, stderr) {
      console.log(err.code);
      console.log(stderr);
});
