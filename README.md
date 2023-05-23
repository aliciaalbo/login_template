# login_template

To setup React:
- go to /react directory
- npm install
- you may need to edit package.json to have:
  - "proxy": "http://localhost:5000"
- npm start
- view site at: http://localhost:3000/

## To setup Python:
- go to /python directory
- python3 -m venv <PATH_TO_LOGIN_TEMPLATE>/python/env
- source env/bin/activate
- pip3 install -r requirements.txt

## To setup the database:
- create a py_secrets.py in the /python directory containing:

db_uri="postgresql://<DB_USER>:<DB_PASSWORD>@localhost:5432/<DB_NAME>"
secret_key="<RANDOM_STRING_FOR_FLASK>"

- turn on the Postgres service
  - service postgresql start

- create the database:
  - su - postgres
  - createdb logintemplate
  - exit

- build the database:
  - go to /python directory
  - python3 build_database.py

## Start the React server:
- go to /react directory
- npm start

## Start the Python server:
- service postgresql service
- go to /python directory
- source env/bin/activate
- python3 server.py

## To push to GitHub:
- from the main directory
