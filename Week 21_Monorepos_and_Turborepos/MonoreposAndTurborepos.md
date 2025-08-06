# **Monorepos and Turborepos**

## **Monorepos**
----------
As the name suggests, a single repository (on github lets say) that __holds all your frontend, backend and devops code.__

**Challenges to it**

+ Cloning the repo will give you access to the **full codebase of the company and hence although you are just devops engineer, you will have to know the other part of code also**
+ **Build time becomes really high**
+ Changes might work on your side but on the others it can fail

**Advantages to it**

+ **If a new developer joins the team, then it is very easier for them to run the project as all the things are present inside the same repo**
+ You can **Control and monitor more efficiently as changes are happening inside the single repo**

Few repos that use monorepos are :-

1. https://github.com/code100x/daily-code 
2. https://github.com/calcom/cal.com 
3. https://github.com/dubinc/dub/tree/main/

**In both of them `apps` and `packages` folder are present, so next time whenever you see that a project contains both `apps` and `packages` folder, you can get a hint that it is MONOREPO**

:bulb:**Do you need to know them very well as full stack engineer ??**

-> Not Exactly. Most of the times they are setup in the project already by the `dev tools` guy and you just need to follow the right pracitses. 

Good to know how to set up one from scratch though 

### **Why Monorepos ??**
----------


:bulb:**Why not simple folders ??**

-> Why cant I just store services (backend, frontend etc) in various top level folders?(like just make three folders for example for `frontend`, `backend` and `devops`(which we usually do) and eventually push the project that has all these 3 and we have made monorepo like thing)

You can, and even you should if your
1. Services are highly decoupled (dont share any code)
2. Services don't depend on each other.

For eg - A codebase which has a Golang service and a JS service

<img src = "image.png" width=300 height=200>

**Basically whenever one top level folder is not dependent on the other top level folder (For ex -> Frontend is in `react` and backend is in `rust`(NO RELATION AT ALL), in this case, you should use the above approach of making the seperate folder for both and eventually pushing their parent folder)**

BUT 

<span style="color:orange">**You need MONOREPO FRAMEWORKs when**</span>

1. **Shared code reuse ->** lets say you have frontend in `react` and backend in `node` and in both, **some function or logic which are present in both the folder so instead of writing them at 2 places seperately , TO AVOID THE CODE DUPLICATION, put them inside the SINGLE MODULE and both `react` and `node` can take the common logic from the module made**

2. **Enhanced collaboration ->** A changes in one department can be seen by the other and other can also change according to the changes made. For example -> `Meta` has the single codebase. (i.e. they use Monorepo framework to some extent)

3. **Optimized Builds and CI/CD[Important point] ->** Tools like Turborepo offer smart coaching and task execution (means using these type of frameworks require you to regularly change the common part of code to their respective langauge or framework code (Ex -> common code jb build ho rha hoga, wo phle `react` me change hoga(lets say) and then build hoga), which can be difficult so to easify these things, these types of frameworks are VERY HELPFUL) strategies that can significantly reduce build and testing times. To achieve the above thing, various strategies are used of which some are 
    + If you are running `npm run build` twice and nothing has changed lets say in the common module, it will not **RE-BUILD the common module, instead IT CACHES these build very well so that regular build gets avoided**
    + **Cloud Builds**(will come to it later)

4. **Centralized Tooling and configuration ->** Managing build tools, linters, formatters, and other configurations is simpler in a monorepo because you can have a single set of tools for the entire project.

<img src = "image-1.png" width=400 height=250>

### **Common Monorepo framework in `Node.js`**
----------

1. **Lerna -> https://lerna.js.org/**
2. **nx -> https://github.com/nrwl/nx**
3. **Turborepo -> https://turbo.build/** (<span style="color:orange">**Not exactly a monorepo framework**</span>), can work with `Learna`, `nx`, `Yarn`[**It is built on these**]
4. **Yarn / npm workspaces -> https://classic.yarnpkg.com/lang/en/docs/workspaces/**

We'll be going through __turborepo__ since it's the most relevant one today and __provides more things (like build optimisations) that others don't__

### **Build System V/S Build System Orchestrator V/S Monorepo framework**
----------

#### **Build System**
----------
A build system __automates the process of transforming source code written by developers into binary code that can be executed by a computer.__ For
JavaScript and TypeScript projects, this process can include transpilation
(converting TS to JS), bundling (combining multiple files into fewer files),
minification (reducing file size), and more. A build system __might also handle running tests, linting, and deploying applications.__

For ex -> When you run the `C++` code, the code gets changed to `.exe` file (**the process is called as compiling or BUILDING**) and the thing which changed it (here **compiler also called as BUILD SYSTEM**).

