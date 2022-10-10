var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

io.on('connection', function(socket) {
    console.log("connect", socket.id)
    socket.on('new_notification', function(data) {
        console.log(data.title, data.message);
        io.sockets.emit('show_notification', {
            title: data.title,
            message: data.message,
            icon: data.icon,
        });
    });
});

http.listen(3000, function() {
    console.log('listening on localhost:3000');
});