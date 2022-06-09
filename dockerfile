FROM node:17.6.0

WORKDIR /ncado/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]