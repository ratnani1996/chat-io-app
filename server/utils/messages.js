const moment = require('moment');

var generateMessage = (from , text)=>{
    return {
        from,
        text,
        createdAt : moment(new Date().getTime()).format('h:mm a')
    };
}




var generateLocationMessage = (from , position)=>{
    return {
        from,
        url : `https://google.com/maps?q=${position.latitude},${position.longitude}`,
        createdAt : moment(new Date().getTime()).format('h:mm a')
    }
}

var generateErrorLocationMessage = (from, text)=>{
    return {
        from,
        text,
        createdAt : moment(new Date().getTime()).format('h:mm a')
    }
}


module.exports = {generateMessage, generateLocationMessage, generateErrorLocationMessage};