# **Starting Docker**

## **Why Docker ??**
----------

Docker/containers are important for a few reasons -

1. Kubernetes/Container orchestration
2. Running processes in isolated environments
3. Starting projects/auxilary services locally
    + you might have seen some people running some service locally like for postgres they use -> `docker run POSTGRES—PASSWORD=mysecretpassword -d -p 5432:5432 postgres`, they dont install postgres they run it inside the docker container. so anytime you want to install any service like mongoDB, redis, postgres you can either **install them in your machine** or you can **run it locally on your machine inside the docker container hence not needing them to install inside your computer locally**
    + Also you can see the **commands are very simple and that too very similar also** like for redis command become -> `docker run -d -p 6739:6739 redis` (you can see `postgres` and `redis` commands looks very similar although they are different sevices)
    + No need to go to official docs and see how to install `redis` or any particular service
    + **Projects ->** Every open source project has __two ways to start,__ one by traditional way (`git clone github url` then `npm install` then `node index.js` then some more step) and the other one is **docker command** which is **just single command -> `docker compose ...something` just by running this you will be able to run your project on your machine**

**Explanation of 2nd point**

There are few steps which you have to go through while running a project like `node index.js` and then some more steps and so on.. and there can be circumstances where your friend send you a project and when you ran `node index.js` then as `index.js` may have some vulnerable code which gets into your computer thus causing some serious databreach.

**so docker lets you run your project in isolated environment basically run it inside what called as DOCKER CONTAINER so if you run it inside this, it will not be able to access the files and folder present in your host machine as docker has its own file system machine which gets runned every time you run the docker container consisting of your project**

<img src = "image.png" width=300 height=200>

> :pushpin: The machine which runs inside the docker is not Virtual machine (it is similar but not same), docker makes a container for every project and inside this container process runs


## **Containerization**
----------

:bulb: **What are containers ??**

Containers are a __way to package and distribute software applications in a way that makes them easy to deploy and run consistently across different environments.__(commands remain same for all types of environment be it linux, be it macos or be it windows). They allow you to package an application, along with all its dependencies and libraries, into a single unit that can be run on any machine with a container runtime, such as Docker.

<img src = "image-1.png" width=400 height=220>

simply saying you can run `node index.js` on your machine but maybe on some other machine you will not be able to run it because he/she has not installed `node.js` in their computer but if you have **containerize your project inside the docker, then even though someone has not installed `node.js` or any other dependency they will still be able to run your project**

<span style="color:orange">**As long as docker is installed in your pc, you dont have to install any of the dependency present in some project**</span>

> :pushpin: <span style="color:orange">**Remember ->**</span> **Koi v service docker me run krne ke baad tmhare machine me nhi aa jata h it comes in the machine present inside the container.**

:bulb: **Why containers ??**

1. Everyone has different Operating systems
2. Steps to run a project can vary based on OS (explanation of the above point)
3. Extremely harder to keep track of dependencies as project grows (basically boht sari cheez use kiya h tmne project me to if a new developer comes, he/she has to **install all these big bundle of different things locally imaging the amount of effort**)

### **Benefit of using container**

<img src = "image-2.png" width=400 height=200>

1. Let you describe your `configuration` in a single file
2. Can run in isolated environments
3. Makes Local setup of OS projects a breeze
4. Makes installing auxiliary services/DBs easy

**References**

+ For reference, the following command starts `mongo` in all operating systems -> 

```javascript
docker run -d -p 27017:27017 mongo 
```

+ Docker isnt the only way to create containers. (container eventually become the synonym of docker). **Podman is another something like docker**

## **History of docker**
----------

Docker is a YC backed company, started in -2014

They envisioned a world where containers would become mainstream and
people would deploy their applications using them which is mostly true today

Most projects that you open on Github will/should have docker files in them
(a way to create docker containers)

