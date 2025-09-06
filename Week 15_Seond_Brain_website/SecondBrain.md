# **Second Brain Project**

## **What we're building**
----------
<img src = "image.png" width=500 height=250>

## **Backend of the project**
----------

###  __Endpoints required__
----------


1. **Sign up**

Below is the hints to start making it  

POST /api/v1/signup

```javascript
{
  "username" : "harkirat"
  "password" : "123123"
}
```

**Constraints**

1. Username should be 3-10 letters
2. Password should be 8 to 20 letters, should have atleast one uppercase, one lowercase, one special character, one number 

**Response**

1. Status 200 - Signed up
2. Status 411 - Error in inputs 
3. Status 403 - User already exists with this username
4. Status 500 - Server Error 

2. **Sign in**

POST /api/v1/signin 

```javascript
{
  "username" : "harkirat",
  "password" : "123123"
}
```

Returns 

+ 200 

```javascript
{
  "token" : "jwt_token"
}
```

+ 403 - Wrong email password 
+ 500 - Internal Server error

3. **Add new content**

/api/v1/content 

```javascript
{
  "type": "document" | "tweet" | "youtube" | "link",
  "link": "url",
  "title": "Title of doc/video",
  "tags" : ["productivity", "politics", ...] // this part is slightly complicated see below the reason // 2 point 
}
```

**Adding a content will also make you to send your authorisation token first in the header**

**Explanation of `// 2` code**

So the reason for this to be slightly complicated is that **tags are DYNAMIC** (means they can be added new from the user end) 

A good usecase of above is that when you go to any job forms, they ask you for college details and if your college is not present in the list then they add that so that the next candidate which fills this form should be able to see your college from the option can choose it (hence it is made dynamic)

**List that grows by time**

4. **Fetching existing documents**(no pagination)

GET api/v1/content

```javascript
{
  "content" : [
    {
      "type": "document" | "tweet" | "youtube" | "link",
      "link": "url",
      "title": "Title of doc/video",
      "tags" : ["productivity", "politics", ...]
    }
  ]
}
```

will return **your content which means in the header of this endpoint, you have to send your authorisation token**

5. **Delete a document**

DELETE api/v1/content 

```javascript
{
  "contentId" : "1" 
}
```

Returns :-

1. 200 - Delete succeeded
2. 403 - Trying to delete a doc you don't own 

6. **Create a sharable link for your second brain**

POST /api/v1/brain/share

```javascript
{
  "share" : true,
}
```

Initially it will be false, if the user makes it true then make a **sharable link so that the user can share it to the whole world**

Returns 

```javascript
{
  "link" : "link_to_open_brain"  // a link to share the user idea or brain 
}
```

### **Schema (Database design)**
----------

<img src = "image-1.png" width=500 height=250>

The arrow is what is denoted as **relationship** (In sql they are called as FOREIGN KEY)

In the above -> `userId` is related to the `id` in the users table (so that pta chal jaye ki kis user ka `Content` h)

Same thing is true for `tags` 

**There will be 4 tables**

1. Users table
2. Content table
3. Sharable link table
4. Tags

**Hints**

__User schema__ 

```javascript
const userSchema = new Schema({
  username : {type : String, required : true, unique : true},
  password : {type : String, required : true}
})

export const userModel = model("User", userSchema)
```

**Tags Schema**

```javascript
const tagSchema = new Schema({
  title : {type : String, required : true, unique : true}
})

export const tagModel = model("Tag", tagSchema)
```

**Link Schema**

```javascript
const linkSchema = new Schema({
  hash : {type : String, required : true},
  userId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true} // 2
})

export const linkModel = model("Link", linkSchema)
```

**Explanation of `// 2` code**

Notice it is not of type `String` as you are **linking this to the `ObjectId` type present in mongoDB** (the `_id` which you see by default in mongoDb is of type `ObjectId` that why used here)

Now it is **Referring to the `User` table as relation h iska us table se**

**Content Schema**

```javascript
const contentTypes = ['image', 'video', 'article', 'audio'] // Extend as needed

const contentSchema = new Schema({
  link : {type : String, required : true},
  type : {type : String, enum : contentTypes, required : true},
  title : {type : String, required : true},
  tags : [{type : Types.ObjectId, ref : 'Tag'}], // 2
  userId : {type : Types.ObjectId, ref : 'User', required : true} // same as above Explanation
})

export const contentModel = model("Content", contentSchema)
```

:bulb:**What is `enum` ??**

-> `enum` simply means that it can have any values corresponding to the value given to it. For example -> here `enum` has value = `contentTypes` which means that `type` can be **apart from `String`, also be any of what is present in the `contentTypes`** (i.e. -> `image`, `video`, `article`, `audio`), other than this, nothing else can be there

If you dont want this much strict schema, remove it (only `String` type is enough)

**Explanation of `// 2` code**

**As inside this, we are not going to store the `String`, we are going to store a bunch of `ObjectId` referring to the `Tag` table and as there are bunch of them you will STORE IT IN ARRAY**

### **Bootstraping**
----------

**Step 1 ->** Initialise an empty typescript project 

```javascript
npm init -y
npm install -D typescript // as a dev dependency you should install it
npm tsc --init
```

**Step 2 ->** change `rootDir` and `outDir`

```javascript
"rootDir" : "./src"
"outDir" : "./dist"
```

**Step 3 ->** Install `Express` then to use it as the first dependency

```javascript
npm install express 
```

you should also use the below command as you will be using the `Express` using the `typescript` code so `express` should be able to understand it also

```javascript
npm install -D @types/express // this should be made dev dependent file as it only consists of declaration files written in typescript 
```

Similarly, installing the other dependencies (its not end here, maybe in the upcoming code we need to have more dependencies)

```javascript
npm install jsonwebtoken @types/jsonwebtoken
npm install mongoose
```

**Step 4 ->** Creating the `src` folder and inside it `index.ts` file, now **here comes the new thing which you will learn here about using EXPRESS IN TS** 

```javascript
import express, {Express, Request, Response} from "express" // 2

const app : Express = express()

app.get("/", (req : Request, res : Response) => {
    res.send("Hello from Express!")
})
```

**Explanation of `// 2` code**

Basically we have **Imported three TYPES -> `Express`, `Request` and `Response` which is being used in the `express` at above places as you can see**

We have not used the above thing and **if you want you can even ignore it, then also it will work as TYPESCRIPT was INFERRING the type of `app` present (so automatically `app` is taking the TYPES given above)**

**Another Approach ->** Creating the `routes` folder to store all the `routes` present in the project and then for using the **Routing in Express**, we will efficiently structure our project.

But lets for now stick to what we have learnt 

