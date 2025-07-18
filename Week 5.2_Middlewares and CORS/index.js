const express = require("express");

const app = express();

// logs the method, url, and timestamp of every request coming


function loggerMiddleware(req, res, next){
    console.log(`Method is ${req.method}`)  // req.method function is used to get the METHOD type of request coming.
    console.log(`Route is ${req.url}`)  // req.url function is used to get the ROUTE where  the request came
    console.log(`Host is ${req.hostname}`)  // req.url function is used to get the URL from where the request came
    // YOU CAN GOOGLE THEM IF YOU DONT KNOW ITS FINE
    console.log(`Timestamp of the request is ${new Date()}`)  // this you know already

    next()
}

app.use(loggerMiddleware)

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);