#### **Build System Orchestrator**
----------
__TurboRepo acts more like a build system orchestrator rather than a direct build system itself.__ <span style="color:orange">**VERY VERY IMP.**</span> It doesn't directly perform tasks like transpilation, bundling, minification, or running tests. Instead, TurboRepo allows you to define tasks in your monorepo that call other tools (which are the actual build systerhs) to perform these actions.

These tools can include anything from `tsc`, `vite` etc..

**In short, these acts as a MANAGEMENT TOOL (bas btata h kya krna h, krta to monorepo framework he h)**

#### **Monorepo framework**
----------
A monorepo framework __provides tools and conventions for managing projects that contain multiple packages or applications within a single repository (monorepo).__ This includes dependency management between
packages, workspace configuration.

For ex -> `Lerna`, `Yarn`, `nx` etc..

:bulb:**You must be having the question that at the end we are just making a folder which has common file or code from all the folders, then why not make a global folder and then write there the common code and finally IMPORT them inside all the other global folders ??**

-> something like this you must be thinking (left pic, the one which has folder path written in `../../filepath` one)

<img src = "image-2.png" width=320 height=200> <img src = "image-3.png" width=320 height=200>

But the problem with the left pic concept is **It seems ugly as you are moving outside and navigating to the place where your codebase is, there must be an easy way to resolve the common module** and hence we use the right pic approach (the way of importing with `@` one [it consists use of monorepo]). In the right pic, we are basically **writing the custom scripts and hence we have the ability to BUILD the folders one after the other so that they are not able to BUILD at the same time(which will lead to increase of BUILD TIME & also RESOURCE-INTENSIVE task), by SERIALIZING the build we are avoiding the above problem and thus the code has now became more optimised** 

Now the writing of the above scripts can be done manually by the developers (but as they are dumb means they cant do the `caching`, `parallelization` and `dependency graph awareness` type of thing(see below explained all these three processes) and hence `monorepo` or `turborepo` **comes into the picture and its work is to HANDLE ALL THE BUILD RELATED PROCESSES**). [you basically dont have to do anything to the `package.json`, `turborepo` will handle all the things].


## **Turborepo as a build system orchestrator**
----------
Turborepo is a __build system orchestrator.__

The key feature of TurboRepo is __its ability to manage and optimize the execution of these tasks across your monorepo.__ It does this through:

1. __Caching:-__ TurboRepo __caches the outputs of tasks,__ so if you run a task and then run it again without changing any of the inputs (source files dependencies, configuration), TurboRepo can skip the actual execution and provide the output from the cache. This can significantly speed up build times, especially in continuous integration environments.

2. __Parallelization:-__ It can __run independent tasks in parallel,__ making efficient use of your machine's resources. This reduces the overall time needed to complete all tasks in your project.(`Lerna` or any other monoframework can also do this)

3. __Dependency Graph Awareness:-__ TurboRepo understands the
__dependency graph__ of your monorepo. This means it knows which
packages depend on each other and can ensure tasks are run in the
correct order.(This is the biggest advantage of TurboRepo as this is not possible with only `Learna` or any other monorepo framework, you need to have TurboRepo). <span style="color:orange">**In short, It SERIALISE the files or folders to be build**</span>

