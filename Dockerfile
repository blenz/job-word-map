FROM node:22-alpine

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]