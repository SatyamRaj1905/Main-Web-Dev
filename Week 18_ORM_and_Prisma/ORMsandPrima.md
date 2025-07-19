# **Prisma**

## **What are ORMs ??**

**Boring official definition**

ORM stands for __Object-Relational Mapping,__ a programming technique used in software development to __convert data between incompatible type systems in object-oriented programming languages.__ This technique creates a __`virtual object database`__ that can be used from within the programming language.

ORMS are __used to abstract the complexities of the underlying database into simpler, more easily managed objects within the code__

**Easier to digest definition**

ORMs let you __easily interact with your database without worrying too much about the underlying syntax (SQL language for eg)__(If you are using an ORMs, then lot of problem which occurs while using SQL database such as SQL injection and many others, that gets avoided)

<img src = "image.png" width=350 height=150>

Can you see how easy we have now made, instead of remembering the whole syntax and learning new langauge(SQl), we now have converted into **object - oriented programming** type langauge. [this is one of the benefits of ORM]

**Ex -> `mongoose` was ODM (Object document mapping)**

> :pushpin:**Basically for NoSQL, ODMs are there and for SQL ORMs are there to EASIFY things**


## **Why ORMs ??**

1. **Simpler Syntax (converts objects to SQL Queries under the hood)**
----------


<img src = "image-1.png" width=600 height=100>

2. **Abstraction that let you flip the database you are using. [Unified API irrespective of the DB]** (very very important point)
----------

    + __Interchangability__ between the database and __Interoperability__ between the database becomes **easier** (means if you are using `mongoDb` and you want to shift to `postgres`, then of course things will become difficult but only for **MIGRATION**, when it comes to `node.js` code, then you have to make very minimal change, maybe you dont have to change at all)
    + BUT Rarely you migrate database so that is not the concern but still this is the advantage of using ORMs

<img src = "image-2.png" width=500 height=300>


3. **Type Safety / Auto completion**
----------


<img src = "image-3.png" width=600 height=250>

see the type in the **Red box** in the above code. (you can see in the ORM section, vs code is auto suggesting that what all `user` type **requires**) [that is why in left pic Non-ORM one, vs code is not suggesting auto completion as its type is `any`]

4. **Automatic migrations**
----------


But before understanding the automatic migrations, first lets see 

:bulb: **What is Migrations ??**

lets say you want to make a table `users` which consists of some rows so for making it  

<img src = "image-4.png" width=600 height=200>

Now let say i have to add another field called as `age` after some time so now you will not run the above command again with `age` addition code, you will use 

```javascript
ALTER TABLE users ADD COLUMN age INTEGER
```

Now again after some more time, you have to add another field called as `dob` so again you will do the below command 

```javascript
ALTER TABLE users ADD COLUMN dob DATE
```

The above is what **Migration** means. You are **Migrating your database** (your database is getting **new columns, your database is getting altered**)

__This is very hard to track off.__ (you have done in your database but when another developer will take use of your database, then you have to send the migrations also so that they can know what change they have to make as per the latest).

-> so for this you must have a folder named `migrations` to store all the migration which has been done so that every one can know about it and use it to get the correct output.

**The above is the reason you should also use `ORMs` as these `migrations` are automatically being handled by the `ORMs` so you need not to worry about this**

As your app grows, you will have a lot of these `CREATE` and `ALTER` commands.

__ORMs (or more specifically Prisma) maintains all of these for you.__

For example -> https://github.com/code100x/cms/tree/main/prisma/migrations

all the `migration` you are seeing by clicking on the above link, you will get to know that all these `migration` has been **automatically generated**(Notice it has TIMESTAMP of creation included consisting of Year(first four no.), Month(next 2 no.), Date(next 2 no.), Time(rest no.))

In case of a simple Postgres app. it's __very hard to keep track of all the commands that were ran that led to the current schema of the table.__

:large_blue_diamond:Similar to `prisma`, `drizzle` is also one such ORM.

## **What is Prisma ??**

If you see to their website they have written something about it which states 4 things (highlighted by red box) basically :-

<img src = "image-5.png" width=400 height=200>

>:pushpin:<span style="color:orange">**Remember ->**</span> **`Prisma` can work with both `SQL` and `NoSQL` as it has its own syntax capable of handling both types of database**

1. **Data Model**
----------
__In a single file, you can define your schema.__ What it looks like, what tables you have, what field each table has, how are rows related to each other.

you can see the example -> https://github.com/code1OOx/cms/blob/main/prisma/schema.prisma

2. **Automated Migrations**
----------
Prisma generates and runs database migrations based on changes to the
Prisma schema.

3. **Type Safety**
----------

<img src = "image-6.png" width=350 height=250>

4. **Auto-Completion**
----------
<img src = "image-7.png" width=200 height=100>

## **Installing Prisma**

Lets create a simple ToDo app

**Step 1 ->** Intialize an empty `node.js` project

```console
npm init -y
```

**Step 2 ->** Add dependencies 

```javascript
npm install 
```

**Step 3 ->** Initialize `typescript`

```javascript
npm install typescript

npx tsc --init 

// change to be made in tsconfig.json
Cange 'rootDir' to './src'
Change 'outDir' to './dist'
```

**Step 4 ->** make a `src` folder and initialise an empty `ts` project which has file called as `index.ts`

**Step 5 ->** Inside the `package.json`, inside the `"scripts"` add a new `"dev"` **key** with value `tsc -b && node ./dist/index.js`

