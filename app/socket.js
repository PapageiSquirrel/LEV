var socket = io.connect();

socket.on('message', function(msg) {
	console.log(msg);
});

function checkLogin(callback) {
	socket.emit('checkLogin', {}, callback);
}