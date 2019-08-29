FROM node:10

WORKDIR /smi-front

COPY . /smi-front

RUN yarn global add @quasar/cli && \
    yarn install

RUN chmod +x ./scripts/start.sh

CMD ["sh", "./scripts/start.sh"]
