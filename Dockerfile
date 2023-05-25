FROM node:16

WORKDIR /smi-front

COPY package.json ./

RUN npm install