const { WebSocketServer } = require('ws');

const server = new WebSocketServer({ port: 8080 });

server.on('connection', (socket) => {
	let heartbeat = 0;
	let heartbeatInterval = setInterval(() => {
		heartbeat += 1;
		socket.ping();
	}, 5000);

	socket.on('pong', (data) => {
		heartbeat -= 1;
	});

	socket.on('close', (data) => {
		clearInterval(heartbeatInterval);
	});
});
