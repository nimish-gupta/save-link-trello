FROM node:10

LABEL email="gnimish03@gmail.com"

WORKDIR /api

COPY package.json yarn.* ./

RUN yarn install

COPY api/. ./

EXPOSE 3000

CMD ["yarn", "start:dev"]
