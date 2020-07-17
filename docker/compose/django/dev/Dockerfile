FROM python:3.6.3
MAINTAINER Luiz Braga <luizbragaa@gmail.com>

ENV PYTHONUNBUFFERED 1

# Setup Debian linux
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
RUN nodejs -v && npm -v

WORKDIR /app
COPY package.json .
COPY ./requirements /requirements

RUN pip install -r /requirements/local.txt
RUN npm install

COPY . .

COPY ./docker/compose/django/dev/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh
RUN chmod +x /entrypoint.sh
