# **Deploying a monorepo using docker to a VM**

In this notes, we'll go through the first way to deploy a full project end to end using `CT/CD` to `VMs`.

We'll be using `Bun` as our runtime/package manager (as it is faster than `npm`)

## **Create a monorepo locally, Add DB**
----------

**Step 1 ->** Initialize a turborepo

```javascript
npx create-turbo@latest
```

**Step 2 ->** Initialize a `db` package inside the `package` folder that defines a simple prisma schema

```javascript
cd packages
mkdir db
cd db
bun init
bun install prisma
bunx prisma init  // similar to npx this will create prisma.schema file
```

**Step 3 ->** Add a model inside the `schema.prisma` file

```javascript
model User {
    id         String     @id     @default(uuid())
    username   String
    password   String
    todos      Todo[]
}

model Todo {
    id         String     @id     @default(uuid())
    task       String
    done       Boolean     @default(false)
    userId     String
    user       User        @relation(fields: [userId], references: [id])
}
```

**Step 4 ->** Create a DB locally (for this monorepo, we are using `postgres`)

```javascript
docker run —e POSTGRES_PASSWORD=mysecretpassword —d —p 5432:5432 postgres
```

**Step 5 ->** Update the `.env` file with the right credentials

```javascript
DATABASE_URL="postgresql://postgres:mysecretpassword@locathost:5432/postgres"
```

**Step 6 ->** Now as the database has been initialised, so time to **migrate the database and then generate the clien**

```javascript
bunx prisma migrate

// and then give the name and you are good to go
// after this run the below command

bunx prisma generate
```

**Step 7 ->** Export the `prismaclient` using the `index.ts` file present inside the `packages > db`

```javascript
// index.ts
import {PrismaClient} from "@prisma/client"

export const prismaClient = new prismaClient()
```

then go to the `package.json` file present in `packages > db` and add `export` section 

```javascript
"exports":{
    "./client": "./index.ts"
}
```

## **Add backend, ws, nextjs routes**
----------

as we have already two `next.js` app preinstalled comes with `monorepo` creation inside the `apps` folder named as `web`, `docs` **delete `docs` as we are going to need only one `next.js` project for this part**

**Step 1 ->** Create backend folder

```javascript
cd apps
mkdir backend
cd backend 
bun init
```

**Step 2 ->** Adding `https` server inside the `index.js` file

```javascript
bun install express @types/express
```




