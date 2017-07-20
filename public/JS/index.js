var socket = io();

socket.on('connect', ()=>{
    console.log(`Connection to the server is up and running`)

    socket.emit('createMessage', "This is a new message");

    socket.on('newMessage', (message)=>{
        console.log(message);
    })
});

socket.on('disconnect', ()=>{console.log(`Connection Interrupted`)});

