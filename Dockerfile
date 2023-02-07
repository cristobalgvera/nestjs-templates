FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent --ignore-scripts
COPY . ./
RUN npm run build
RUN npm prune --production

FROM node:18-alpine as production
WORKDIR /usr/src/app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["npm", "run", "start:prod"]
