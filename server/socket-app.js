
function iofunctionality(io){
    io.on('connection', (socket)=>{
        console.log(`User connected`);

        socket.on('createMessage', (message)=>{
            console.log(message);
            io.emit('newMessage', message);
        })

        socket.on('disconnect', ()=>{console.log(`User disconnected`)});
    })
}

module.exports = {iofunctionality};