# Create a new Node 14 image
FROM node:14 as base
# Set the working directory
WORKDIR /app
# Copy the package.json file
COPY package*.json ./

FROM base as installer
# Install the dependencies
RUN npm install --silent
# Copy all files
COPY . .

FROM installer as builder
# Build the app
RUN npm run build

FROM base as local
COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM installer as dev
CMD [ "npm", "run", "start:debug" ]

FROM builder as qa
CMD [ "node", "dist/main.js" ]

FROM builder as prod
CMD [ "node", "dist/main.js" ]
