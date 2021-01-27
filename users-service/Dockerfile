FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR ./dist

COPY ./_proto ./_proto

EXPOSE 3000

CMD node ./index.js