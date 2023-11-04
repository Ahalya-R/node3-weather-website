FROM node:18-alpine
USER root
WORKDIR /usr/app/

COPY . .

RUN npm update

ENV NODE_ENV=dev

RUN pwd

CMD [ "npm","run", "start" ]