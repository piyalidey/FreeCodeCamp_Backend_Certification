## Timestamp Microservice

## Objective: 
This is a microservice API project for Free Code Camp that will accept either a human
readable date or a unix formatted date and return a json response with the date formatted
as both. If the input is neither it will return `null` values.

## User Stories:

1. I can pass a string as a parameter, and it will check to see whether that 
string contains either a unix timestamp or a natural language date (example: 
January 1, 2016).

2. If it does, it returns both the Unix timestamp and the natural language form
of that date.

3. If it does not contain a date or Unix timestamp, it returns null for those 
properties.

## Deployment:
You can test it at [https://*****.herokuapp.com/](https://***.herokuapp.com/)

## Usage:
```
https://***.herokuapp.com/January 10, 2015
```
```
https://***.herokuapp.com/1420848000
```
```
https://***.herokuapp.com/jibbarish
```
```
https://***.herokuapp.com
```

## Sample Output:
```javascript
{
  humanReadable: "January 10, 2015",
  unix: "1420848000"
}
```

## To run:
node app.js