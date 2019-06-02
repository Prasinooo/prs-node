var assert = require('assert');
var net = require('net');
var clients = 0;
var expectedAssertions = 2;

var server = net.createServer(function(client) {
  clients++;
  var clientId = clients;
  console.log('Client connected:', clientId);

  client.on('end', function () {
    console.log('Client disconnected:', clientId);
  });

  client.write('Welcome client:' + clientId + '\r\n');
  client.pipe(client);
});

server.listen(8000, function () {
  console.log('server started on port 8000');

  runTest(1, function () {
    runTest(2, function () {
      console.log('Tests finished');
      assert.equal(0, expectedAssertions);
      server.close();
    });
  });
});

function runTest (expectedId, done) {
  var client = net.connect(8000); // 这里是默认了 localhost ？
  client.on('data', function (data) {
    var expected = 'Welcome client:' + expectedId + '\r\n'
    assert.equal(data.toString(), expected);
    expectedAssertions--;
    client.end();
  });

  client.on('end', done);
};