```javascript
import express from "express"

const app = express();

app.use(express.json());

// Register routes
app.post("/api/v1/signup", (req, res) => {
  

});

app.post("/api/v1/signin", (req, res) => {
  

});

app.post("/api/v1/content", (req, res) => {
  

});

app.get("/api/v1/content", (req, res) => {
  

});

app.delete("/api/v1/content", (req, res) => {
  

});

app.post("/api/v1/brain/share", (req, res) => {
  

});
app.delete("/api/v1/brain/:shareLink", (req, res) => {
  

});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

Connect to the `mongoDB` database now before proceeding to writing the **Schema** inside the `db.ts`

**Step 5 ->** Created the `db.ts` file inside the `src` folder for making **Schema**

```javascript
import {model, Schema} from "mongoose"

const userSchema = new Schema({
  username : {type : String, required : true, unique : true},
  password : {type : String, required : true}
})

export const userModel = model("User", userSchema) // you can also use module.exports = {userModel, and so on..} but this one is better
```

Now adding the logics to routes made above in `index.ts` along with the **ZOD validation**

```javascript
import express from "express"

const app = express();

app.use(express.json());

// Register routes
app.post("/api/v1/signup", (req, res) => {
  const useranme = req.body.username;
  const password = req.body.password;
  

});

app.post("/api/v1/signin", (req, res) => {
  

});

app.post("/api/v1/content", (req, res) => {
  

});

app.get("/api/v1/content", (req, res) => {
  

});

app.delete("/api/v1/content", (req, res) => {
  

});

app.post("/api/v1/brain/share", (req, res) => {
  

});
app.delete("/api/v1/brain/:shareLink", (req, res) => {
  

});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

**Step 6 ->** Creating the `middleware.ts` file inside the `src` folder to handle all the **middlewares**

```javascript

```

## **Extension of this project (Adding AI)** 
----------
:bulb:**You can add the AI capibilities inside this project so that the user can do some query and get the data from what is being present in the second brain database**

For this below is the architecture :-

<img src = "image-2.png" width=500 height=250>

The green box(`tweet`) lets say present in the second brain has some content regarding the query `What is trumps stance....` so now this question will be asked from the user side when they will go to the website and as the website will have a chat box where they will query these questions now these queries will go to the `http` server and **as the `http` server is not knowing anything**  so it will redirect it to the `chatgpt` **whose api is openly available for you and you can use this API to hit your query**

**Now there are two ways to hit the user query on chatgpt API**

+ Either __you directly give the query__
  + In this, `ChatGPT` will give all the answer possible for this query **from HIS PERSPECTIVE**
+ Or __you can give the queery with **some context** and then hit the `ChatGPT` API__
  + here the context will be the **green box `tweet`** (which contains some info. about the trumps stance (i.e. query)). **This will obviously be the better approach as now `ChatGPT` has some context and according to this only it will give the answer (YOUR PERSPECTIVE IS ALSO TAKEN INTO ACCOUNT)**\

You have to do something like this ->

<img src = "image-3.png" width=500 height=250>

:bulb:**How to find the relevant tweets links from the hell lot of data inside my database ??**

-> There are bunch of things you can do to achieve -

1. **Elastic Search ->** Very fast search for big datas

