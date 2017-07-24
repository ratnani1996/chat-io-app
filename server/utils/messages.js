
var generateMessage = (from , text)=>{
    return {
        from,
        text,
        createdAt : new Date().getTime()
    };
}


var generateLocationMessage = (from , position)=>{
    return {
        from,
        url : `https://google.com/maps?q=${position.latitude},${position.longitude}`,
        createdAt : new Date().getTime()
    }
}


module.exports = {generateMessage, generateLocationMessage};