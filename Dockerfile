FROM node:12.18.4-alpine3.12

WORKDIR /wonder/deploy

# copy all the files
COPY . .

RUN npm install && \ 
    npm run postbuild

# Exposing the server port
EXPOSE 4000

# this will start the server
CMD ["npm","start"]    
