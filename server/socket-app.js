const path = require('path');
var {generateMessage} = require(path.join(__dirname , 'utils' , 'messages.js'));

function iofunctionality(io){
    io.on('connection', (socket)=>{
        console.log(`User connected`);

        //emit message to the user for connection
        socket.emit('newMessage', generateMessage("Admin" , "Welcome to the chat application"));
        //emit message to every single user
        socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));

        socket.on('createMessage', (message , callback)=>{
            console.log(message);
            io.emit('newMessage', generateMessage(message.from , message.text))
            callback('Got it')
        })

        socket.on('disconnect', ()=>{
            console.log(`User disconnected`)
            //emit message when a user gets disconnected
            socket.broadcast.emit('newMessage', generateMessage("Admin", "One user disconnected"));
        });
    })
}

module.exports = {iofunctionality};