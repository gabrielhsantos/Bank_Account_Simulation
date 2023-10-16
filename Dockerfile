FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .

EXPOSE 3001

CMD ["npm", "start"]