+ now you can run the code now by using `npm run dev`

**Step 6 ->** Now lets install `Prisma` as dependencies 

```javascript
npm install prisma 
```

**Step 7 ->** After you have installed `Prisma`, you need to have some files associated with `prisma`, to get them 

```javascript
npx prisma init
```

It will generate a new folder named `prisma` and inside it you will see `schema.prisma` file being made automatically. It will also create `.env` file inside the `src` folder.

<img src = "image-8.png" width=200 height=200>

Now inside the `schema.prisma` understanding the default code written inside it and coding up the next step 

**Step 8 ->** Defining your data model

```javascript
generator client{
    provider = "prisma-client-js"
}

datasource db{
    provider = "postgresql" // This means that kiske sath prisma use kr rhe ho (mongoDb ke sath, aur any other db ke sath) [as here we are using it with postgres, so kept it]
    url = env("DATABASE_URL") // Here you will provide the credentials to connect to the database provided above (if it was to be mongoDb, then uska connection url STORE hota inside the variable named as DATABASE_URL
    // as all your SENSITIVE thing should be in your "env" file, so you have put the connection url inside the env file and linked it to the variable named as DATABASE_URL inside the .env file 
    // Now you have just used variable name with env method to pass the variable value form .env to here in this folder
    // You dont commit .env file and push it
}
```

Now comes the coding part and using the `prisma` (**Just write your schema of the app you are trying to build**)

```javascript
generator client{
    provider = "prisma-client-js"
}

datasource db{
    provider = "postgresql" 
    url = env("DATABASE_URL")
}

// KOI V APP banani h USER TABLE TO HAR JAGAH HOGA lets first make that 
model User {
    id   Int  @default(autoincrement()) @id // @id means ye PRIMIARY KEY h and @default(autoincrement()) means apne app iska value increase krte rhega on new entry by default
    username  String  @unique 
    password  String 
    age  Int 
}
```

**`@default()` can also be used when you want to give some default values to any particular entry**

for example -> 

```javascript
openToEveryone  Boolean  @default(false)  // OR 
discordOauthUrl  String  @default("")
```

Now till now you have **NOT yet generated `SQL` from it, you have not yet run `SQL` from it**

After creation of schema, **the first most important step to do is ->**

**Migration of database** -> This means that __generate or add__ the `SQL` in database and then __running that in the database__.

**Step 9 ->** Migrate the database 

to do the above thing use

```javascript
npx prisma migrate dev
```

Now this will take some time and then it will ask for 

```javascript
? Enter a name for the new migration: > initialise // add the name so that you can recognise what you have done in the following migration {should be descriptive}

// as here we are just initialising the new table so added "initialise" as the name  
```
after hitting `enter`, you can see the success message, and you will also notice that inside `prisma` folder a new folder has been added named as `migrations` and inside that a new folder is again created with `migration file name structure` and inside that you can see `migration.sql` file present 

<img src = "image-9.png" width=600 height=300>

Now if you go to `migration.sql` file you will see the raw `SQL` written there (can be seen in the above pic also)

You will also see that this **will be applied or simply saying RELECTED to the database**

<img src = "image-10.png" width=600 height=180>

You can see **a new table has been created without creating and writing those heavy SQL compatible syntax**[automatically it get created and automatically it get reflected]

Now if you want to make changes (like adding a new field for example -> city), then just go to the `schema.prisma` file and just add `city` with its type and relaunch the command 

```javascript
npx prisma migrate dev
```

and then again give the new name for this change / migration -> "added users_city" lets say for example and you are good to go now the table will have new column named as `city` inside the `Users` table.

**You can even add the new TABLE by just going to the `schema.prisma` file by using `model` keyword and then name of the table and then defining the columns to be present inside it**

> :pushpin:Now you can **relate why `prisma` offers you single file schema design system as well as comfort to be used that in any of the two database `SQL` or `NoSQL`**

**Lets say before migrating means getting reflected on the real database, i want to see HOW MY DATABASE WILL LOOK LIKE, to achieve this run the command ->**

```javascript

```

Lets try to create the `Todo` app, and try to create the `Todo` model and its schema (going inside the `schema.prisma` file). 

```javascript
generator client{
    provider = "prisma-client-js"
}

datasource db{
    provider = "postgresql" 
    url = env("DATABASE_URL")
}


model User {
    id   Int  @default(autoincrement()) @id 
    username  String  @unique 
    password  String 
    age  Int 
}

model Todo{
    id  Int  @default(autoincrement()) @id 
    title  String 
    description  String 
    done  Boolean 
    userId  Int  // basically kis user ki to-do h 
}
```

now just do the same thing to **migrate the database as you were doing before**

:bulb:**Lets suppose you want to add new field such as `time` inside the prexistin g database, then how to do this**

-> the above question simply says that lets say phle `id`, `title`, `description`, `done` column was there in the table, and usme phle se kuch users ka data pda tha now with all the entries fully filled now you want to add another column called as `time` inside the table, so what you will do and what will happen to this value for the users jo phle se pde h (as unhone to ye data fill he nhi kiya h at the time when it was created as us time pe `time` column tha he nhi) **SO THIS IS THE PROBLEM now HOW TO FIX IT ??**

-> you can fix it by making the minor change in the code (lets say i want to add `time` in the `Todo` table so)

```javascript
model Todo{
    id  Int  @default(autoincrement()) @id 
    title  String 
    description  String 
    done  Boolean 
    userId  Int  
}
```













