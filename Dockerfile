FROM node:10

ARG ENVIRONMENT=development

LABEL email="gnimish03@gmail.com"

WORKDIR /api

COPY package.json yarn.* ./

RUN if [ "$ENVIRONMENT" = "production" ] ; then yarn install --production=true ; else yarn install ; fi

COPY api/. ./

EXPOSE 3000

CMD ["yarn", "start:dev"