For detailed journey refer this blog post -> [Idea behind docker](https://www.ycombinator.com/blog/solomon-hykes-docker-dotcloud-interview/)

## **Installing docker**

Go to the site -> [Dcoker install](https://docs.docker.com/desktop/) and then scroll downward and you will see an option to install the docker just install it and that's it you are good to go. after installation, just run the below command to cross verify whether docker has been installed in your pc or not 

```javascript
docker --version
```

If you are able to see the version of docker then you are good to go, docker has been successfully installed in your computer but if you are not getting it then definitely you have ran into some problem and hence try to see the videos on youtube or try reinstalling it.

## **Docker architecture**
----------

<img src = "image-3.png" width=500 height=250>

As an application/full stack developer, you need to be comfortable with the
following terminologies -

I. Docker Engine
2. Docker CLI - Command line interface
3. Docker registry

**Understanding the component**
----------

1. **Docker Engine ->** Docker Engine is an open-source `containerization` technology that allows containerization developers to package applications into container.(**basically this is only responsible for making containers**)

Containers are standardized executable components combining application source code with the operating system (OS) libraries and dependencies required to run that code in any environment.

2. **Docker CLI ->** The command line interface lets you talk to the
`docker enginer` and __lets you start/stop/list containers__

```javascript
docker run -d -p 27017:27017 mongo
```

__Docker cli is not the only way to talk to a docker engine. You can hit the docker `REST` API to do the same things__

3. **Docker Registry ->** `docker registry` is __how Docker makes money.__
   
It is similar to `github` but it lets you push images rather than sourcecode

Docker's main registry -> https://www.docker.com/products/docker-hub/

Mongo image on docker registry -> https://hub.docker.com/_/mongo

If you in the future will make the image(understand it as package) then you will also push this in docker registry so that everyone can use it, its very similar to `node package manager`, there also different packages are inside it and you just use them via cli command. There are various places where you can push your images but `hub.docker` one is the official by docker but there are different services that also provide this feature like `AWS ECR` (**It is like container registry**)

Now see the power of container, just run this command while making sure that **your docker desktop is running in background**

```javascript
docker run mongo 
```
and runnning this only **you are able to make run the mongo locally and thus can use it even**

:bulb:**How to verify it ??**

-> go to the mongoDB compass app/GUI for pc and there you will see something like the below interface 

<img src = "image-4.png" width=600 height=250>

now as you have run `mongo` **locally not on some cloud container** hence you will see the default port(`27017`) for mongo to run locally (**localhost**), and then try to connect to the **default localhost website given (`mongodb://localhost:27017`)** then you will still not be able to connect to although you can think that ideally it should have run as we have given command `docker run mongo`

It **is because of PORT MAPPING (will study in the upcoming section)** but for now just make changes and run the below command

```javascript
docker run -p 27017:27017 mongo 
```

You can and **should delete any service after using it as the services still takes the space in your pc** so to do that 

```javascript
docker rmi mongo --force
```
above we have removed mongo but you can remove any service from docker which you installed previously by running `docker run -p port_no. service_name` by using similar command 

**To see what are the services present in your docker locally run the below command**

```javascript
docker images
```

## **Images V/S Containers**
----------

:round_pushpin: **A good interview question is what is thee difference between docker image and container ??**

### **Docker image**
----------

A Docker image is a __lightweight, standalone, executable package that includes everything needed to run a piece of software, including the code, a runtime, libraries, environment variables, and config files.__

> :pushpin: **A good mental model <span style="color:orange">**way to rememeber is,**</span> for an image is `Your codebase on github`**
>
> It is basically <span style="color:orange">**Everything needed to run that software**</span>

<img src = "image-5.png" width=400 height=250>


### **Docker container**
----------

A container __is a running instance of an image. It encapsulates the application or service and its dependencies, running in an isolated environment.__


> :pushpin: **A good mental model <span style="color:orange">**way to remember is,**</span> for a container is when you run `node Index ts` on your machine from some source code you got from github**
>
> It is basically **Things which is starting or stopping is called as container**, you basically start or stop the container not the image and this container will be made after you run any service on docker (also for every service a seperate container run)

**To see the number of container running run the below command**

```javascript
docker ps
```

This will show all the container which is running locally with their **process id** to **stop and container run the below command with the container process id**

```javascript
docker kill PROCESS_ID
```
The above command does not mean that **images are not present, its like you have not started them or basically stopped them**

**thats why you say "An image in execution is called as Container"**



