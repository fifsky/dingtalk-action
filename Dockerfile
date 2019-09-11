FROM node:10-alpine

COPY . .

RUN npm install --production

ENTRYPOINT ["node", "/lib/main.js"]
