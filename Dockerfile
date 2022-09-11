FROM node:16-slim
WORKDIR /app
RUN apt-get update -y && apt-get install inetutils-ping -y

COPY . .
RUN npm install

CMD ["npm", "start"]