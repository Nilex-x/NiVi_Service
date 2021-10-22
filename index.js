const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolver')
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI

async function ConnectMongoose() {
  await mongoose.connect(uri);
}

ConnectMongoose()
.then(() => console.log("Connected to db"))
.catch(err => console.log("mongoDB error =>", err));


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});