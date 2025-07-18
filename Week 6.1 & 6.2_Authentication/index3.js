const express = require("express")

const app = express()

app.use(express.json())

const users = []

app.post("/signup", function(req, res){
    const username = req.body.username 
    const password = req.body.password
    
    if(users.find((u) => u.username == username)){
        res.send({
            msg: "Use other username this is  already taken"
        })
        return
    }

    if(username.length < 5){
        res.json({
            msg : "Your username is too small"
        })
        return;
    }
    if(users.find( (u) => u.username == username)){
        res.json({
            msg : "User already exists",
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
        }, JWT_SECRET)
        res.json({
            token : token
        }) 
        // sending the response in BODY as well as sending it in Headers
        res.header("jwt", token)

        res.header("random", "harkirat")       
    }else{
        res.status(403).send({
            msg : " Invalid Username or Password ", 
        })
    }
})

app.get("/me", function(req, res){
    const token = req.headers.token 
    const decodeInfo = jwt.verify(token, JWT_SECRET)
    const username = decodeInfo.username

    const user = users.find( (u) => {
        if(u.username === username){
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
    }
})

app.listen(3000)