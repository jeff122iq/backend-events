FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

CMD yarn start

#CMD [ "start" : "node", "src/index.js" ]
EXPOSE 8080