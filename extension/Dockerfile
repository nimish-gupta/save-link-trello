FROM node:10

LABEL email gnimish03@gmail.com

RUN yarn global add web-ext

RUN apt-get update && apt-get install firefox-esr -y

WORKDIR /extension

COPY . .

CMD "bin/bash"
