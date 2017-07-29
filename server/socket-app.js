const path = require('path');
var {generateMessage , generateLocationMessage, generateErrorLocationMessage} = require(path.join(__dirname , 'utils' , 'messages.js'));
var {validateStr} = require(path.join(__dirname , 'utils' , 'validation.js'));

function iofunctionality(io){
    io.on('connection', (socket)=>{
        console.log(`User connected`);

        

        //send a new message
        socket.on('createMessage', (message, callback)=>{
            io.emit('newMessage', generateMessage(message.from , message.text))
            callback("Got it");
        })
        
        //send location if found
        socket.on('sendLocation', (position)=>{
            io.emit('displayLocation', generateLocationMessage("Admin" , position));
        })
        //send location if not found
        socket.on('sendLocationError', (positionError)=>{
            io.emit('displayLocationError', generateErrorLocationMessage("User", "This is a location"))
        })

        //user joined the room
        socket.on('join', (params, callback)=>{
            console.log(params);
            //if there is no error params are valid
            if(validateStr(params.name) && validateStr(params.room)){
                
                socket.join(params.room);

                //io.emit -> io.to(`The office fans`).emit //emits to every single user in the room
                //socket.emit -> socket.to(`The Office fans`).emit //emits to the user only
                //socket.broadcast.emit -> socket.broadcast.to(`The office fans`).emit // emits to every user but the joined user
                //emit message to the user for connection

                socket.emit('newMessage', generateMessage("Admin" , "Welcome to the chat application"));
                //emit message to every single user
                socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));
                callback();     //coz there is no error and on client side it accepts error only
            }
            else //if there is an error
                callback(`Error Connecting to the room`); //only 1 argument coz on client side it accepts only 1 argument

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