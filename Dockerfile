FROM node:12-slim

LABEL name="app-boilerplate"
LABEL version="1.0"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Fix spawn ps ENOENT error on container reload: https://github.com/nestjs/nest-cli/issues/484
RUN apt-get update && apt-get install -y --no-install-recommends procps && apt-get clean

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run","start:dev" ]
