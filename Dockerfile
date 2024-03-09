FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

RUN npm rebuild bcrypt

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

