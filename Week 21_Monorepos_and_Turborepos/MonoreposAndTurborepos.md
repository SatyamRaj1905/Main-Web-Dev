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

**Step 2 ->** Select `npm workspaces` as the monorepo framework 

>If it is taking a long time for you, you can clone this starter from https://github.com/100xdevs-cohort-2/week-16-1 and `run npm install` inside the root folder

By the end, you will notice a folder structure that look like this ->












