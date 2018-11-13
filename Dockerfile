FROM node:10-slim

RUN apt-get update -qq && \
    apt-get install -y build-essential git

COPY . /smi-front
WORKDIR /smi-front

CMD ["sh", "start.sh"]
