const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

// user schema

const User = new Schema({
    email : {type : String, unique : true},
    password : String,
    name : String
})

// todo schema

const Todo = new Schema({
    userId : ObjectId,
    title : String,
    done : Boolean
})

const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)

module.exports({
    UserModel : UserModel,
    TodoModel : TodoModel
})