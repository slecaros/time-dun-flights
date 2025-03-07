FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g tsconfig-paths

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 