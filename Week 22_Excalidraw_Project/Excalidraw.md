# **Excalidraw Project**


## **Setting up**
----------

First initialising a monorepo project by running the command 

```java
npx create-turbo@latest
```

also for this project, we are using `pnpm` which is slightly better thatn `npm`

Now after initialising the turborepo project, now you have to run the following command to install all the dependencies 

```javascript
pnpm install 

// followed by 

pnpm run dev
```

Now as **here you are running the `pnpm run dev` globally(in the root folder) hence you are seeing all the projects present in the `Apps` folder.**

Running the above command you will be able to see the default project present in the turborepo project (`docs and web one` which are `Next.js` app)

If you want to run a specific project, just go inside that `project` present in the `Apps` folder and then run `pnpm run dev` then **that project will only run and hence you can use it to individually run a project in monorepo project**

Example -> just go to inside the `docs` folder above and then run `pnpm run dev` and then you will see that only `docs` project will run not the `web` one.

As here we are just going to need one frontend for excalidrws hence in the `Apps` folder, just delete the `docs` folder or `web` 

