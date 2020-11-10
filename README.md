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

> How to run the test suite (integration)
```
$ jest
```
> Make post request to `http://127.0.0.1/api/record` with bellow payload
```
{
  "startDate": "2015-01-01",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 2750
}
```
### Documentation
Navigate to GET `/api/docs`
