# Welcome to my app

Installation
------------

After you've cloned the repo, run an 'npm install' in the directory to install all the dependancies.

Next, we need to start the mysql server, so run `mysql -u root -h localhost -p`.  Once you've logged into mysql, run `CREATE DATABASE sumo;` and `USE sumo;`.

If you login to mysql as a different user, have a password, name the database something else, etc. go to `config/connections.js` in the project directory and change the settings to your database settings.  This is what my mysql connection looks like right now:

```
mysql: {
    adapter: 'sails-mysql',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sumo'
}
```
All you have to do is adjust it to your settings.

Last but not least, run `sails lift` to start the application.  I didn't provide a default migrate setting for this application, meaning you have the option to drop, alter, or keep your database everytime you lift sails.  Now everything should be up and running at http://localhost:1337/

Enjoy!
