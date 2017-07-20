var socket = io();

socket.on('connect', ()=>{
    console.log(`Connection to the server is up and running`)
    
    socket.on('newMessage', (message)=>{
        console.log(message);
    })
});

socket.on('disconnect', ()=>{console.log(`Connection Interrupted`)});

