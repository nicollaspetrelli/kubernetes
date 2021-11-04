# Building react
FROM node:16.3-alpine AS yarn
ENV NODE_ENV=production
WORKDIR /app

# Installing packages to build some dependencies
RUN apk add --no-cache --update python2 make g++

# Copying our dependencies files to leverage caching
COPY ["package.json", "yarn.lock", "./"]

# Install dependencies
RUN yarn install --production

# Copying other files
COPY . .

# Building app
RUN [ "yarn", "build" ]

# Serving to nginx
FROM nginx:1.21
COPY --from=yarn /app/build /usr/share/nginx/html
