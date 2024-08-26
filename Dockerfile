FROM node:16 as builder
WORKDIR '/fe'

COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
