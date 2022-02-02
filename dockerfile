FROM node:alpine

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

ENV API_INTRA="https://intra.epitech.eu"

RUN cd /usr/src/app && npm install && rm dockerfile

EXPOSE 4000

CMD [ "node", "index.js" ]