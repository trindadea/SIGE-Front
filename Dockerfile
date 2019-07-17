FROM node:8.12

WORKDIR /smi-front

COPY . /smi-front

RUN yarn global add @vue/cli && \
    yarn install --verbose

CMD ["sh", "script/start.sh"]
