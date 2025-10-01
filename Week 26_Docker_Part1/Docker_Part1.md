# **Starting Docker**

## **Why Docker ??**
----------

Docker/containers are important for a few reasons -

1. Kubernetes/Container orchestration
2. Running processes in isolated environments
3. Starting projects/auxilary services locally
    + you might have seen some people running some service locally like for postgres they use -> `docker run POSTGRES—PASSWORD=mysecretpassword -d -p 5432:5432 postgres`, they dont install postgres they run it inside the docker container. so anytime you want to install any service like mongoDB, redis, postgres you can either **install them in your machine** or you can **run it locally on your machine inside the docker container hence not needing them to install inside your computer locally**
    + Also you can see the **commands are very simple and that too very similar also** like for redis command become -> `docker run -d -p 6739:6739 redis` (you can see `postgres` and `redis` commands looks very similar although they are different sevices)

**Explanation of 2nd point**

There are few steps which you have to go through while running a project like `node index.js` and then some more steps and so on.. and there can be circumstances where your friend send you a project and when you ran `node index.js` then as `index.js` may have some vulnerable code which gets into your computer thus causing some serious databreach.

**so docker lets you run your project in isolated environment basically run it inside what called as DOCKER CONTAINER so if you run it inside this, it will not be able to access the files and folder present in your host machine as docker has its own file system machine which gets runned every time you run the docker container consisting of your project**

<img src = "image.png" width=300 height=200>

> :pushpin: The machine which runs inside the docker is not Virtual machine (it is similar but not same), docker makes a container for every project and inside this container process runs


