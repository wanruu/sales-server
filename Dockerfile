FROM node:20.18.0 AS development
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build