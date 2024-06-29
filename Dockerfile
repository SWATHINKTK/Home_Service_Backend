#Base Image configuring
FROM node:alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

#Depenedency setup
COPY package*.json ./
RUN npm install
COPY . .

# Set environment variables .
ENV PORT=3000

# Expose the port the app runs on.
EXPOSE 3000

# command running 
CMD [ "npm","run","dev" ]