const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function(event) {
    const data = event.data;
    // Process the received data here
    console.log('Received data from server:', data);
};