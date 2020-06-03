const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const port = process.env.PORT || 8080
const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql', 
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('Listening on http://localhost:' + port)
    app.listen(port);
}).catch(err =>{
    console.log(err);
})

