FROM node:16.3-alpine

ENV NODE_ENV=production

WORKDIR /app

# Installing dependencies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --include=dev

COPY . .

# Adding to PATH
ENV PATH $PATH:/app/node_modules/.bin

# Running app
EXPOSE 3000
CMD [ "npm", "run", "startDev" ]
