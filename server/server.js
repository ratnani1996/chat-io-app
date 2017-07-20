const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
//custom libraries
var {iofunctionality} = require(path.join(__dirname , 'socket-app.js'));
//create express app
var app = express();
//create a public path 
const publicPath = path.join(__dirname , '..' , 'public');
app.use(express.static(publicPath));

//create an http server
const server = http.createServer(app);
//use socket.io
var io = socketIO(server);

iofunctionality(io);


//create a PORT property
const PORT = process.env.PORT || 3000;
//listen to the server
server.listen(PORT , ()=>{console.log(`Listening to port ${PORT}`)});