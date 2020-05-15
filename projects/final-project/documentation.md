Project: Open Court
Name: Barath Srinivasan
Date: 5/14/20 (extension was granted)
URL: localhost:3000

---

### 1. Schemas:

```javascript
	messageSchema
	{
		message: String,
		name: String,
		date: Date
	}

	linkSchema
	{
		side: enum['judge', 'plaintiff', 'defendant', 'amici'],
		name: String,
		path: String,
		version: Number,
		date: Date
	}

	personSchema
	{
		person: String,
		token: String
	}

	caseSchema
	{
		name: String,
		docket: String,
		house: String,
		level: enum['federal', 'state'],
		type: enum['criminal', 'civil'],
		date: Date,
		appeal: Boolean,
		seal: Boolean,
		close: Boolean,
		judge: personSchema,
		plaintiff: personSchema,
		defendant: personSchema,
		amici: personSchema,
		links: [linkSchema],
		messages: [messageSchema]
	}
```
### 2. Add New Data

HTML form route for submitting new case: `/create`
POST endpoint route for submitting new case: `/create`

```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'localhost:3000/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: 'Slaughterhouse Cases',
        docket: 'sc-101',
        house: 'Supreme Court',
        level: 'federal',
        type: 'civil',
        date: 1589511893964,
        appeal: true,
        judge: 'Justice Chase',
        plaintiff: 'Campbell',
        defendant: 'Carpenter'
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

HTML route for sending a message to be save: `/case/:person?docket=[docket]`
POST endpoint route for sending a message to be save: `/chat`

```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'localhost:3000/chat',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: {
        docket: 'sc-101',
        party: 'judge',
        msg: 'hello there',
        date: 1589511993964
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route for one case: `/case?docket=[docket]`
GET endpoint route for all data: `/api?pwd=cmsc389k`

### 4. Delete Data

HTML route for removing a file: `/case/judge?docket=[docket]`
DELETE endpoint route for removing a file: `/remove`

```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'localhost:3000/chat',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: {
        docket: 'sc-101',
        filename: 'legal.pdf',
        side: 'defendant'
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

HTML route for deleting a case: `/case/judge?docket=[docket]`
DELETE endpoint route for deleting a case: `/delete`

```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'localhost:3000/chat',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: {
        docket: 'sc-101'
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 5. Search Data
	case name, intial file date, files, presiding judge, building

### 6. Navigation Pages

1) Jurisdiction -> `/viewall?filter=original` and `/viewall?filter=appellate`
2) Level -> `/viewall?filter=federal` and `/viewall?filter=state`
3) Type -> `/viewall?filter=criminal` and `/viewall?filter=civil`
4) Status -> `/viewall?filter=open` and `/viewall?filter=closed`
5) Security Clearance -> `/viewall?filter=public` and `/viewall?filter=private`

### 7. Modules

My module is called helper.js and contains some utility functions, special variable and a middleware for authentication

First extra module is express-fileupload which allowed me to easily parse incoming files and validate them
Second extra module is express-session which allowed me to create session cookies for each user
