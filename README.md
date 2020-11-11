<h2 align="center">Getir Case Study</h2>

### Technologies

* Node.js
* Express.js
* Mongoose.js
* Docker - containerization
* heroku-cli - Deployment


### Endpoint
- POST /records

### How to Run Locally
_You need to have docker, node and npm installed_
> Clone Repo
```
$ git clone git@github.com:ebukaume/getir-case-study.git

$ cd getir-case-study
```
> Run app
```
$ npm run docker:start
```

### How to run the test suite (integration)
1. On a different terminal, start the server.

```
$ npm run docker:start
```
2. Then run the test
```
$ npm run test
```
> POST `http://127.0.0.1/api/v1/records`
```
Request body
{
  "startDate": "2015-01-01",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 2750
}
```
### Documentation
GET `/api/v1/docs`

### Deployment
This API has been deployed on heroku @ `https://getir-case-study-ebuka.herokuapp.com`
GET `/api/v1/docs`
