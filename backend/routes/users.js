const router = require("express").Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");

// register

// creating from a model schema is kinda like a class (object)

// router.post tells server how to handle POST requests

router.post("/register", async (req,res) => {
    try {
        
        // generate hashed password
        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new Users({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
        });

        // save user and send response 
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(500).json(error);
    }
});

 
// login 
router.post("/login", async (req,res) => {
    try{

    const user = await Users.findOne({username: req.body.username});

    // If user not found, send 400 response and stop execution
    if (!user) {
        return res.status(400).json("Wrong username or password!"); // Add return to stop execution
    }

    // Validate password (compare entered password with hashed password in database)
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json("Wrong username or password!"); // Add return to stop execution
    }
        // send response
        res.status(200).json({_id:user.id, username:user.username});
    }catch(error){
        res.status(500).json(error);
    }

});



module.exports = router;