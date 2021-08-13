# Musiqueue
Simple app for queuing music albums using GraphQL with database hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Built with
Front End: React, Apollo, Styled Components
Back End: Node.js (Express), Mongoose, GraphQL

## Prerequisities
To install and run the app you need to have Node.js installed on your machine.
If you don't have Node.js installed you can either download it from [Node.js page](https://nodejs.org/en/download/) or using Homebrew:

```bash
brew install node
```

## Installation
Download/clone the repo then run

```bash
# Install dependencies for server
npm install

# Install dependencies for client
cd client && npm install

```
To run the client/server navigate back to parent directory and:

```bash

# Run the Express server only
npm start

# Run the React client only
cd client
npm start

# Server runs on http://localhost:5000 and client on http://localhost:3000

```
## Live version
https://musiqueueue.herokuapp.com/

## Older versions
The first versions of the app is now moved to v1 branch. It was build with pre-hook react and old apollo client libs.
Updated frontend version on master (deployed on heroku) and v2.

## License
This project is licensed under the ISC License

ISC © [Agata Kosior](https://github.com/koko57)
