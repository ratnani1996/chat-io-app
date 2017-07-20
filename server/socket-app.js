
function iofunctionality(io){
    io.on('connection', (socket)=>{
        console.log(`User connected`);

        socket.emit('newMessage', "This is a new message");

        socket.on('createMessage', (message)=>{
            console.log(message);
        })

        socket.on('disconnect', ()=>{console.log(`User disconnected`)});
    })
}

module.exports = {iofunctionality};