FROM node:latest

WORKDIR /app
COPY package.json .
RUN npm install

COPY . /app

COPY ./docker/compose/web/dev/start.sh /start.sh
RUN sed -i 's/\r//' /start.sh
RUN chmod +x /start.sh
