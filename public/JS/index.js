

var socket = io();

socket.on('connect', ()=>{
    console.log(`Connection to the server is up and running`)

    socket.on('newMessage', (message)=>{
        console.log(message)
        $("#messages").append(`<li>${message.from} : ${message.text}</li>`);
        $(`input[name="message"]`).val('');
    })
});


// import $ from 'jquery';

$("#message-form").on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from : "User",
        text : $(`input[name="message"]`).val()
    }, function(data){console.log(data)})
})


socket.on('disconnect', function(){
    console.log(`User disconnected`);
})