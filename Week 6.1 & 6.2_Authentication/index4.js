const express = require("express")
const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json())

const JWT_SECRET = "satyamisgood"

const users = []

function auth(req, res, next){
    const token = req.headers.token
    // more stricter check (upto you want to use or not)
    // user has not send the token
    if(!token){
        res.json({
            msg : " Give me the Token first ",
        })
        return
    }
    const decodedData = jwt.verify(token, JWT_SECRET)

    // main check
    if(decodedData.username){
        req.username = decodedData.username
        next()
    }else{
        res.json({
            msg : " Not able to Log in "
        })
        return
    }
}

// to solve the problem of CORS
// __dirname -> saves your current directory
app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/signup", function(req, res){
    const username = req.body.username 
    const password = req.body.password
    
    if(users.find( (u) => u.username == username)){
        res.json({
            msg : "User already exists with this username take another username",
        })
        return;
    }

    if(username.length < 5){
        res.json({
            msg : "Your username is too small"
        })
        return;
    }
    
    users.push({
        username : username,
        password : password
    })
    res.json({
        msg : "Hey You have signed up successfully Enjoy !!!",
    })
})

app.post("/signin", function(req, res){
    const username = req.body.username
    const password = req.body.password  
    const user = users.find( (u) => {
        if(u.username == username && u.password == password){
            return true
        }else{
            return false;
        }
    })
    if(user){
        const token = jwt.sign({
            username : username,
        }, JWT_SECRET, {
            expiresIn : "1d",
        })
        res.json({
            token : token
        })
        // sending the response in BODY as well as sending it in Headers
        res.header("jwt", token)       
    }else{
        res.status(403).send({
            msg : " Invalid Username or Password ", 
        })
    }
})

app.get("/me", auth, function(req, res){ 
    // auth logic has been moved up only do what you really are made to do
    const user = users.find( (u) => {
        if(u.username === req.username){
            return true
        }else{
            return false
        }
    })

    if(user){
        res.send({
            username : user.username,
            password : user.password
        })
    }else{
        res.status(403).send({
            msg : " Bhai badam khaya kr kuch yaad nhi tujhe "
        })
        return
    }
})

app.listen(3000)
