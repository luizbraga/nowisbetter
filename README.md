## Now is Better

Application responsible to list groups of lists of tasks. It works similar to Google Keep.

### Initial Setup
* Python 3.6.x
* Node version 12.x
* Postgres as database
* Create an `.env` file with the same variables as in `docker/environ/local`

#### Running

* Run `npm install` and `pip install -r requirements/local.txt` to install dependencies
* Run `npm run watch` to activate hot updates from JS and CSS files
* Run the migrations with `python manage.py migrate`
* Run `python manage.py runserver` to start the backend
* Create a superuser with `python manage.py createsuperuser`
* Access `localhost:8000` and login with the user you just created

##### Using Docker
* Install [Docker](https://www.docker.com/products/overview) and [Docker Compose](https://docs.docker.com/compose/install/).
* `$ docker-compose build`
* `$ docker-compose up`
