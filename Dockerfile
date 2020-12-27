FROM node:14.13.0-alpine

WORKDIR /usr/waynes-world/waynes-world-api
COPY package*.json tsconfig.json ./
COPY src ./src/
COPY config ./config/

RUN npm install
RUN npm run build

EXPOSE 8700
CMD ["npm", "run", "prod"]
