const mongoose = require("mongoose");

// Points datatable

const PointsSchema = new mongoose.Schema(
 { 
    username: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
        min: 1,
        max: 50,
    },
    point: {
        type: String,
        require: true,
        min: 1,
        max: 100,
    },
    x:{
        type:Number,
        require: true,
    },
    y:{
        type:Number,
        require: true,
    },
 },
 {timestamps: true}
);

module.exports = mongoose.model("Points", PointsSchema);