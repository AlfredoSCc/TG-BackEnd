FROM node
WORKDIR /src/index.js
COPY  package*json ./
COPY  . . 
RUN npm install
EXPOSE 1611
CMD  [ "npm","start" ]