import express from "express"
import {z} from "zod"
import bcrypt from "bcrypt"
import { userModel } from "./db.js";
import { hasRestParameter } from "typescript";


const app = express();
const saltRounds = 10

app.use(express.json());

let errorThrown = false

// Register routes
app.use("/api/v1/signup", async (req, res) => {

  // Adding the zod validation 
  const requireBody = z.object({
    username : z.string().min(3).max(10),
    password : z.string().max(8).min(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  })

  const parsedDataWithSuccess = requireBody.safeParse(req.body)

  if(!parsedDataWithSuccess.success){
    res.json({
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
    
    res.status(200).json({
      message : "You are signed up"
    })

  } catch (error) {
    res.status(401).json({
      message : "Sorry not able to signup"
    })
    
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
