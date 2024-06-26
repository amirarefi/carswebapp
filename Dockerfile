#use the official node image as the base image
FROM node:22-alpine3.18

#set the working directory inside the container
WORKDIR /app

#copy the package json file into the working directpry
COPY package*.json ./

#install the required python packages
RUN npm install

#copy all the files in this folder to the working directory /app
COPY . .

#expose the port that the app runs on from the container
EXPOSE 3000
#expose the port for postgressql
EXPOSE 5432

#start the flask app when the container is run
CMD ["node", "app.js"]