const express = require('express')

const app = express();

var users = [{
    name : "John",
    kidneys : [{
        healthy : false,
    }, {
        healthy : true, 
    }]
}]

app.use(express.json())

app.get("/", function(req, res){
    const johnKidneys = users[0].kidneys;
    console.log(johnKidneys);  
    const noOfKidneys = johnKidneys.length

    let numberOfHealthyKidneys = 0;

    for(let i = 0; i < johnKidneys.length; i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnHealthyKidneys = noOfKidneys - numberOfHealthyKidneys;

    res.json({
        noOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
    })

})

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidney.push({
        healthy : isHealthy,
    })

    res.json("Done adding the kidney")
})

app.put("/", function(req, res){

    for(let i = 0; i < users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true; 
    }
    res.json({})  // 2
})

function toCheckUnHealthyLeft(){
    let atleastOneUnhealthy = false;
    for(let i = 0; i < users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthy = true;
        }
    }
    return atleastOneUnhealthy; 
}

app.delete("/", function(req, res){
    if(toCheckUnHealthyLeft){
        const newKidneys = [];  
        for(let i = 0; i < users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy:true,
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg : "done",
        })
    }else{
        res.sendStatus(411);  // 411 is for sending the Errorneous data
        // or
        res.status(411).json({
            msg:"You have no bad kidney left",
        })
    }    
})

app.listen(3000);


