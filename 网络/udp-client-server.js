var dgram = require('dgram');
var fs = require('fs');
var port = 41230;
var defaultSize = 16;

function Client (remoteIP) {
  var inStream = fs.createReadStream(__filename);
  var socket = dgram.createSocket('udp4');

  inStream.on('readable', function () {
    sendData();
  });

  function sendData () {
    var message = inStream.read(defaultSize);

    if (!message) {
      return socket.unref();
    }

    socket.send(message, 0, message.length, port, remoteIP, function (err, bytes) {
      sendData();
    });
  }
}

function Server () {
  var socket = dgram.createSocket('udp4');

  socket.on('message', function (msg, rinfo) {
    process.stdout.write(msg.toString());
  });

  socket.on('listening', function () {
    console.log('Server ready:', socket.address());
  });

  socket.bind(port);
}

if (process.argv[2] === 'client') {
  new Client(process.argv[3]);
} else {
  new Server();
}
