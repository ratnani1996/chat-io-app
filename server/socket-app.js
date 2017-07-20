
function iofunctionality(io){
    io.on('connection', (socket)=>{
        console.log(`User connected`);

        socket.emit('newMessage', "WELCOME to the chat app from ADMIN");
        socket.broadcast.emit('newMessage', "New user has joined the room");

        socket.on('createMessage', (message)=>{
            console.log(message);
            // io.emit('newMessage', message);
            // socket.broadcast.emit('newMessage', {message});
        })

        socket.on('disconnect', ()=>{
            console.log(`User disconnected`)
            socket.broadcast.emit('newMessage', "One user has diconnected");
        });
    })
}

module.exports = {iofunctionality};