FROM node:10

ARG ENVIRONMENT=development

LABEL email="gnimish03@gmail.com"

WORKDIR /save-link-trello

COPY package.json yarn.* ./

RUN if [ "$ENVIRONMENT" = "production" ] ; then yarn install --production=true ; else yarn install ; fi

COPY . .

EXPOSE 3000

CMD yarn decrypt && \
  if [ "$ENVIRONMENT" = "production" ] ; then yarn start:dev ; else yarn start ; fi
