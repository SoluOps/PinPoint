const router = require("express").Router();
const Points = require("../models/Points");

// API interface for the points (contains the REST API commands for the points section in backend)

// create a point

// req,res = request,response

router.post("/", async (req,res) => {
    const newPoint = new Points(req.body);
    try {
        const savedPoint = await newPoint.save();
        res.status(200).json(savedPoint); // Testing by sending back data of saved point
    } catch (error) {
        res.status(500).json(error);
    }
});


// async and await used as waiting for data to save in db takes time
// programs continues but there is a loop that keeps waiting for the data to come
// whilst boiling water, toast bread and scramble eggs, boiled water done then make tea

// 500 - server-side issue
// 200 - request success


// get all points
router.get("/", async (req,res) => {
    try {
        points = await Points.find();
        res.status(200).json(points); // Testing by sending back data of saved point
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;