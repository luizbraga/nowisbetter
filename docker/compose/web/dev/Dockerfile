FROM node:latest

COPY . /app

WORKDIR /app
RUN npm install

COPY ./docker/compose/web/dev/start.sh /start.sh
RUN sed -i 's/\r//' /start.sh
RUN chmod +x /start.sh
