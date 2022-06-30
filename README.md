## Demo activity logging api using typescript, express, sqlite

start demo by running

```
cd server && npm run demo
```

# Routes:

```
GET         /giveauth/:firmid   sets your authentication token to :firmid

GET         /activity/:id       finds a single activity by id
GET         /activity           finds all activities for the authorized firmid
GET query parameters:
    - ?after{earliest record wanted}
    - ?before{latest record wanted}
```

```
POST        /activity           creates new activity
POST JSON object options:
{
    "name": string,
    "type": "email"|"document"|"phonecall"|"appointment",
    "startTime":ISO 1806 datetime,
    "endTime":ISO 1806 datetime,
    "attachments": [
        {"id": 1, "name": string},
        {"id": 2, "name": string},
        {"id": 3, "name": string},
        {"id": 4, "name": string}
    ]
}
```

```
PUT         /activity/:id       updates activity by id
PUT JSON object options:
{
    "name":string,
    "startTime":ISO 1806 datetime,
    "endTime":SO 1806 datetime,
}
```

```
DELETE      /activity/:id       deletes activity by id

```

# Sample response:

```
GET /activity?before=2021-10-10T18:40&after=2020

    ["appointment",{
        "totalElapsed":26596,
        "activities":[
            {
                "id":359,"createdAt":1429695436,"updatedAt":1429695436,"firmId":4,"type":"appointment","startTime":"2020-01-02T03:40:50.000Z","endTime":"2020-01-02T11:04:06.000Z","elapsedTime":26596,"name":"Yotz","attachments":null
            }
        ]
    }],
    ["email",{
        "totalElapsed":105403,
        "activities":[
            {
                "id":559,"createdAt":1546134545,"updatedAt":1546134545,"firmId":4,"type":"email","startTime":"2021-03-12T11:15:49.000Z","endTime":"2021-03-13T08:02:52.000Z","elapsedTime":74823,"name":"Roombo","attachments":[{"id":1,"name":"name_of_attachment"},{"id":2,"name":"name_of_attachment"}]
            },
            {
                "id":982,"createdAt":1302109543,"updatedAt":1302109543,"firmId":4,"type":"email","startTime":"2021-02-12T20:07:51.000Z","endTime":"2021-02-13T04:37:31.000Z","elapsedTime":30580,"name":"Pixope","attachments":[{"id":1,"name":"name_of_attachment"},{"id":2,"name":"name_of_attachment"}]
            }
        ]
    }],
    ["phonecall",{
        "totalElapsed":16972,
        "activities":[
            {
                "id":384,"createdAt":1498451594,"updatedAt":1498451594,"firmId":4,"type":"phonecall","startTime":"2021-07-23T03:34:36.000Z","endTime":"2021-07-23T06:15:44.000Z","elapsedTime":9668,"name":"Livepath"
            },
            {
                "id":391,"createdAt":1648790447,"updatedAt":1648790447,"firmId":4,"type":"phonecall","startTime":"2021-03-10T20:32:46.000Z","endTime":"2021-03-10T22:34:30.000Z","elapsedTime":7304,"name":"Trunyx"
            }
        ]
    }]
]
```

problems:

    - bad datetime query is uncaught and breaks server - FIX: catch bad datetime query

future development:

    - extract query params to "withFilters" middleware
