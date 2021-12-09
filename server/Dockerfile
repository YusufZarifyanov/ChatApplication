FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --silent

COPY tsconfig*.json ./
COPY src ./src
RUN npm run build