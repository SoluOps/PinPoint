const mongoose = require("mongoose");

// Users datatable

const UsersSchema = new mongoose.Schema(
 { 
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        min: 11,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 20,
        unique: true,
    },
    
 }, {timestamps: true}
);

module.exports = mongoose.model("Users", UsersSchema);
