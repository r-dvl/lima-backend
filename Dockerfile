FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGODB_URL = "mongodb://localhost:27017"

EXPOSE 3001

CMD ["npm", "start"]
