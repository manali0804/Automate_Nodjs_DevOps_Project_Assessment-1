
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Default environment (can be overridden)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3001

CMD ["node", "app.js"]
