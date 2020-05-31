const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Event = require('./models/event')
const User = require('./models/user')


const port = process.env.PORT || 8080
const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql', 
    graphqlHttp({
        schema: buildSchema(`
            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            type User {
                _id: ID!
                email: String!
                password: String
            }

            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            input UserInput {
                email: String!
                password: String!
            }

            type RootQuery {
                events: [Event!]!
                users: [User!]!
            }

            type RootMutation {
                createEvent(eventInput: EventInput): Event
                createUser(userInput: UserInput): User
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
    `),
    rootValue: {
        events: () => {
            return Event.find()
                .then(events => {
                    return events.map( event => {
                        return { ...event._doc, _id: event.id }
                    })
                })
                .catch(err => {
                    console.log(err)
                    throw err
                })
        },
        user: () => {
            return User.find()
                .then(users => {
                    return users.map( user => {
                        return { ...user._doc, _id: user.id }
                    })
                })
                .catch(err => {
                    console.log(err)
                    throw err
                })
        },
        createEvent: args => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price, 
                date: new Date(args.eventInput.date)
            });
            return event
                .save()
                .then(event => {
                    return {...event._doc, _id: event._doc._id.toString()};
            }).catch(err => {
                console.log(err)
                throw err;
            });
            
        },
        createUser: args => {
            return bcrypt.hash(args.userInput.password, 12)
                .then( hashedPW => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPW,
                    });
                    return user
                        .save()
                        .then(user => {
                            return {...user._doc, _id: user.id }
                        })
                        .catch(err => {
                            console.log(err)
                            throw err;
                        });
                })
                .catch(err=> {
                    console.log(err);
                    throw err;
                });
            
        },
    },
    graphiql: true
})
);

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('Listening on http://localhost:' + port)
    app.listen(port);
}).catch(err =>{
    console.log(err);
})

