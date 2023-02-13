FROM node:14



# create a app directory

WORKDIR /app

COPY package*.json ./

RUN npm install


# bundle app source


COPY . .




EXPOSE 3000


CMD ["node","index.js"]