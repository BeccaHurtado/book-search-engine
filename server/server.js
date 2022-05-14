const express = require('express');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express')
const { authMiddleware } = require('./utils/auth')

// import typeDefs and resolvers
const {typeDefs, resolvers } = require('./schemas')

const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// create a new instance of an Apollo server with graphQl schema
const startApolloServer = async ( typeDefs, resolvers ) => {
  await server.start();

  // integrate apollo server with the express application middleware
  server.applyMiddleware({ app })

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
  // app.use(routes);
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on port ${PORT}`)

      // log where we can go to test our GQL api
      console.log(`Use GraphQl at https://localhost:${PORT}${server.graphqlPath}`)
    })
  });
}
