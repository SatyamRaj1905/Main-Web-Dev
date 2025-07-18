const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const { UserModel, TodoModel } = require("./db")
const { z } = require("zod")

const JWT_SECRET = "satyamisgood"
mongoose.connect() // Remember to enter the Mongo URI here to connect to the database while running this code

const app = express()
const saltRounds = 5

app.use(express.json()) // for safely parsing the body

let errorThrown = false; // made a flag to avoid crash
app.post("/signup", async (req, res) => {
    // Input validation section
    // step 1 -> defining the schema
    const requireBody = z.object({
        email : z.string().min(3).max(100).email(),
        password : z.string().min(3).max(100),
        name : z.string()
    })

    // Step 2 -> validating with the above made schema
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    // as safeparse returns two thing out of which i have only work with success one
    if(!parsedDataWithSuccess.success){
        res.json({
            message : "Incorrect format",
            error : parsedDataWithSuccess.error, // to let the user know in which field they made mistake while giving the input
        })
        return
    }

    // If the above validation has happened then only STORE THE VALUE IN THE VARIABLE otherwise no need to store in the variable

    const email = req.body.email
    const password = req.body.password
    const username = req.body.username
    try{
        const hashedPassword = bcrypt.hash(password, saltRounds)

        await UserModel.create({
            email : email,
            password : hashedPassword,
            name : username,
        });

    } catch(e) {
        res.json({
            message : " User already exists "
        })
        errorThrown = true;
    }
    
    if(!errorThrown){
        res.json({
            message : " You are signed up "
        })
    }
})

app.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.find({
        email : email,
        // password : password // no need when you are hashing
    })

    // stricter check -> user exists or not
    if(!user){
        res.status(403).json({
            message : "User does not exist in the database",
        })
        return
    }

    // if exists then verify or compare the hashed password using bcrypt.compare()
    const passwordMatch = await bcrypt.compare(password, user.password)

    if(passwordMatch){
        const token = jwt.sign({
            id : user._id
        },JWT_SECRET)
        res.status(200).json({
            token : token,
            message : "You are logged In"
        })
        
    }else{
        res.status(403).json({
            message : "Incorrect Credentials",
        })
    }
})

function authMiddleware(req, res, next){
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    // see jwt.sign() function you have given id 
    if(decodedData){
        req.userId = decodedData.id; // id present in the token passed to the other function that this is the id of the user whom something they want to do
        next()
    }else{
        res.status(403).json({
            message : "Incorrect Credentials or Secret Key",
        })
    }
}

app.post("/todo", authMiddleware,async(req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    await TodoModel.create({
        userId,
        title,
        done
    })

    res.json({
        message : "To Do created"
    })

})

app.get("/todos",authMiddleware, async (req, res) => {
    const userId = req.userId;
    const todothing = await TodoModel.find({
        userId
    })

    res.json({
        todothing : todothing,
    })

})

app.listen(3000)