
Project: Debate Forum

Name: Barath Srinivasan

Date: 4/12/20

Project Topic: Debate Forum

URL: https://debate-4um.herokuapp.com

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: question  `Type: String`
- `Field 2`: id        `Type: Number`
- `Field 3`: created   `Type: String`
- `Field 4`: views     `Type: Number`
- `Field 5`: agree    `Type: Number`
- `Field 6`: disagree `Type: Number`
- `Field 7`: pro       `Type: [String]`
- `Field 8`: con       `Type: [String]` 

Schema: 
```javascript
{
    question: String,
    id: Number,
    created: String,
    views: Number,
    agree: Number,
    disagree: Number,
    pro: [String],
    con: [String]
}
```

### 2. Add New Data

HTML form route for submitting new question: `/create`

POST endpoint route for submitting new question: `/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://debate-4um.herokuapp.com/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       question: 'new question'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```


HTML form route for submitting new opinion: `/question`

POST endpoint route for submitting new opinion: `/question`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://debate-4um.herokuapp.com/question',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       qId: '4',
       opinion: 'new opinion',
       pos: 'con'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route for all data points: `/api`
GET endpoint route for specific data point: `/api/question?id=[id]`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. Agrees -> `/sort/a/agree`
2. Disagrees -> `/sort/a/disagree`
3. Controversy -> `/sort/a/controversial`
4. Name -> `/sort/a/name`
5. Views -> `/sort/a/view`

