var net = require('net');
var server = net.createServer(function (c) {
  c.setNoDelay(true);
  c.write('377375042377373001', 'binary');
  console.log('server connected');
  c.on('end', function () {
    console.log('server disconnected');
    server.unref();
  });

  c.on('data', function (data) {
    process.stdout.write(data.toString());
    c.write(data.toString());
  });
});
server.listen(8000, function () {
  console.log('server bound');
});
