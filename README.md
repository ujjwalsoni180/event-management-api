# Event Management API

A REST API for managing events using Node.js, Express.js and MongoDB.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /events | Create a new event |
| GET | /events | Get all events |
| GET | /events/:id | Get a single event |
| PUT | /events/:id | Update an event |
| DELETE | /events/:id | Delete an event |

## Event Fields

- name
- description
- dateTime
- venue
- maxCapacity
- status

## Search and Filtering

Search by name:

`GET /events?search=Tech`

Filter by venue:

`GET /events?venue=Auditorium`

Filter by status:

`GET /events?status=Upcoming`

## Pagination

`GET /events?page=1&limit=2`

## Sorting

`GET /events?sort=dateTime`

## HTTP Status Codes

- 200 - Successful request
- 201 - Event created
- 400 - Invalid request
- 404 - Event not found
- 409 - Conflict

## Run the Project

Install dependencies:

`npm install`

Start the server:

`node server.js`

Server:

`http://localhost:3000`

## Database

The project uses MongoDB Atlas for persistent event storage.