Link to official website -> [Elasticsearch](https://www.elastic.co/elasticsearch)

Elasticsearch is __basically a search and analytics engine.__ Think of it like a super-fast, smart "Google" for your own data.

__Core ideas__

+ __Index →__ like a database.

+ __Document →__ like a row in a database, but in `JSON` format.

+ __Query →__ how you ask Elasticsearch to find things.


2. **Vector databases embeddings**

If you have ever seen any **chat with pdf website or any RAGs websites, they are build on this architecture**

Forget about the `Vector databases` for now, first understand **What is `embeddings` ??**

There is a very famous video created by **Andrej karpathy** which deals with how to build GPT and there `embeddings` has been discussed in a good way ->

Link to the video -> [Build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY)

Long story short but do you know **How chatGPT works ??**

-> It is basically trained on a bunch of data which it gets from the internet but the main thing which helps it to get trained is what is called as **Embeddings**. 

>[!IMPORTANT]
> **Any text which you see can be converted to vectors and chatgpt understands this only**
>
> **So whenever any text or sentence comes to GPT, it gets converted to VECTORs using the EMBEDDINGs model being used by GPT**

<img src = "image-4.png" width=600 height=100>

Now notice the above pic, this is how GPT works -> **Text -----------> Numbers (vectors)** using the **embeddings model**. <span style="color:orange">**Notice wherever there is TRUMP in above pic (ex here -> in 1st and 2nd line) you can see similar VECTORs value V/S Some random words or text (ex here -> 3rd line (totally different))**</span>

>[!IMPORTANT]
> **Similar things always have similar vectors (or the embeddings being generated from them is SIMILAR)**

You can explore some channels like [3 Blue 1 Brown](https://www.youtube.com/@3blue1brown)

and specifically for the above explanation (which comes under the Transformers topic) **Transformers part** -> [3 Blue 1 Brown Transformers](https://www.youtube.com/watch?v=wjZofJX0v4M)

**Summary -> How this is going to help us ??**

-> So basically you will **convert all the data present inside the database via the embeddings and when it gets converted to vectors, YOU STORE THESE VECTORs** (which is called as VECTORs DATABASE) and now when the user query comes, you **convert the query into vector via embeddings model and then MATCH them with that present in your database**[<span style="color:orange">**The TOP(depends TOP 5 or TOP 10 or any number, depends on how accurate your results to be) most nearest matched query from the database according to what user's vectors looks like and then you will send this as context while hitting chatGPT API and thus reducing the work for chatGPT as well as getting only the relevent info. from the data present inside your database**</span>], hence achieving what you wanted to do.
>[!TIP]
> **Sbse pass jo v honge space dimension me from the user's vectors, they will be taken into account (i.e. will be most relevant for the output)**

:bulb:**What is vector ??**

-> The same thing which you have understood in the class 12th PCM (**Distance from the origin in all the three axis (x, y, and z)**). Now you have learnt that **Vector has 3 dimension and 4th dimension is Time (atleast for now what we have known)** but <span style="color:orange">**the vector here has nth dimensions**</span>

Now lets come back to the track where we left off and proceed further with the project   

### **Coding the `signup` endpoint**
----------

Writing the logic for `signup` endpoint inside the `index.ts`

```javascript
import express from "express"
import {z} from "zod"
import bcrypt from "bcrypt"
import { userModel } from "./db.js";
import dotenv from "dotenv"
import mongoose from "mongoose";


const app = express();
const saltRounds = 10

app.use(express.json());

dotenv.config()

// Writing the logic to connect to the database before anything else
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
  // First adding the schema 
  const requireBody = z.object({
    username : z.string().min(3).max(10),
    password : z.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  })

  // Then parsing the data
  const parsedDataWithSuccess = requireBody.safeParse(req.body)

  if(!parsedDataWithSuccess.success){
    return res.json({
      message : "Incorrect Format of Input"
    })
  }

  const username = req.body.username;
  const password = req.body.password;

  // Hashing the password
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Storing the information in the database
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

>[!CAUTION]
> **Always add `return` statement to every `res` code you write otherwise, the function will keep on running and the error will not be resolved forever**
>
> Ex -> you can see above `return res.json`, `return res.status(200).json({some data})`

Corresponding to the above user `db.ts` look like the below :-

```javascript
import  {model, Schema} from "mongoose"
const userSchema = new Schema({
  username : {type : String, required : true, unique : true},
  password : {type : String, required : true}
})

export const userModel = model("User", userSchema)
```

### **Running any `ts` project**

**Step 1 ->** Define the `"scripts"` for running the code of the project

going inside the `package.json` and then making the `"scripts"` section look like this 

```javascript
"scripts": {
  "build": "tsc -b",
  "start": "node dist/index.js",
  "dev": "npm run build && npm run start"
}
```
**Step 2 ->** go to the root folder and then just run the below command 

```javascript
npm run build // and then after this 
npm run start
```

### **Coding the `signin` endpoint**
----------

```javascript
app.post("/api/v1/signin", async(req, res) =>{
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
  // If the username match then now match the password also 
  const passwordMatch = await bcrypt.compare(password, userExist.password)
  if(passwordMatch){ // as username and password both are verified so now generate the token
    const token = jwt.sign({
      id : userExist._id
    }, process.env.JWT_SECRET_USER as string)
    return res.status(200).json({
      message : "You are signed in",
      token : token // and send the token
    })
  }
  else { // If not then return them Incorrect Credentials signal
    return res.status(403).json({
      message : "Incorrect Credentials"
    })
  }
})
```
### **Coding the `content` part**
----------
First making the `Content` table using its schema in the `db.ts`

```javascript
const contentTypes = ['image', 'video', 'article', 'audio'] // Extend the array if  needed

const contentSchema = new Schema({
  link : {type : String, required : true},
  type : {type : String, enum : contentTypes, required : true},
  title : {type : String, required : true},
  tags : [{type : mongoose.Types.ObjectId, ref : 'Tag'}],
  userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true}
})

export const contentModel = model("Content", contentSchema)
```
#### **Making the `POST /api/v1/content` endpoint**
----------

Logic for **adding the content** but there is an important point which should be noted and that is as this is **user-centric thing so you have to show the user their contents only** and for this we will have to <span style="color:orange">**introduce a middleware here**</span>

### **Coding the Middleware part**
----------
so to make the user see __their content only__, we will have to make `middleware.ts` file inside the `src` folder

```javascript
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Added the TYPES for the typesafety as we are now dealing with TYPESCRIPT
export const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers["authorization"];
    // Checking header aaya v h ya nhi
    if (!header) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = header.split(" ")[1]; // 2

    // Checking header ke andar token aaya ki nhi
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    if (!process.env.JWT_SECRET_USER) {
      throw new Error("JWT_SECRET_USER is not defined");
    }

    // Once the token is extracted then with the help of token and JWT_SECRET_USER we will verify the user 
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

    // @ts-ignore - extend Request type for userID // 2 ways -> EITHER you give the userId any types (Request suits here though) OR just ignore the error by writing @ts-ignore which we have done
    req.userID = decoded.id;

    next(); // if all things are great forward it to the page they were looking for
  } 
  catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
```

**Explanation of  `// 2` code**

>[!NOTE]
> about **`header.split(" ")[1]`**
>
> **Generally most APIs send `Authorization` header like the below**
> 
> `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
> 
> so `const header = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."` will look like this with the following value
> 
> `header.split(" ")` **GIVES AN ARRAY** `["Bearer","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."]`
> 
> **Taking index `[1]` extracts just the JWT**
> **`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`**

```javascript
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
```

### **Making the `GET api/v1/content` endpoint**
----------
Basically contains the logic for **fetching the data for the user content**, when the user is asking for their content, that logic we will write here

```javascript
app.get("/api/v1/content", async (req, res) => {
  // @ts-ignore
  const userId = req.userId
  const content = await contentModel.find({
    userId : userId
  }).populate("userId") // 2

  return res.json({
    content
  })

})
```

**Explanation of `// 2` code**

This was written to add the feature that **not only you get to see the `userId` but all the details realted to the `userId`(i.e. -> `username`, `password)`, AS WE HAVE RELATION WITH the `User` table so we are showing that by using the `// 2` line of code**

<img src = "image-5.png" width=320 height=200> <img src = "image-6.png" width=320 height=200>

In the left pic above, you can see that the `userId` is only being shown up, 

:bulb:**But what if i want ki iss userId ke dam pe users se related extra data v mil jaye ?**

-> To do the above task ->

1. **Either ek aur query request bhejo** OR 
2. **As we have created a RELATIONSHIP of the `content` table with `user` table hence we will take advantage of this** (above is what we have done)

in the right pic, you can see the benefit of using `// 2` code (see it you can see that we got the info stored in the `User` table also regarding the `userId`)

**BUT**

**There is a problem you can see clearly, you have also EXPOSED THE PASSWORD of the user to the frontend also**

so :bulb:**How to `populate` some parts of the table i have established the relationship with ??**

-> The answer lies within the **`.populate()` function itself**, if you will see, you will notice these things :-

1. **`path : string | string[]`**
2. **`select ?: string | any`**
3. **`model ?: string | Model<any, THelpers>`**
4. **`match ?: any`**

You can clearly see that **the second argument is the `the field` you want to display or filter out**

so instead of `// 2` line of code, write this -> 

```javascript
.populate("userId", "username password") // Isse username and password dono he show kr diya jayega 

.populate("userId", "username") // * Isse bas username he show hoga
```
and now if you re-run the code (using the `// *` code), you will see the following 

<img src = "image-7.png" width=400 height=230>

Only the `username` is being displayed and hence on the frontend also this will be displayed 

### **Making the `DELETE /api/v1/content` endpoint**
----------

At this endpoint, **User will be able to delete his/her content**

```javascript
app.delete("/api/v1/content", userMiddleware, async(req, res) => {
  const contentId = req.body.contentId

  await contentModel.deleteMany({
    contentId,
    // @ts-ignore
    userId : req.userId // written so that user bas apna delete kr paye kisi aur ka nhi
  })

  return res.json({
    message : "Deleted successfully"
  })
})
```

### **Making `POST ("/api/v1/brain/share")` endpoint**

This endpoint will have **the logic of sharing any content made by you to the others**

// This is ASSIGNMENT and you have to do this by yourself

Answer to the above assignment -> 

first making the **Schema for the LINK inside the `db.ts`**

```javascript
const linkSchema = new Schema({
  hash : String,
  userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true, unique : true} // defined relationship as discussed while designing the database
})

export const linkModel = model("Link", linkSchema)
```

Now coming back to the `index.ts` file and making the `/api/v1/brain/share`

**Made this endpoint POST because isme tm kuch na kuch data bhej rhe ho i.e. share kr rhe ho sbke sath**

```javascript
app.post("/api/v1/brain/share", userMiddleware, async(req, res) => {
  const share = req.body.share
  if(share){
    // Below is the logic to see that whether the link has already been generated for the user previously if yes then just return it from the link table why to create one ALSO AS OUR USER SHOULD HAVE ONLY ONE SHAREABLE LINK
    const existingLink = await linkModel.findOne({
      // @ts-ignore
      userId : req.userId
    })

    if(existingLink){
      return res.json({
        hash : existingLink.hash
      })
    }

    // If the user sharable link is not present in the database inside the link table then only proceed to generate the shareable link and store it inside the database
    const hashedLink = random(10) // used function random imported from "utils.ts" file see below for brief explanation
    await linkModel.create({
      hash :  hashedLink, 
      // @ts-ignore  
      userId : req.userId
    })
    return res.status(200).json({
      message : hash // Return the sharable link to the user
    })
  }else {
    await linkModel.deleteOne({
      // @ts-ignore
      userId : req.userId
    })

    return res.status(200).json({
      message : "Removed Link"
    })
  }
  
})
```

Now for the unique **shareable link for each user, you have generate the url which would be unique as same rha tb to CONFLICT occur kr jayega (2 user having same sharable link to kiska share hoga phir hence make it UNIQUE)**

<span style="color:orange">**For generation of unique sharable link, you have to make a HASH (i.e. string) which will be unique**</span>

and for making that we will create a seperate file for writing that logic which can be named as `src > utils.ts` inside which the below code exists ->

```javascript

// Below is just the function to generate a random string of certain length given as input
export function random(len : number){
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let ans = ""
    let length = options.length

    for(let i = 0; i < len; i++){
        ans = ans + options[Math.floor((Math.random() * length))]

    }
    return ans;
}
```

### **Making `GET ("/api/v1/brain/:shareLink")` endpoint**

This endpoint will have the **logic of deleting the sharelink or basically revoking the access given to any used to see our content using the link we have shared**

In simple words, **understand clearly UPAR ME HM APNE BRAIN KA SHARABLE LINK BNA RHE H AND HERE WE ARE WITH THE HELP OF THE LINK JO UPAR CREATE HUA H, KOI V USER HMARE BRAIN KO DEKH PAYE USING THAT LINK USKA LOGIC IMPLEMENT KR RHE H IN THIS ENDPOINT**

// This is ASSIGNMENT and you have to do this by yourself

As this should be completely OPEN endpoint, you dont have to **logged in to get the data or brain which the user has shared hence NOT ADDED `userMiddleware` in the below code**

```javascript
app.get("/api/v1/brain/:shareLink", async(req, res) => {

  const hashUser = req.params.shareLink // use .query for "?" and .params for ":"
  
  const link = await linkModel.findOne({
    hash : hashUser 
  }) 

  if(!link){
    return res.status(411).json({
      message : "Sharable link not correct"
    })
  }

  // userId to mil gya ab using the "hash" present in the link table and now using this we have to find its CONTENTS (HERE YOU WILL SEE THE POWER OF RELATIONSHIP IN MONGODB)
  const content = await contentModel.find({ // Content table me jo user corresponding user ka content h wo find kro and then uska content return kr do
    userId : link.userId
  })
  
  // Below is just the logic to return the user information also as upar me uska content return kiya h to uska personal info v de he do 
  const user = await userModel.findOne({
    _id : link.userId 
  })

  // We have just added an extra safe check below for the condition that lets say the user does not exists now (situation where user table se to data delete kr diya(user ne delete account kr diya) but corresponding to it, link table me entry nhi hta usse related then we might get error so to safe guard this) [Although you dont generally delete the data from the database and even so then you properly cascade that deletion]

  if(!user){
    return res.status(411).json({
      message : "User not found, error should ideally not happen"
    })
  }

  // also if you comment the above logic then ts will also start to complain on // 2 "user" that MAYBE USER CAN GET NULL so to solve that Either write above codeblock or // 2 type format

  return res.json({
    username : user.username, // 2 user?.username (this is known as OPTIONAL CHAINING) used to control the "null" statement
    content : content

  })
})
```

## **Frontend of the Project**
----------

### **Initializing the project**
----------

**Step 1 ->** As we will be using here `REACT` so

```javascript
npm create vite@latest
```

**Step 2 ->** Now do the remaining things required to setup the project 

<img src = "image-8.png" width=400 height=260>

**Step 3 ->** Installing all the dependancies 

```javascript
npm install
```

**Step 4 ->** Running the project 

```javascript
npm run dev 
```

### **What we have to design ??**
----------

Basically we have to make the below thing for our frontend part

<img src = "image-9.png" width=500 height=250>

>[!IMPORTANT]
> **Always the first step of making the react app is DIVIDING THE FRONTEND into components**

Dividing the components of the above frontend ->

<img src = "image-10.png" width=500 height=250>

**Basically the website consists of 4 components -> `Button`, `Card`, `Sidebar` and `SidebarItem`** so make the seperate file with their respective name with `.tsx` file 

Now starting off with the making of button (in the above `add content` and `share brain` one)

>[!TIP]
> **If your project is going to use one component often(there is very less difference between the components), make it GENERIC so that you can with minimal change using the previous logic can create the component easily**
>
> **This is how you REUSE the component and you do it this way only in INDUSTRY** <span style="color:orange">**called as UI Library (Ex -> Aceternity UI, ShadCN UI etc..)**</span>

so using the above tip, we will make the above button generic as similar he lg rha h `add content` and `share brain` button (means **SCHEMA SAME H DONO KA**, features, logo, color etc.. may change)

So we will try to make our own UI Library (mini one)

Starting off with making a seperate folder named as `src > components` and then inside which made folder `ui` and inside which i will have file named as `Button.tsx`


Writing the logic for the `Button.tsx` file to make a **generic button component to be re-used everywhere**

But before adding the ui library, first **we will install the tailwind to ease our work** 

**Adding the tailwind to the react project**

Just refer to the documentation -> [Taiwlindcss installation](https://tailwindcss.com/docs/installation/using-vite)

>[!IMPORTANT]
> <span style="color:orange">**For making a perfect UI library**</span> **See the documentation of open source projects like `dub.sh`**
>
> **Link to it -> [Dub.sh UI Library](https://github.com/dubinc/dub/tree/main/packages/ui/src)**


Now going inside the `Button.tsx` file made and **writing the logic to make the ui libray**

>[!TIP]
> **Always start with defining INTERFACE or TYPE (as per your wish) means what the BUTTON expects from the user**


following the above point and implementing it inside the `Button.tsx`

```javascript
interface ButtonProps {
  variant : "Primary" | "Secondary" // lets for now we have only two variant named as Primary(for dark) and Secondary(for light) 
  size : "sm" | "md" | "lg" // size can also vary -> sm (small), md (medium), lg(large)
  text : string 
  startIcon ?: any // 2 Icon which you see in front of "Add content" button ("+" icon) 
  endIcon ?: any // made OPTIONAL(above and this) as it may or may not be required (if you will not give "?" then typescript will start to complain if you will not give this while using this custom made button)
  onClick : () => void
}

// Whoever wants to use this Button component he/she must have to follow or give the above type 

export const Button = (props : ButtonProps) => { // Button takes some part as input and as it is of type ButtonProps so user will have to give all the properties present inside the ButtonProps to render this custom made button

  return <button></button>

}

<Button variant = "Primary" size = "md" onClick = {() => {}} text = {"Hello"} /> // although not given startIcon and endIcon still the typescript is not complaining
```
**Explanation of `// 2` code**

>[!CAUTION]
> **Avoid giving the type "any" in the typescript as user can now use anything (like text, string, etc..) but here we want something like image**
>
> **The best type here is `ReactElement`** (try to search and read about this type)

For icons part, go to the **icons documentation inside the tailwind css part**

Link to the above is -> [How to add icons in TailwindCSS](https://heroicons.com/)

and from the above website, you can add `as SVG` or `as JSX`, `SVG` **better as it is EASIER to scale means after zooming also, the icons will not lose their quality**

:bulb:**How to add icons inside the tailwind project ??**

-> Once you have copied the `SVG` format of the icon, **make a new folder named as `icons` inside the `src` folder**

and then inside that **make another file names as *`icon_name.tsx`* and **inside this just PASTE the `SVG` format of the icon you pasted from the website** 

and then **Wrap it in such a way that you have to export this component**

```javascript
export const PlusIcon = () => {
   return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
   </svg>
}
```
 
### **Making the `Card component`**
----------

Now if you see the `Card` component it basically has a **TOP** nav bar consisting of **logo, title, shareicon, deleteicon**, then comes the **MIDDLE** part consisting of **content**, then **HASH-TAG** part consisting of some of the hash-tags and finally **POSTED-ON** time and date.

#### **How to embed any youtube video in your project ??**

-> **Step 1 ->** First go to the video which you want to embed in the website 

**Step 2 ->** Now click on the share button and inside it (there you will also see the option **embed the video**) **click on that**

**Step 3 ->** You will get a **iframe** HTML tag with some code, **COPY it** will look something like the below -> 

```javascript
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/lPer78BkuGs?si=O6o24Nb3kONgREvB"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
></iframe>;
```
**Step 4 ->** After this, you have to **make some changes in it to make it work for your project**

```javascript
frameborder -> frameBorder
referrerpolicy -> referrerPolicy
allowfullscreen -> allowFullScreen  
```

>[!TIP]
> **Basically you have to convert all of them to CAMEL-CASE NOTATION (as easy as that)**

**Step 5 ->** Now just use this component as **normal component with some of the extra change you can do like ->**

```javascript
adding className to achieve tailwindcss

src={link
      .replace("watch", "embed") // This is done so that the video does not play it just embed as by default, if you will paste here any youtube video via url it will come with "watch" word so this line is for replacing that with "embed" word
      .replace("?v=", "/")} // "?v" is also in the link and hence you have to replace it with "/" to REDIRECT to that video
```

#### **How to embed tweeter chat into your project**

**Step 1 ->** First get to the post which you have to embed and then click on the __three dots of that post__

**Step 2 ->** Now you will se **embed post** option, click on that you will get the code just **copy it** and it will look something like the below

```javascript
<blockquote class="twitter-tweet">
  <p lang="zxx" dir="ltr">
    <a href="https://t.co/JvyafDdhTB">
      pic.twitter.com/JvyafDdhTB
    </a>
  </p>
  &mdash; Elon Musk (@elonmusk)
  <a href="https://twitter.com/elonmusk/status/1960712894019985678?ref_src=twsrc%5Etfw">
    August 27, 2025
  </a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>
```

**Explanation of the above code**

The codeblock consists of two tags -> `blockquote` and `script` Now for the component part, we have to use **only the `blockquote` part** and for the `script` part de the below steps

**Step 3 ->** Go inside the **Global `index.html` file** and then inside it just above the **`meta` and below the `link` tag, PASTE THE SCRIPT TAG part you got from copying the embed code from the tweeter** 

**Step 4 ->** For the `blockquote` part, paste it in the component inside which you want to render the tweet. and then make some changes as given below 

```javascript
<blockquote className="twitter-tweet"> // class replaced with className
    <a href="replace here with link of the post or make it dynamic if you want that data kahin aur se aake yahan render ho"></a>
</blockquote>
```

**After removing all the components and making the change, you will be able to see the tweet**

now making the `Card.tsx` file 

```javascript
// Card.tsx

import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
    return (
        <div className="scale-90 origin-top-left">
            <div className="bg-white p-2 border-1 border-slate-300 rounded-md fit-content shadow-md max-w-72 min-w-30 min-h-48 h-fit mt-6">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="pr-0.5 text-slate-500">
                            <ShareIcon size="sm" />
                        </div>
                        <div className="text-sm font-medium">{title}</div>
                    </div>
                    <div className="flex items-center gap-2.5 pr-2 text-slate-500">
                        <a href={link} target="_blank"> // adding target = blank helps to open the link in NEW BLANK TAB
                            <ShareIcon size="sm" />
                        </a>
                        <ShareIcon size="sm" />
                    </div>
                </div>
                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet w-full scale-90 origin-top-left">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}

```

>[!IMPORTANT]
> <span style="color:orange">**`scale-90 origin-top-left`**</span> -> **Property of tailwind css which works same as that which you often recieve while zooming in or out the normal website** [Apply on Parent div]
>
> <span style="color:orange">**`h-fit`**</span> -> **Property of tailwind css which will help to give only that much height to the content which will be enough to engulf the elements/component present inside it** [No extra space vertically Apply to Parent div]
>
> <span style="color:orange">*`w-full`**</span> -> **Property of tailwind css which is equivalent to width : 100% in css** [Apply to child element and it will take the width 100% width of the parent]



### **Making the `Add Content` functional**
----------

Clicking on the `Add Content` button a model should popup consisting of the FORM which has all the requirement to add a new content

so to achieve the above thing, lets make a `CreateContentModel.tsx` file in `src > components > ui` and inside this we will write the code to display the form if the button `Add Content` is clicked.

```javascript
import {useState} from 'react'
// We want this to make CONTROLLED COMPONENT 
export function CreateContentModel({open, onClose}) {
  const [modalOpen, setModelOpen] = useState(false) // Popup will open up

  return (
    <div>
      <CrossIcon onClick = (){
        setModelOpen(false)

      } />

    </div>
  )
}
```

**Controlled Component ->** In the end, if the user clicks on the `Add Content` button, a model will popup **and this open close will stored inside the state variable as you have re-render the dom as now the screen will have to show the model as popup**[It should be controlled by the user]

-> Above is also the reason for taking **`open, onClose` as input parameter**

Now the problem with the above code is that as **modelOpen is not defined here it is defined externally as this should be controlled by the user as "open" is coming as PROPS(from its PARENT) hence the above code will not work**

:bulb:**What we want ??**

-> If the user clicks `Add Content` button, a model should pop-up which consists of th form and it should also has **Croos Icon** so if the user clicks on the this then the user should again see the home page and the model should close

**So thats why you have to signal the PARENT that `onClose` function has been called (which gets called when user clicks on the `CrossIcon` present in the model) so please change the `open` value from back to `false`**

### **How to make a component appear over another component (MODEL)**
----------

**First you have to make the component which is going to appear just above the current component**

making it 

```javascript
export function CreateContentModel({ open, onClose }) {
    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed bg-slate-500/60 top-0 left-0  z-50 flex justify-center items-center"> // 2
                  
                  
                </div> 

            )}
        </div>
    );
}
```

**Explanation of `// 2` code**

-> simply means take the width of the screen not the parent and same with height staring from the whole TOP and LEFT and going till last with OPAQUE value = 60 (opacity) making it fixed will fix its position tm scroll kro kuch v kro to v ye yhi rhega

Now to achieve the **Opaque value** -> 

+ using **opacity-60(according to the need)** But the problem with this is that if you write in the `// 2` line then it will get **applied to the parent which is the form which will popup and hence the form will also become opaque** BUT we dont want it, the form should be **clearly visible** so use the second option
+ **using bg-slate-500/60** This will apart from providing the background color slate with value 500 it will also make that color with transperency 60 and hence you will now see that the form will be **clearly visible**

**Comparisons ->**

using `opacity-60` (left side) and `bg-slate-500/60` (right side)

<img src = "image-12.png" width=320 height=200> <img src = "image-11.png" width=320 height=200> 

+ Added the `z-50` line as **card pta nhi kyun but slate background pe aa jaa rha tha but actually it should come on the main page to model ko utha diya bas iski madad se**

Rest all `flex justify-center items-center` are **for the form that will be displyed on the middle if the model will appear**

#### **Styling the overlay component**

Now styling the component which is going to come as popup inside the `CreateContentModel.tsx` file

```javascript
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";

type CreateContentModelProps = {
    open : boolean
    onClose : () => void
}

// We want this to make CONTROLLED COMPONENT
export function CreateContentModel({ open , onClose} : CreateContentModelProps) {// 2
    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed bg-slate-500/60 top-0 left-0 z-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <div className="flex justify-end mb-8">
                            <div className="cursor-pointer" onClick={onClose}> // 3
                                <CrossIcon size="md" />
                            </div>
                        </div>
                        <div>
                            <Input onChange={() => {}} placeholder={"Title"} /> // see custom Input component below
                            <Input onChange={() => {}} placeholder={"Tags"} />
                            <Input onChange={() => {}} placeholder={"Link"} />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button
                                variant="Primary"
                                size="sm"
                                text="Submit"
                            ></Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

type InputProps = { 
    onChange : () => void
    placeholder : string
}
 
// Defined the Input component seperately as this needs to be reused multiple times in the project
export function Input({ onChange, placeholder }: InputProps) {
    return (
        <div>
            <input
                placeholder={placeholder}
                type="text"
                className="px-4 py-2 border-2 border-slate-200 rounded m-1"
                onChange={onChange}
            />
        </div>
    );
}
```
**Explanation of `// 2` code**

we have taken two props `open` and `onClose` passed to the component as INPUT as **these are user dependent entity SEE THE Controlled component theory written above**

For the `CrossIcon` make a seperate file named as `CrossIcon.tsx` inside the `src > components > icons` and then from the website of heroicon **copied the `SVG` file of the `CrossIcon` and then doing the same thing as you were doing with other icons**

```javascript
interface CrossIconProps {
    size: "sm" | "md" | "lg";
}

const sizeVariants = {
    sm: "size-3",
    md: "size-4",
    lg: "size-6",
};

export const CrossIcon = (props: CrossIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className={sizeVariants[props.size]}
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </svg>
    );
};
```

The final component looks something like this ->

<img src = "image-13.png" width=400 height=200>

### **Implementing the model popup feature when clicking on the `Add Content` button**

To make the model popup when clicking on the `Add Content` button and disappear when the `CrossIcon` present in the model is clicked, first of all we will make a **state variable to control the dom**

so inside the `App.tsx` file, adding the state variable and writing the logic to get the above thing happen 

```javascript
// App.tsx

import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Card } from "./components/ui/Card";
import { CreateContentModel } from "./components/ui/CreateContentModel";
import { useState } from "react";

function App() {
    const [modelOpen, setModelOpen] = useState(false); // Made a state variable to define whether the model is open or not, initially set to false as we dont want it to appear at start only above the home page
    return (
        <div className="p-4">
            <CreateContentModel
                open={modelOpen} // Passed the value as PROPS to the CreateContentModel
                onClose={() => { // Same as above
                    setModelOpen(false);
                }}
            ></CreateContentModel>

            <div className="flex justify-end">
                <Button
                    startIcon={<PlusIcon size="sm" />}
                    variant="Primary"
                    size="sm"
                    onClick={() => {setModelOpen(true)}} // 4
                    text={"Add Content"}
                />
                <Button
                    startIcon={
                        <div className="pr-0.5">
                            <ShareIcon size="sm" />
                        </div>
                    }
                    variant="Secondary"
                    size="sm"
                    onClick={() => {}}
                    text={"Share Brain"}
                    
                />
            </div>

            <div className="flex gap-1">
                <Card
                    type="twitter"
                    link="https://x.com/GlobeEyeNews/status/1960348787278328221"
                    title="Trump V/S Modi"
                />
                <Card
                    type="youtube"
                    link="https://www.youtube.com/watch?v=2MTST0bEkP0"
                    title="Trump V/S Modi"
                />
            </div>
        </div>
    );
}

export default App;
```

**Explanation of `// 4` code**
As we want ki jaise he `Add Content` button pe **click ho mera model popup ho** and hence this part is being done by `// 4` which will set the `modelOpen` value to `true` with the help of `setModelOpen` value set to `true` and hence this value will be passed to the `open` variable present in the `CreateContentModel.tsx` as **Props**

Now inside the `CreateContentModel.tsx`, they will get the values coming from `App.tsx` as props and then **as we want that if any one click on the `CrossIcon` button the popup should disappear** and hence writing the code for **Closing the model as `CrossIcon` is present inside this file only**

+ **Refer the `// 3` codeblock present in the `CreateContentModel.tsx` file [see above code is present]**

### **Making of the SideBar component**
----------

Making a seperate file `SideBar.tsx` inside the `src > components > ui`

```javascript
// Sidebar.tsx

import { BrainIcon } from "../../icons/BrainIcon";
import { TweeterIcon } from "../../icons/TweeterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { LogoutIcon } from "../../icons/LogoutIcon";
import { SidebarItem } from "./SidebarItem";
import { AllFileIcon } from "../../icons/AllFileIconl";
import { Button } from "./Button";


interface SidebarProps {
    currentFilter: "all" | "youtube" | "twitter";
    setFilter: (value: "all" | "youtube" | "twitter") => void; // for making the filter based on the category work
    onLogoutClick:() => void
}

export function Sidebar({ currentFilter, setFilter, onLogoutClick }: SidebarProps) {
    
    return (
        <div className="h-screen bg-white border-r-2 border-slate-300 w-64 fixed left-0 top-0 flex flex-col">
            <div className="pt-4 pl-4">
                <h1 className="pl-2 text-2xl pb-4 pt-2 font-semibold flex gap-4">
                    {<BrainIcon size="lg" />} MindVault
                </h1>
                <div className="mt-4 flex flex-col gap-2">
                    <SidebarItem
                        text="All"
                        icon={<AllFileIcon size="lg" />}
                        selected={currentFilter === "all"}
                        onClick={() => setFilter("all")}
                    />
                    <SidebarItem
                        text="Tweets"
                        icon={<TweeterIcon size="lg" />}
                        selected={currentFilter === "twitter"}
                        onClick={() => setFilter("twitter")}
                    />
                    <SidebarItem
                        text="Videos"
                        icon={<YoutubeIcon size="lg" />}
                        selected={currentFilter === "youtube"}
                        onClick={() => setFilter("youtube")}
                    />
                </div>
            </div>
            // Logout button is at the end of the screen
            <div className="mt-auto pb-6 flex justify-center">
                <Button
                    startIcon={<LogoutIcon size="md" />}
                    variant="Warning"
                    size="sm"
                    onClick={onLogoutClick}
                    text={"Logout"}
                />
            </div>
        </div>
    );
}
```

Making a generic `SidebarItem.tsx` file as the **filter portion have components common** so making that component

```javascript
// SidebarItem.tsx

import type { ReactElement } from "react";

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    selected?: boolean; // just for highlighting which filter is currently applied 
    onClick?: () => void;
}

export function SidebarItem({ text, icon, selected, onClick }: SideBarItemProps) {
    return (
        <div
            className={`flex items-center text-gray-700 pl-5 cursor-pointer max-w-58 rounded transition-all duration-200
            ${selected ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}
            onClick={onClick}
        >
            <div className="p-2 pb-1">{icon}</div>
            <div className="p-2 text-md">{text}</div>
        </div>
    );
}
```

The above component is what being used in the `Sidebar.tsx`

### **How to make the tweets load faster**
----------
Currently we are getting a problem and that is the tweets are loading too slow so to fix that you have to **embed the post like the below**

**Step 1 ->** Remove the `script` tag used for the tweet to show it in global `index.html` file

**Step 2 ->** Make a seperate file inside the folder where you want the tweets file to load, as here the tweets are loading inside the `Card.tsx` so making the folder named `TwitterScriptLoader.tsx` inside the same folder as that of `Card.tsx` which is `src > components > ui`

```javascript
// TwitterScriptLoader.tsx

import { useEffect } from "react";

export function TwitterScriptLoader() {
    useEffect(() => {
        // Only load once
        if (!(window as any).twttr) {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return null;
}
```

**Step 3 ->** and then at last **Just import it inside the `App.tsx`** and add the component inside just above the line in `App.tsx`

```javascript
import { Dashboard } from "./components/pages/Dashboard";
import { Signin } from "./components/pages/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./components/pages/Signup";
import { TwitterScriptLoader } from "./components/ui/TwitterScriptLoader";

function App() {
    return (
        <BrowserRouter>
            <TwitterScriptLoader /> // Just below the BrowserRouter tag you have to add this component
            <Routes>
                <Route path="/signup" element = {<Signup />} />
```

**Step 4 ->** Finally inside the `Card.tsx` as here eventually you are going to load the tweets so writing the below line of code

```javascript
export function Card({ id, title, link, type, onDelete }: CardProps) {
    // Ensure Twitter embeds are processed dynamically hence useEffect added
    useEffect(() => {
        if (type === "twitter" && (window as any).twttr?.widgets) {
            (window as any).twttr.widgets.load();
        }
    }, [link, type]);
```
**That it now you will notice that the tweets will load up faster then previous**

**Also as we are dealing with multiple pages so to make look CLEAN `App.tsx`, just add routes according to the page which it represent to**

for example here -> we have seperated out the **Main page** and made a seperate route named as `/dashboard` and hence for that made another file `Dashboard.tsx` inside which 

```javascript
// Dashboard.tsx

import "../../App.css";
import { Button } from "../ui/Button";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Card } from "../ui/Card";
import { CreateContentModel } from "../ui/CreateContentModel";
import { ConfirmDeleteModal } from "../ui/ConfirmDeleteModel";
import { useEffect, useState } from "react";
import { Sidebar } from "../ui/Sidebar";
import { useContent } from "../../hooks/useContent";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false); // for handling the model which will appear(DOM CHANGE) when you click on the Add Content button
    const [deleteId, setDeleteId] = useState<string | null>(null); // for handling the model which will appear (DOM CHANGE) when you click the delete button(i have added a popup asking to make sure you want to delete the content)
    const [filter, setFilter] = useState<"all" | "youtube" | "twitter">("all"); // for handling the Filter part (DOM CHANGE) 
    const [logOut, setLogout] = useState(false); // for handling the model which will appear (DOM CHANGE) when you click the Logout button as i have made component (popup) which will appear when you click on Logout to confirm surity to leave

    const navigate = useNavigate();

    // Wrote Logout logic

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    // Below is the logic for automatically make disappear the model (popup) after i chose some option in it and fetch the data from the backend and show it on the dashboard
    const { contents, refresh } = useContent();

    useEffect(() => {
        refresh();
    }, [modelOpen]);

    // Wrote Delete logic

    const handleDelete = (id: string) => setDeleteId(id);

    const confirmDelete = async () => {
        if (!deleteId) return;
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            headers: { Authorization: localStorage.getItem("token") },
            data: { contentId: deleteId },
        });
        setDeleteId(null);
        refresh();
    };

    // Wrote Filter logic

    const filteredContents =
        filter === "all" ? contents : contents.filter((c) => c.type === filter);

    return (
        <div>
            <Sidebar
                currentFilter={filter}
                setFilter={setFilter}
                onLogoutClick={() => setLogout(true)}
            />
            <div className="p-4 ml-64 min-h-screen bg-slate-100">
                <CreateContentModel
                    open={modelOpen}
                    onClose={() => setModelOpen(false)}
                    refresh={refresh}
                />

                <div className="flex justify-end gap-2">
                    <Button
                        startIcon={<PlusIcon size="sm" />}
                        variant="Primary"
                        size="sm"
                        onClick={() => setModelOpen(true)}
                        text={"Add Content"}
                    />
                    <Button
                        startIcon={<ShareIcon size="sm" />}
                        variant="Secondary"
                        size="sm"
                        text={"Share Brain"}
                        onClick={async () => {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/brain/share`,
                                { share: true },
                                {
                                    headers: {
                                        Authorization:
                                            localStorage.getItem("token"),
                                    },
                                }
                            );
                            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                            alert(shareUrl);
                        }}
                    />
                </div>

                <div className="flex gap-1 flex-wrap">
                    {filteredContents.map(({ _id, type, link, title }) => (
                        <Card
                            key={_id}
                            id={_id}
                            type={type}
                            link={link}
                            title={title}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                <ConfirmDeleteModal
                    isOpen={!!deleteId}
                    onCancel={() => setDeleteId(null)}
                    onConfirm={confirmDelete}
                    text="Are you sure you want to delete this content as this action can't be undone"
                    heading="Delete Content"
                />
                <ConfirmDeleteModal
                    isOpen={logOut}
                    onCancel={() => setLogout(false)}
                    onConfirm={handleLogout}
                    text="Are you sure you want to leave?"
                    heading="Logout"
                    confirmLabel="Exit"
                />
            </div>
        </div>
    );
}
```

>[!IMPORTANT]
> **`flex-wrap`** -> wraps the component inside the screen so if any component is going out of the screen it will automatically come in the next line

Now making `ConfirmDeleteModel.tsx` file as that is being used here 

```javascript
// ConfirmDeleteModel.tsx

import { motion } from "framer-motion";

interface ConfirmDeleteModalProps {
    isOpen: boolean; // for whether the model is open or not 
    onConfirm: () => void; // what to do if confirm button is pressed
    onCancel: () => void; // what to do if cancel button is pressed
    text?:string // as we are making it dynamic this SAME MODEL IS USED TO SHOW THE POPUP WHEN LOGOUT button is clicked so making its content dynamic so that we can differentiate between delete and logout popup
    heading?:string // Same as above explanation
    confirmLabel?:string  // Same as above explanation
}

export function ConfirmDeleteModal({
    isOpen,
    onConfirm,
    onCancel,
    text,
    heading,
    confirmLabel
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow-xl w-80"
            >
                <h2 className="text-lg font-semibold text-gray-800">
                    {heading}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                   {text}
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
```

>[!IMPORTANT]
> **`backdrop-blur-sm`** -> The **Element itself remain sharp, whats behind it becomes blurred** which is different from `opacity` as in this the **Element itself gets blurred not the background**

Final `Card.tsx` file looks something like this 

```javascript
// Card.tsx

import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TweeterIcon } from "../../icons/TweeterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { useEffect } from "react";

interface CardProps {
    id: string; // Mongo _id
    title: string;
    link: string;
    type: "twitter" | "youtube";
    onDelete: (id: string) => void; // delete handler
}

export function Card({ id, title, link, type, onDelete }: CardProps) {
    // Ensure Twitter embeds are processed dynamically
    useEffect(() => {
        if (type === "twitter" && (window as any).twttr?.widgets) {
            (window as any).twttr.widgets.load();
        }
    }, [link, type]);
    return (
        <div className="scale-90 origin-top-left">
            <div className="bg-white p-2 border-1 border-slate-300 rounded-md shadow-md max-w-72 min-w-30 min-h-48 h-fit mt-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                        <div className="pr-0.5 text-slate-500">
                            {type === "youtube" ? (
                                <YoutubeIcon size="md" />
                            ) : (
                                <TweeterIcon size="sm" />
                            )}
                        </div>
                        <div className="text-sm font-medium">{title}</div>
                    </div>
                    <div className="flex items-center gap-2.5 pr-2 pl-2 text-slate-500">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShareIcon size="md" />
                        </a>
                        <button
                            onClick={() => onDelete(id)}
                            className="hover:bg-red-600 p-1 rounded-full transition-colors duration-200 hover:text-white"
                        >
                            <DeleteIcon size="md" />
                        </button>
                    </div>
                </div>
                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet w-full scale-90 origin-top-left">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}
```

and **Finally at last making the `Sigin.tsx` and `Signup.tsx` file for the authentication part**

**Just make the `Signup.tsx` file and by making some minor change, you can generate the `Signin.tsx` file also**

```javascript
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [loading, setLoading] = useState(false); // as Loading ke time pe DOM CHANGE hoga
    const [error, setError] = useState(""); // Error(Input constraint fulfill nhi kr rha user) show krne ke time pe DOM CHANGE hoga
    const [showPassword, setShowPassword] = useState(false); // Password show krna h ya user ko ya nhi (added a feature that user can see his password while setting it), yahan v DOM CHANGE hoga hence 
    const usernameRef = useRef<HTMLInputElement>(null); // as i have to extract the value from the input field named as username and password so given the type HTMLInputElement for ts safety and useRef being used to refer to that input box 
    const passwordRef = useRef<HTMLInputElement>(null); // same as above explanation
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        // Without going to the backend and then getting the response that Input constraint are not being fulfilled checked on the frontend itself and show them the error
        // Below are the input constraint

        if (!/^[A-Za-z]{3,10}$/.test(username)) {
            setError("Username must be 3-10 letters (A-Z, a-z).");
            setLoading(false);
            return;
        }

        if (
            !/^.*(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/.test(
                password
            )
        ) {
            setError(
                "Password must be 8-20 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
            );
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password,
            });
            alert("Signed up successfully!");
            navigate("/signin") // after successful signup, user will be redirected to signin endpoint to signin
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Signup failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen relative">
            {/* Left Half Side of the signup component */}
            <div className="w-1/2 bg-purple-600 flex flex-col justify-center items-center p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full opacity-30 -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-800 rounded-full opacity-30 translate-x-20 translate-y-20"></div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-64 h-64 text-white z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M12 13v6"
                    />
                </svg>

                <h1 className="text-white text-3xl mt-6 font-bold z-10">
                    MindVault
                </h1>
                <p className="text-white text-center mt-4 z-10 max-w-xs">
                    Capture your favorite ideas from YouTube and Twitter posts,
                    take notes, and share insights with ease.
                </p>

                <div className="absolute top-10 left-20 w-6 h-6 bg-white rounded shadow animate-bounce"></div>
                <div className="absolute top-1/2 right-10 w-8 h-8 bg-white rounded shadow animate-pulse"></div>
                <div className="absolute bottom-10 left-1/3 w-4 h-4 bg-white rounded shadow animate-bounce"></div>
            </div>

            {/* Right Half Side */}
            <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-10 relative">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Sign Up
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <div>
                            <input
                                ref={usernameRef}
                                type="text"
                                placeholder="Username"
                                className={`border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 ${
                                    error.includes("Username")
                                        ? "border-red-600 focus:ring-red-600"
                                        : "border-gray-300 focus:ring-purple-600"
                                }`}
                            />
                            {error.includes("Username") && (
                                <p className="text-red-600 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                ref={passwordRef}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                disabled={loading}
                                className={`border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 ${
                                    error.includes("Password")
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-purple-600"
                                }`}
                            />
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                            {error.includes("Password") && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-purple-600 text-white px-4 py-2 rounded-3xl border border-purple-600 hover:bg-white hover:text-purple-600 transition-all duration-300 ease-in-out disabled:opacity-50"
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>

                    {loading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 rounded-lg">
                            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

```

>[!IMPORTANT]
> **`focus:ring-purple-600`** -> used on `<input>` tag, **higlight the given property when you focus on the input box** means initially it will have some property and as soon as it will be higlighted or will meet some condition, it will automatically apply its corresponding given property on the element
>
> For ex -> in the above case, if the error is there (basically user is not meeting the input constraint), then the input box which is not meeting the constraint will have ring or border **difference between ring and border is that ring is temporary/highlight effect outside the box while Border = permanent, structural styling.**

**Similar to th**








