#!/usr/bin/env bash

until python manage.py migrate --settings=nowisbetter.settings.local
do
    echo "Waiting for postgres..."
    sleep 2
done

python manage.py runserver 0.0.0.0:8000 --settings=nowisbetter.settings.local
