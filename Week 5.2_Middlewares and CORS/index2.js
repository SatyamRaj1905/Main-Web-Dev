const express = require("express")

const app = express()

app.use(express.json())  // without using this req.body will be undefined

app.post("/sum", function(req, res){
    const a = parseInt(req.body.a)
    const b = parseInt(req.body.b)

    res.json({
        sum : a + b,
    })

})

app.listen(3000)