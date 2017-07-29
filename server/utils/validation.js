
var validateStr = (str)=>{
    if(typeof str === 'string' && str.trim().length > 0)
        return true;
    else
        return false;
}

module.exports = {validateStr};