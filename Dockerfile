FROM node:18-alpine
USER root
WORKDIR /usr/app/

COPY . .

RUN npm update

RUN pwd

CMD [ "npm","run", "start" ]