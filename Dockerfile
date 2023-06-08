FROM node:14

WORKDIR /smi-front

COPY package.json ./

RUN npm install