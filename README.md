# My portfolio

## Install

This repository contains the code for my portfolio, hosted on ...

It has been made with Angular.js on the front-end,

Installation :
First create a file config/db.js with the following content :
```javascript
module.exports = {
    secret: 'mysecret',
    url: 'mymongodbURL'
};
```
and config/contact.js :
```javascript
module.exports = {
    email: 'my@email.com',
    password: 'pass'
};
```
then :
```
npm install
bower install
gulp
npm start
```

then connect on :
```
http://localhost:8080
```

## Technologies

This portfolio has been made using Angular.js on the front-end and Node.js, Express and MongoDB on the back-end.

## Environment / Configuration variables

MONGOLAB_URI
EMAIL
PASSWORD
SECRET
