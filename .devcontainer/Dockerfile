FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install --silent
COPY . .
CMD [ "npm", "run", "start:debug" ]
