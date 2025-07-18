const express = require("express");

const app = express();

// made a middleware as this thing is happening in every operation of the assignment

function checkNumberOrNot(req, res, next){
    const a = Number(req.query.a)
    const b = Number(req.query.b)

    if(!isNaN(a) && !isNaN(b)){
        req.a = a;
        req.b = b;
        next()
    }else{
        res.json({
            msg: "Peet denge samjha na"
        })
    }
}

// handles divide individually as i have to handle one more case that is divided by 0 in denominator will give infinite

function divideMiddleware(req, res, next){
    const a = Number(req.query.a)
    const b = Number(req.query.b)

    if(!isNaN(a) && !isNaN(b) && b != 0){
        req.ans = a/b;
        next()
    }else{
        res.json({
            msg: "Krega badmashi shi datatype deta h ki nhi"
        })
    }
}

// used functionality of app.use() as no need to pass it individually in each of the routes
app.use(checkNumberOrNot)


app.get("/multiply", function (req, res) {
    res.send(`Your given answer multiplies to give ${req.a * req.b}`);
});
app.get("/add", function (req, res) {
    res.send(`Your given answer adds to give ${req.a + req.b}`);
});
app.get("/divide", divideMiddleware, function (req, res) {
    res.send(`Your given answer divides to give ${req.ans}`);
});
app.get("/subtract", function (req, res) {
    res.send(`Your given answer subtracts to give ${req.a - req.b}`);
});

app.listen(3000);
