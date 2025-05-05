import {io} from "socket.io-client";

const accessToken = localStorage.getItem('accessToken');

const socket = io('https://inctagram.work', {
    query: {
        accessToken: accessToken
    }
});

socket.on('connect', () => {
    console.log('Connected to WebSocket');
});

socket.on('NOTIFICATION', (data) => {
    console.log('Received notification:', data);
});


socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});

export default socket;
