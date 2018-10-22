# API REST Demo v1




1. Install
2. Configuration
3. Starting
4. Testing

## Install

__Requeriments__
Minimum requirements

- MySQL 5.7

To install all dependencies you must to execute the following sentence and then set every variable into .env file

```bash
npm install
```

After that, you must to import into mysql the script located in the root of the project, you can use the following command.

```bash
mysql -p -u [user] [database] < db.sql
```

## Configuration

Modify the .env file in the root of the project and sett your key/value pairs in the following format of KEY=VALUE:

```bash
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=TheSpecial
DB_PASS=EverythingIsAwesome
```

## Start & watch

```bash
npm start
```

## Testing

```bash
npm test
```

## Endpoints

### Phone Catalog

__All Phones__
`GET` `http://127.0.0.1:3000/api/v1/phones`

```javascript
{
    "data": [
        {
            "name": "Phone 1",
            "description": "First Phone",
            "image": "",
            "price": 100,
            "created_at": "2018-10-21T14:42:18.000Z"
        },
        {
            "name": "Phone 2",
            "description": "Second Phone",
            "image": "",
            "price": 150,
            "created_at": "2018-10-21T14:42:36.000Z"
        },
        ...
    ],
    "error": false,
    "statusCode": 200,
    "statusText ": "OK"
}
```

__Get Phone__
`GET` `http://127.0.0.1:3000/api/v1/phones/:id`

```javascript
{
    "data": [
        {
            "name": "Phone 1",
            "description": "First Phone",
            "image": "",
            "price": 100,
            "created_at": "2018-10-21T14:42:18.000Z"
        }
    ],
    "error": false,
    "statusCode": 200,
    "statusText ": "OK"
}
```

### Clients

__All Clients__
`GET` `http://127.0.0.1:3000/api/v1/clients`

```javascript
{
    "data": [
        {
            "name": "Dummy",
            "surname": "Dummy",
            "created_at": "2018-09-20T15:58:25.000Z"
        },
        ...
    ],
    "error": false,
    "statusCode": 200,
    "statusText ": "OK"
}
```

__Get Client__
`GET` `http://127.0.0.1:3000/api/v1/clients/:id`

```javascript
{
    "data": [
        {
            "name": "Dummy",
            "surname": "Dummy",
            "created_at": "2018-09-20T15:58:25.000Z"
        }
    ],
    "error": false,
    "statusCode": 200,
    "statusText ": "OK"
}
```

### Orders

__New Order__
__`POST`__ `http://127.0.0.1:3000/api/v1/orders/`

Required fields

- __Name__ Customer first name.
- __Surname__ Customer last name.
- __Email__ Customer email.
- __Phones__ List of phones id that customer wants to buy.

```javascript
{
    "name":"Dummy",
    "surname":"Dummy",
    "email":"dummy@test.com",
    "phones":"1,2"
}
```

Response

```javascript
{
    "data": {
        "order_number": 1,
        "total_price": 250,
        "client": {
            "name": "Dummy",
            "surname": "Dummy",
            "created_at": "2018-09-20T15:58:25.000Z"
        },
        "phones": [
            {
                "name": "Phone 1",
                "description": "First Phone",
                "image": "",
                "price": 100,
                "created_at": "2018-09-20T14:42:18.000Z"
            },
            {
                "name": "Phone 2",
                "description": "Second Phone",
                "image": "",
                "price": 150,
                "created_at": "2018-09-20T14:42:36.000Z"
            }
        ]
    },
    "error": false,
    "statusCode": 201,
    "statusText": "OK"
}
```