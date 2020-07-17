FROM python:3.6.3
MAINTAINER Luiz Braga <luizbragaa@gmail.com>

ENV PYTHONUNBUFFERED 1

# Setup Debian linux
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs
RUN nodejs -v && npm -v

COPY ./requirements /requirements
COPY ./package.json /app/

WORKDIR /app
COPY . /app

RUN pip install -r /requirements/local.txt && npm install && npm run build-development

COPY ./docker/compose/django/dev/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh
RUN chmod +x /entrypoint.sh
