FROM node:16.18-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 1111

CMD ["yarn", "dev"]