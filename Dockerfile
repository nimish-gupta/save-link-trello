FROM node:10

LABEL email="gnimish03@gmail.com"

WORKDIR /app

COPY package.json yarn.* ./

RUN yarn install

COPY . .

ARG ENCRYPT_KEY

EXPOSE 3000

CMD ["yarn", "start.js"]
