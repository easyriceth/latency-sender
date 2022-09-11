FROM node:16-slim
WORKDIR /app
RUN apt-get update -y && apt-get install inetutils-ping -y

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
COPY . .
CMD ["npm", "start"]