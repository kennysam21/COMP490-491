# COMP490-491

### Set up the Backend

Create the database following these steps:

```
start xampp
start apache and mysql in xampp
go http://localhost/phpmyadmin
click databases tab
create a database called irrigation
```

create a new .env file:

```
change directory to backend folder in terminal
copy example env file using command "cp .env.example .env" or "copy .env.example" and rename the new .env.example file to .env
```

Put the database details in the `.env` file:

```
DB_DATABASE=irrigation
DB_USERNAME=root
DB_PASSWORD=
```

change folder to backend in terminal then run these commands

```
composer install
php artisan key:generate
php artisan migrate
php artisan jwt:secret
php artisan serve
```

### Set up the Frontend

change folder to frontend in another terminal then run these commands

```
npm install -g @angular/cli
npm install
ng serve --open
```
### Testing JSON
install test json server and start it in separate terminal using these 2 commands
```
npm install -g json-server
json-server --watch db.json
```
json-server github
https://github.com/typicode/json-server