### **Intializing a simple turborepo**
----------
Link to documentation -> [Docs](https://turbo.build/repo/docs)

**Step 1 ->** Initialize the TurboRepo

```javascript
npx create-turbo@latest 
```

**Step 2 ->** Select `pnpm` or `yarn` as the monorepo framework (basically means that from where all the codes should be coming(i.e. from which package ??))

>If it is taking a long time for you,(which it can as it is very heavy operation) you can clone this starter from https://github.com/100xdevs-cohort-2/week-16-1 and `run npm install` inside the root folder

By the end, you will notice a folder structure that look like this ->

<img src = "image-4.png" width=500 height=230>

### **Exploring the folder structure**
----------
Basically there are 5 modules inside the project ->

__End user apps (websites/core backend)__

1. `apps/web` - A Next.js website 
2. `apps/docs` - A Docs website that has all the documentation related to your project

__Helper packages__
1. `packages/ui` - UI packages
2. `packages/typescript-config` - Shareable TS configuration
3. `packages/eslint-config` - Shareable ESLint configuration

Below pic shows the relation ->

<img src = "image-10.png" width=400 height=200>

If you notice the `apps` folder you will see two folders -> `docs` and `web` and inside if you will see the code is same as that you see in `Next.js` (**basically these are two frontends that one for the WEBSITE and second for the DOCUMENTATION(`Next.js` backed code but you can also add `react` or other frameworks) in the `web` folder, you will write the logic for frontend and in the `docs` folder the documentation part(you can also delete it)**)

> **`apps` is the main folder where all the logic which cant be seperated out into the common is written (basically isme jitne v helper packages, component h wo bas IMPORT hoke use hote h)**
>
> > **Put the end user applications here (appka user jisse interact krta h ex -> `Next.js` backend or frontend, `react` frontend, `Node.js` backend), they should be put here and**

and now talking about the 2nd global folder -> `packages` 

> **`packages` is the folder which will consist of all the logic that are common from all the other folders present**
>
> > **whatever reusuable code they(the project) need to have should be kept inside the `packages` folder, which is the BIGGEST ADVANTAGE of monorepo as you can share the packages among your different projects ex-> `ui` etc..**

You can see in the `packages` folder, different sub folder are present for most of the important part which is present in the website like (`ui`, `components`, etc..)


Now if you run the **pre-built code given at the time of initializing the project you will see that there are 2 different projects(similar only by appearance) running on the two different urls and are that two are present inside the same repo**

<img src = "image-5.png" width=400 height=150>

Now if you go https://localhost:3001 then you will see something like the below(left pic) and if you go to https://localhost:3001 (right pic) is the output ->

<img src = "image-6.png" width=320 height=200> <img src = "image-7.png" width=320 height=200>

Notice the **output in both the pages same which simply means they are using SIMILAR of SAME components as the one is using**

OR simply saying -> **We have single `repo` which has multiple `projects` which share code from `packages/ui`**

Notice if you go to the `web > app` folder in the below directed pic (left pic) and going inside the `button` component, you will redirected to `ui` components `button.tsx` file(right pic)

<img src = "image-8.png" width=320 height=200> <img src = "image-9.png" width=320 height=200> 

**One of the practical use case of this is you can build MULTIPLE WEBSITE without writing the logic for many things(such as components, ui, css code, etc.. )  and that too inside the single repo**

For ex -> Zomato and Blinkit have similar looking ui which means that they could have just used the `monorepo` to build both the above website and that too inside the same repo so that they can use the component which are common to each other in both the website. basically in their repo of `web` and `docs` folder they could have `zomato` and `Blinkit` webiste inside their corresponding `app > page.tsx`.

Now you can also see the **Caching feature of turborepo** by **building the project by running `yarn build` on the terminal**. <span style="color:orange">**You will notice that when you run this command first time, then it will take time but after then if you again RE-RUN the COMMAND WITHOUT MAKING A SINGLE CHANGE in the codebase, then the BUILD will be executed very fast (this is what we have learnt in caching that it caches the build so that optmisation can take place)**</span>, also if you now change something inside the codebase, you will see that again it will start to take time to build as **some code has been changed**

<span style="color:orange">**The above feature plays very crucial part in CI/CD pipeline (as their continuous deployment of your code is occuring and your project needs to have very optimised so that it can travel faster in the CI/CD pipeline and updated in your website gets immeditately handled)**</span>

**This was also the selling point of Turborepo that they reduce the BUILD TIME significantly less**

Now <span style="color:orange">**If you want to add more projects then**</span> -> **Just COPY any of the two folders present inside the global `apps` folder (i.e. `web` or `docs`) and then just go inside the newly made copied folder's `package.json` and inside that change the `"name"` to the one which you have kept for the copied project** and THAT's it, you have MADE A SINGLE REPO WHICH HAS 3 DIFFERENT PROJECT.

You can also add the backend like the one which is shown below ->

<img src = "image-12.png" width=400 height=230>

Notice we have just made another folder named `server` and this will signify our backend of different project and inside that now we can write the logic of the backend.
 
### **Exploring root `package.json`**

<img src = "image-11.png" width=400 height=300>

`npm workspaces` is what the `monorepo` has done and `turbo build system` is what `turborepo` has made.

__scripts__

This represents what command runs when you run

1. npm run build
2. npm run dev
3. npm run lint

`turbo build` goes into all packages and apps and runs `npm run build` inside
them (provided they have it)

Same for `dev` and `lint`

Now from now on lets try to build and understand the rest part by doing some assignment.

## **Assignment**

:bulb:**You have to create a simple chat application by using the monorepo and turborepo ??**

so starting to solve ->

**Step 1 ->** Intitializing the empty monorepo project by running the command 

```javascript
npx create-turbo@latest
```

give the name and then `yarn` as package manager (if not then install it)


Now you have created an empty monorepo project 

inside the global `package.json`, you can see the `"workspaces"` key which has its values as `"apps/*"` and `"packages/*"` (which basically means that where the end app takes the code from), when you will reach DEVOPs, you will see another value here named as `"clis/*"`

Now currently our project has two `Next.js` app (or frontend) named as `web` and `docs` present inside the global `apps` folder, but as we are just making a simple chat app, so stick to only one frontend (if it has another role like `admin`, then you have to make or use another frontend)

so delete `docs` (for now)

Now in the global (any of the file or folder present in the global), running the command `yarn dev` will BUILD the project and hence you will get the link to see your project.

Proceeding further and creating an `http` and `websocket` server for our app 

**Step 2 ->** Making `http server` and `ws server` folder inside the `apps` global folder.
















