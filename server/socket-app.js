const path = require('path');
var {generateMessage} = require(path.join(__dirname , 'utils' , 'messages.js'));

function iofunctionality(io){
    io.on('connection', (socket)=>{
        console.log(`User connected`);

        //emit message to the user for connection
        socket.emit('newMessage', generateMessage("Admin" , "Welcome to the chat application"));
        //emit message to every single user
        socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));

        //send a new message
        socket.on('createMessage', (message, callback)=>{
            console.log(message);
            io.emit('newMessage', generateMessage(message.from , message.text))
            callback("Got it");
        })
        
        //send location if found
        socket.on('sendLocation', (position)=>{
            io.emit('displayLocation', position);
        })
        //send location if not found
        socket.on('sendLocationError', (positionError)=>{
            io.emit('displayLocationError', positionError)
        })

        //when the user disconnects
        socket.on('disconnect', ()=>{
            console.log(`User disconnected`)
            //emit message when a user gets disconnected
            socket.broadcast.emit('newMessage', generateMessage("Admin", "User disconnected"));
        });
    })
}

module.exports = {iofunctionality};