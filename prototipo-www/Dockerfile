FROM node:8 as builder

RUN npm install -g create-react-app

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN rm -rf build || true
COPY ./package.json /usr/src/app
RUN npm install

COPY ./public /usr/src/app/public
COPY ./src /usr/src/app/src
COPY ./config /usr/src/app/config
COPY ./scripts /usr/src/app/scripts
RUN npm run build

RUN rm -rf /srv/* || true
RUN ls -la /srv
RUN chmod -R 777 /usr/src/app/build/.
RUN ls -la /usr/src/app/build/


FROM abiosoft/caddy
COPY --from=builder /usr/src/app/build/. /srv
