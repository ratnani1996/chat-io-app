

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
            $("#messages").append(`<li>${position}</li>`);
            console.log(position)
        }, function(err){
            console.log(err);
            // alert(`Unable to fetch location`)
        })
    }
})

socket.on('disconnect', function(){
    console.log(`User disconnected`);
})