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
  }else {
    await linkModel.deleteOne({
      // @ts-ignore
      userId : req.userId
    })
  }
  return res.status(200).json({
    message : `/share/${hash}` // Return the sharable link to the user
  })
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
  const user = await userModel.find({
    userId : link.userId 
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
 












