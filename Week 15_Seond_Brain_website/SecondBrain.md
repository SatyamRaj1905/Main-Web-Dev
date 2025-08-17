# **Second Brain Project**

## **What we're building**
----------
<img src = "image.png" width=500 height=250>

## **Backend**
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
  tags : {type : Types.ObjectId, ref : 'User', required : true} // same as above Explanation
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


