const path = require('path');
var {generateMessage , generateLocationMessage, generateErrorLocationMessage} = require(path.join(__dirname , 'utils' , 'messages.js'));
var {validateStr} = require(path.join(__dirname , 'utils' , 'validation.js'));
var {Users} = require(path.join (__dirname , 'utils', 'users.js'));
var users = new Users();

function iofunctionality(io){
    io.on('connection', (socket)=>{
        console.log(`User connected`);

        

        
        
        

        //user joined the room
        socket.on('join', (params, callback)=>{
            params.room = params.room.toLowerCase();
            //if there is no error params are valid
            if(validateStr(params.name) && validateStr(params.room)){
                
                socket.join(params.room);
                users.removeUser(socket.id);
                users.addUser(socket.id, params.name, params.room);
                io.to(params.room).emit('updateUserList', users.getUserList(params.room));


                //io.emit -> io.to(`The office fans`).emit //emits to every single user in the room
                //socket.emit -> socket.to(`The Office fans`).emit //emits to the user only
                //socket.broadcast.emit -> socket.broadcast.to(`The office fans`).emit // emits to every user but the joined user
                //emit message to the user for connection
                //send location if found
                socket.on('sendLocation', (position)=>{
                    io.to(params.room).emit('displayLocation', generateLocationMessage(`${params.name}` , position));
                })
                //send location if not found
                socket.on('sendLocationError', (positionError)=>{
                    io.to(params.room).emit('displayLocationError', generateErrorLocationMessage(`${params.name}`, "This is a location"))
                })

                //send a new message
                socket.on('createMessage', (message, callback)=>{
                    io.to(params.room).emit('newMessage', generateMessage(`${params.name}` , message.text))
                    callback("Got it");
                })

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
            var user = users.removeUser(socket.id);
            if(user.length > 0){
                var getUserList = users.getUserList(user[0].room);
                socket.to(user[0].room).emit('updateUserList', getUserList);
                socket.to(user[0].room).emit('newMessage', generateMessage("Admin", `${user[0].name} has Disconnected`));
            }
        });
    })
}

module.exports = {iofunctionality};