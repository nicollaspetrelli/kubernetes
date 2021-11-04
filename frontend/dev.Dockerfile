FROM node:16.3-alpine
WORKDIR /app

# Installing packages to build some dependencies
RUN apk add --no-cache --update python2 make g++

# Copying our dependencies files to leverage caching
COPY ["package.json", "yarn.lock", "./"]

# Install dependencies
RUN yarn install

# Copying other files
COPY . .

# Serving app
EXPOSE 3000
CMD [ "yarn", "start" ]
