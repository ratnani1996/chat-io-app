



function scrollToBottom(){
    //messages
    var message = $('#messages')
    var lastMessage = message.children('li:last-child');
    //heights
    var scrollHeight = message.prop('scrollHeight');
    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var messageHeight = lastMessage.innerHeight();
    var secondLastMessage = lastMessage.prev().innerHeight();
    if(clientHeight + scrollTop + messageHeight + secondLastMessage >= scrollHeight){
        message.scrollTop(scrollHeight);
    }

}



var socket = io();

socket.on('connect', ()=>{
    console.log(`Connection to the server is up and running`)
    var params = $.deparam(location.search);
    //join room and send data to the server
    socket.emit('join', params , function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else{
            console.log(`No error`);
        }
    })
});

socket.on('newMessage', (message)=>{
    console.log(message)
    var template = $("#message-template").html();
    var html = Mustache.render(template,{
        from : message.from,
        text : message.text,
        createdAt : message.createdAt
    } )
    $("#messages").append(html);
    $(`input[name="message"]`).val('');
    scrollToBottom();
})

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
            console.log(position)
            //send the location if found
            socket.emit('sendLocation', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            })
        }, function(err){   //send the location if not found
            socket.emit('sendLocationError' , "This is a position");
        } , {timeout:10000})
    }
})
//display the position if found
socket.on('displayLocation', function(data){
    console.log(data)
    // $("#messages").append(`<li>${data.from} ${data.createdAt} : <a href="${data.url}" target="_blank">My location</a></li>`);
    var template = $("#location-template").html();
        var html = Mustache.render(template,{
            from : data.from,
            url : data.url,
            createdAt : data.createdAt
        } )
        $("#messages").append(html);
        $(`input[name="message"]`).val('');
        scrollToBottom();
})

//display the position if not found
socket.on('displayLocationError', function(data){
    // $("#messages").append(`<li>${data.from} ${data.createdAt} : ${data.text}</li>`);
    console.log(data)
        var template = $("#message-template").html();
        var html = Mustache.render(template,{
            from : data.from,
            text : data.text,
            createdAt : data.createdAt
        } )
        $("#messages").append(html);
        $(`input[name="message"]`).val('');
        scrollToBottom();

})


//when the user disconnects
socket.on('disconnect', function(){
    console.log(`User disconnected`);
})

