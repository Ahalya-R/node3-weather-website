FROM node:18-alpine
USER root
WORKDIR /usr/app/

COPY . .

RUN npm install

ENV NODE_ENV=dev

RUN pwd

CMD [ "npm","run", "start" ]