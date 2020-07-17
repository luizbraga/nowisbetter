#!/bin/sh
python /app/manage.py collectstatic --noinput
/usr/local/bin/gunicorn nowisbetter.wsgi -w 4 -b 0.0.0.0:5000 --chdir=/app
