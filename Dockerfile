FROM node:8.12

WORKDIR /smi-front

COPY . /smi-front

RUN npm i -g vue && npm install

EXPOSE 8080

CMD npm run dev
