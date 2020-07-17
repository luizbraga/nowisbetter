FROM python:3.6.3
MAINTAINER Luiz Braga <luizbragaa@gmail.com>

ENV PYTHONUNBUFFERED 1

# Setup Debian linux
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN nodejs -v && npm -v

COPY ./requirements /requirements
COPY package.json /app/

WORKDIR /app
COPY . /app

RUN pip install -r /requirements/prod.txt \
    && groupadd -r django \
    && useradd -r -g django django \
    && npm install && npm run build-production

RUN chown -R django /app

COPY ./docker/compose/django/prod/gunicorn.sh /gunicorn.sh

RUN sed -i 's/\r//' /gunicorn.sh \
    && chmod +x /gunicorn.sh \
    && chown django /gunicorn.sh
