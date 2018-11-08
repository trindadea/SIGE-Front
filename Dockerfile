FROM node:8.12

WORKDIR /smi-front

COPY . /smi-front

RUN yarn global add @vue/cli \
  && yarn install --verbose

EXPOSE 8080

CMD yarn run dev
