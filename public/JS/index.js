var socket = io();

socket.on('connect', ()=>{
    console.log(`Connection to the server is up and running`)
    
    socket.on('newMessage', (message)=>{
        console.log(message)
    })

    
});


socket.emit('createMessage', {
        from : "Harshit",
        text : "This is a random text"
}, (acknowledgement)=>{console.log(acknowledgement)});

socket.on('disconnect', ()=>{console.log(`Connection Interrupted`)});

