const { Router } = require("express")
const { UserModel, PurchaseModel, CourseModel } = require("../db")
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { JWT_SECRET_USER } = require("../config")
const { userMiddleware } = require("../middleware/userAuth")

const userRouter = Router();
const saltRounds = 5

// let errorThrown = false;
userRouter.post("/signup", async (req, res) => {
    
    // Input / ZOD validation
    const requireBody = z.object({
        email : z.string().max(100).min(3).email(),
        password : z.string().max(50).min(6),
        firstName : z.string(),
        lastName : z.string()
    })
    
    const parsedDataWithSuccess = requireBody.safeParse(req.body)
    if(!parsedDataWithSuccess.success){
        res.json({
            message : "Incorrect Format",
            error : parsedDataWithSuccess.error,
        })
        return
    }
    const { email, password, firstName, lastName } = req.body

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    try {
        await UserModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            message : " sign up failed "
        })
        return       
    }
    // after hashing the password and then storing it to the database
    res.json({
        message : " You are signed up ",

    });   
});

userRouter.post("/login", async (req, res) => {

    const {email, password} = req.body
    // first check only email if exists in database
    const findUser = await UserModel.findOne({
        email : email
    })

    if(!findUser){
        res.status(403).json({
            message : "User Not found with this mail"
        })
        return
    }

    // Now checking password exists or not
    const passwordCheck = await bcrypt.compare(password, findUser.password)
    if(passwordCheck){
        const token = jwt.sign({
            id : findUser._id
        }, JWT_SECRET_USER)

        res.status(200).send({
            token : token,
            message : " You are Logged in "
        })
        return      
    }else{
        res.status(403).json({
            message : " Incorrect Credentials "
        })
        return
    }
})

userRouter.get("/purchases",userMiddleware, async (req, res) => {
    const userId = req.userId 

    const purchases = await PurchaseModel.find({
        userId : userId
    })

    // to get all the data associated with this as // 2 line se bas id's aayega course ka data nhi aayega
    const courseData = await CourseModel.find({
        _id : { $in : purchases.map(x => x.courseId)} // with the help of _id find / map all the data assciated with courseId
    })
  
    res.json({ 
        purchases, // 2
        courseData
    })
})

module.exports = {
    userRouter : userRouter
}