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
    // use a simple function here
    token += options[Math.floor(Math.random() * options.length)];
  }

  return token;
}

app.post("/signup", function(req, res){
    const username = req.body.username // First got the Username and password from the user given input given in the BODY as it is POST request
    const password = req.body.password

    // YOU CAN ENHANCE THE FUNCTIONALITY BY ADDING SOME SOLID CHECKS (declare it in middleware that will be more good)
    // adding a check that whether this username pehle se he exists krta h kya ? if yes, then block it from taking this username
    if(users.find((u) => u.username == username)){
        res.send({
            msg: "Use other username this is  already taken"
        })
        return
    }
    
    // adding a check that username should be more than 5 characters
    // play with this you can declare that on password also

    if(username.length < 5){
        res.json({
            msg : "Your username is too small"
        })
        return;
    }

    // Now One more thing is that if one user is present in the array and if again signup then that same user should not go again in array, AS IT WILL CREATE DUPLICATES so check that

    if(users.find( (u) => u.username == username)){
        res.json({
            msg : "User already exists",
        })
        return;
    }

    users.push({
        username : username, // then stored that in the InMemory made array
        password : password
    })

    res.json({
        msg : "Hey You have signed up successfully Enjoy !!!",
    })
})

// now i have to attach a token with every time they sign in
app.post("/signin", function(req, res){
    const username = req.body.username
    const password = req.body.password
    
    // check whether the user exists or not
    // 1 way -> Iterate over the whole array of users to find out the given username
    // 2 way -> use find function
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

app.listen(3000)