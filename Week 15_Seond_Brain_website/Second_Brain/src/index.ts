import express  from "express"
import {z} from "zod"
import bcrypt from "bcrypt"
import { contentModel, userModel } from "./db.js";
import dotenv from "dotenv"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { userMiddleware } from "./middleware.js";



const app = express();
const saltRounds = 10

app.use(express.json());

dotenv.config()

async function startServer() {
  if (!process.env.MONGO_DB_URI) {
    throw new Error("MONGO_DB_URI not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

startServer();

// Register routes
app.post("/api/v1/signup", async (req, res) => {

  // Adding the zod validation 
  const requireBody = z.object({
    username : z.string().min(3).max(10),
    password : z.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  })

  const parsedDataWithSuccess = requireBody.safeParse(req.body)

  if(!parsedDataWithSuccess.success){
    return res.json({
      message : "Incorrect Format of Input"
    })
  }

  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    await userModel.create({
      username : username,
      password : hashedPassword
    })
    
    return res.status(200).json({
      message : "You are signed up"
    })

  } catch (error) {
    return res.status(401).json({
      message : "Sorry not able to signup"
    })
    
  }
});

app.post("/api/v1/signin", async(req, res) => {
  const username = req.body.username
  const password = req.body.password

  // Checking first only if the user exists on the database
  const userExist = await userModel.findOne({
    username : username
  })

  if(!userExist){
    return res.status(404).json({
      message : "Username not exists please sign up first"
    })
  }
  // Else now match the password also 
  const passwordMatch = await bcrypt.compare(password, userExist.password)
  if(passwordMatch){ // as username and password both are verified so now generate the token
    const token = jwt.sign({
      id : userExist._id
    }, process.env.JWT_SECRET_USER as string)
    return res.status(200).json({
      message : "You are signed in",
      token : token
    })
  }
  else {
    return res.status(403).json({
      message : "Incorrect Credentials"
    })
  }
})

app.post("/api/v1/content", userMiddleware, async(req, res) => {
  const link = req.body.link
  const type = req.body.type
  const title = req.body.title
  await contentModel.create({
    link,
    type,
    title,
    // @ts-ignore
    userId : req.userId,
    tags : [] // for now lets leave it empty
  })
  return res.json({
    message : "Content added"
  })
})

// Endpoint for fetching the user content

app.get("/api/v1/content", async (req, res) => {
  // @ts-ignore
  const userId = req.userId
  const content = await contentModel.find({
    userId : userId
  }).populate("userId", "username")

  return res.json({
    content
  })

})

// Adding the Delete endpoint 

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId
  
  await contentModel.deleteMany({
    contentId,
    // @ts-ignore
    userId : req.userId
  })

  return res.json({
    message : "Deleted successfully"
  })
})




app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
