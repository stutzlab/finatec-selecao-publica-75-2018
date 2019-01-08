FROM node

WORKDIR /app/src

COPY ./package.json /app/src

RUN npm install

COPY . /app/src

CMD ["npm", "start"]


