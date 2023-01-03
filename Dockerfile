######## CI-CD ##################
FROM node:alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod --ignore-scripts
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
#################################

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
