import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "type-graphql";
import { resolvers } from "./graphql/resolvers";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    public async middleware(): Promise<void> {

        const schema = await buildSchema({
            dateScalarMode: "isoDate",
            resolvers,
            validate: false
        });

        this.express.use("/graphql", graphqlHTTP({
            graphiql: true,
            schema
        }));
    }
}

export default new App().express;
