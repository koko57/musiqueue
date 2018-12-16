require('dotenv').config();
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then(() => console.log('Connected to mlab'));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
