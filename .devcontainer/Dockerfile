FROM node:18
RUN npm install -g @nestjs/cli
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD [ "npm", "run", "start:debug" ]
