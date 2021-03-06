require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const graphqlHTTP = require('express-graphql');
const { ApolloEngine } = require('apollo-engine');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose
  .connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mlab'));

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY
});

engine.listen(
  {
    port: port,
    expressApp: app
  },
  () => {
    console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
  }
);
