FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install 

COPY . .

RUN npm run setup

EXPOSE 4000
CMD ["node", "dist/index.js"]
