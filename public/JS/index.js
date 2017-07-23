

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
//on clicking send the message 
$("#message-form").on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from : "User",
        text : $(`input[name="message"]`).val()
    }, function(data){console.log(data)})
})
//on clicking send loation send the location 
$("#submit-location").on('click', function(e){
    if(!navigator.geolocation){
        alert(`Unable to fetch location`);
    }
    else{
        navigator.geolocation.getCurrentPosition(function(position){
            //send the location if found
            socket.emit('sendLocation', {
                latitude : position.latitude,
                longitude : position.longitude
            })
        }, function(err){   //send the location if not found
            socket.emit('sendLocationError' , "This is a position");
        } , {timeout:10000})
    }
})
//display the position if found
socket.on('displayLocation', function(data){
    $("#messages").append(`<li>${data.from} : ${data.url}</li>`);
})

//display the position if not found
socket.on('displayLocationError', function(data){
    $("#messages").append(`<li>${data.user} : ${data.position}</li>`);
})


//when the user disconnects
socket.on('disconnect', function(){
    console.log(`User disconnected`);
})