FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install
# RUN npm run build as we have only js project and hence only npm install is enough

EXPOSE 3000 

CMD ["node", "index.js"]