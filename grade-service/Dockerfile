FROM node:18-alpine

RUN npm i npm@latest -g

USER node
WORKDIR /home/node/app

COPY package.json package.json ./
COPY package-lock.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build
