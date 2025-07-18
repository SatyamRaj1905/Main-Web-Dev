const express = require("express")

const app = express()

app.use(express.json())

const users = []

function generateToken() {
  let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9'];

  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }

  return token;
}

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
        const token = generateToken();
        user.token = token  
        res.json({
            token : token,
        })
    }else{
        res.status(403).send({
            msg : " Invalid Username or Password ", 
        })
    }
})
// making the assignment creating an authenticated end point
app.get("/me", function(req, res){
    const token = req.headers.token 
    // const token = req.query.token will make your token vulnerable i mean user has to send it via the url which anyone can see so thats why user will send it to the headers which has a key called token where you will paste its token at the time of generating in signin so it will we will check this token only 
    const user = users.find( (u) => {
        if(u.token === token){
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