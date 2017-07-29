
class Users{
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {
            id, 
            name, 
            room
        };
        this.users.push(user);
    }
    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id != id );
        }
        return user;
    }
    getUser(id){
        var user = this.users.filter((user)=> user.id === id );
        return user;
    }
    getUserList(room){
        var userArray = this.users.filter((user)=> user.room === room);
        var namesArray =userArray.map((user)=> user.name );
        return namesArray;
    }
}


// var user = new Users();

// user.addUser(1, 'Himanshu','A');
// user.addUser(2, 'Chetan', 'A');
// user.addUser(3, 'Harshit', 'A');
// user.removeUser(2);
// console.log(user.getUserList('A'));
// console.log(user.getUser(3));


module.exports = {Users};