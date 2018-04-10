---
title: GraphQL Subscriptions with React, Node, Apollo and Postgres
date: 2018-04-05
---

![Example](/pinapp.gif)

This guide will show you how to create a pinterest-like example using React, Node, Apollo Client, Apollo Server and Postgres.

The app allows users to add pins, list pins and update that list when users create new content.

Real time updates are possible because the app communicates with a GraphQL Subscriptions server.

Don't worry if this stack sounds overwhelming. You will learn how to make this app step by step. Let's get started by creating a simple, client side, no server version of the app.

## Contents

* [Bootstrap client](#bootstrap-client)
* [Bootstrap server](#bootstrap-server)
* [Create database](#create-database)
* [Create pins table](#create-pins-table)
* [Server side GraphQL queries](#server-side-graphql-queries)
* [Server side GraphQL mutations](#server-side-graphql-mutations)
* [Server side GraphQL subscriptions](#server-side-graphql-subscriptions)
* [Setup React Apollo](#setup-react-apollo)
* [React Apollo's Query component](#react-apollos-query-component)
* [React Apollo's Mutation component](#react-apollos-mutation-component)
* [Conclusion](#conclusion)

## Bootstrap client

First of all we will bootstrap a react app using [`create-react-app`](https://github.com/facebook/create-react-app/).

```bash
# Create directory
mkdir pinapp
# Jump into it
cd pinapp
# Install or update create-react-app
yarn global add create-react-app
# Create client
create-react-app client
# Go to /client
cd client
# Start the app
yarn start
```

Now that we have a react app running, it's time to add local state and UI components to `App.js`. First of all install some pinterest-style UI components.

```bash
yarn add apollo-subscription-example-components
```

Now delete everything inside `App.js`. On the top of the file add the required imports, which are `react` and some components from `apollo-subscription-example-components`.

The first component that we will use is `Container`. It's a wrapper whose responsibility is setting up some routes and styles. We need to set it as one of the top level components of our app.

Our app displays a list of pins. We will store them in `state.pins` so that everytime we add new pins, we rerender everything. We will pass that state to `<PinListPage />`, who knows how to render pins.

Users can create new pins. To implement that bit of functionality, add `<AddPinPage />` below `<PinListPage />`. As its name says, `<AddPinPage />` sets up a page which allows users to create new pins. It receives an `addPin` property. We will define a function that adds new pins to the state, and pass it in `addPin`.

At this point `App.js` should look like this:

```js
import React, { Component } from 'react'
import {
  Container,
  Nav,
  PinListPage,
  AddPinPage,
} from 'apollo-subscription-example-components'

class App extends Component {
  state = { pins: this.props.pins || [] }
  render() {
    return (
      <Container>
        <PinListPage pins={this.state.pins} />
        <AddPinPage
          addPin={pin => {
            this.setState(({ pins }) => ({ pins: pins.concat([pin]) }))
          }}
        />
        <Nav />
      </Container>
    )
  }
}

export default App
```

To get a feel of the app, play around with it in this sandbox:

<iframe src="https://codesandbox.io/embed/github/GraphQLCollege/apollo-subscriptions-example/tree/4d9c2ea9de7fdcaa482755adc25a5c5a3f0deb67/packages/client?module=%2Fsrc%2FApp.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Take a look at the [github repo at this point in time](https://github.com/GraphQLCollege/apollo-subscriptions-example/tree/4d9c2ea9de7fdcaa482755adc25a5c5a3f0deb67/packages/client) if you got stuck in anything.

The next step is creating a GraphQL server which will allow the app to create and list pins. It will also provide a way to listen for new pins, so that users can see when other people create new content.

## Bootstrap server

It's time to create the GraphQL server that will communicate with our webapp. We will use Apollo Server to handle HTTP requests. We will also setup a Postgres database. Postgres will serve two purposes. The first one is storing data. The second one is as a PubSub service, sending messages to the server every time a user creates pins.

Using Postgres as a Subscriptions enabler makes for a simple, production ready setup. It's also perfect for MVPs because it fits perfectly in Heroku's free tier, which allows you to setup Node servers and Postgres databases for free. If you did not use Postgres for Subscriptions, you'd have to add additional services to your stack, like Redis or RabbitMQ, among others. Having extra services comes with added complexity, which you might not need for simpler projects (or even for complex ones).

Let's get our hands dirty. Bootstrap the files that our server needs with the following commands.

```bash
# Create server folder. We assume that you are inside client folder at this point.
mkdir ../server
# Go to server folder
cd server
# Create package.json
yarn init -y
# Create index file
touch index.js
```

## Create database

Now let's create a database inside postgres. To do that we will add two dependencies to handle environment variables, `dotenv` and `run.env`.

[`dotenv`](https://github.com/motdotla/dotenv) allows us to define environment variables in a file called `.env`.

[`run.env`](https://github.com/palanik/run.env) allows us to load `dotenv` when we run `postgres`' `createdb` command.

```bash
yarn add dotenv
yarn add run.env --dev
```

Create a file called `.env`. Using the following contents will work with Postgres' default config, but feel free to change them with your desired values:

```
HOST=localhost
PORT=3001
DB="pinapp"
DBHOST=localhost
DBPORT=5432
DBUSER=postgres
DBPASSWORD=
```

Finally run `createdb` to create a database inside Postgres.

```bash
npx run.env createdb pinapp
```

Now that we have a database created, it's time to create a table which will hold all pins.

## Create pins table

We will use a library called `knex` to interact with Postgres. It will allow us to setup migrations. It also provides a functional javascript API that abstracts SQL queries.

Run the following commands to generate a migration file:

```bash
# Add dependencies
yarn add pg knex
# Init knex. This creates a configuration file called knexfile.js
npx knex init
```

Replace the contents of `knexfile.js` with the following code. It is almost the same code that `knex init` generated, but this one connects our environment variables to their corresponding connection fields.

```js
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DBHOST,
      database: process.env.DB,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.DBHOST,
      database: process.env.DB,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.DBHOST,
      database: process.env.DB,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
```

Generate a migration file.

```bash
npx run.env knex migrate:make create_pins_table
```

Add a couple of functions to `migrations/create_pins_table.js`. Up function will run when we migrate our database, and down will run when we rollback migrations.

This migration creates a table called `pins`. It adds a self-incrementing field called `id`, along with three string fields called `title`, `link` and `image`.

```js
exports.up = knex =>
  knex.schema.createTable('pins', t => {
    t.increments('id').primary()
    t.string('title')
    t.string('link')
    t.string('image')
  })

exports.down = knex => knex.schema.dropTableIfExists('pins')
```

Finally, run the migration to create the table.

```bash
npx run.env knex migrate:latest
```

## Server side GraphQL queries

Now it's time to create the API using [Apollo Server](https://www.apollographql.com/docs/apollo-server/).

First of all install dependencies:

```bash
yarn add express body-parser apollo-server-express graphql-tools graphql
```

Now create `index.js`. Add the dependencies we just installed and also set `PORT` and `HOST` variables:

```js
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')

const database = require('./database')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
```

Create `database.js` with the following code:

```js
const knex = require("knex")(
  require("./knexfile")[process.env.NODE_ENV || "development"]
);

module.exports = knex;
```

Now we will define a `Pin` type using GraphQL's [Schema Definition Language (SDL)](https://graphql.org/learn/schema/#type-system). This type will define the fields that make up a `Pin`, which are `title`, `link`, `image` and `id`. The first three types are `String`, and `id` is an `Int`. We set all of those types as required by adding a `!` after them.

We will also define a `pins` query. It returns an object with a field called `pins`, which contains an array of elements of type `Pin`.

```js
const typeDefs = `
  type Pin { title: String!, link: String!, image: String!, id: Int! }
  type Query { pins: [Pin] }
`
```

We defined a Query in the previous schema, now it's time to associate a function that our server will execute everytime a client asks for `pins`.

```js
const resolvers = {
  Query: {
    pins: async () => {
      const pins = await database('pins').select()
      return pins
    },
  }
}
```

The last step to having a working schema is connecting `typeDefs` to `resolvers`. To achieve that we will use a function from `graphql-tools` called `makeExecutableSchema`.

Finally we will define two routes. Our API endpoint will be server at `/graphql`. We will expose a GraphiQL instance at `graphiql` to let users discover our schema, and send queries.

After all the previous code changes, this is what `index.js` should look like:

```js
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const database = require('./database')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

const typeDefs = `
  type Pin { title: String!, link: String!, image: String!, id: Int! }
  type Query { pins: [Pin] }
`

const resolvers = {
  Query: {
    pins: async () => {
      const pins = await database('pins').select()
      return pins
    },
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const server = express()

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://${HOST}:${PORT}/subscriptions`,
  })
)

server.listen(PORT, () => {
  console.log(`Go to http://${HOST}:${PORT}/graphiql to run queries!`)
})
```

Add `start` and `dev` commands to your `package.json`:

```json
{
  "name": /* */,
  "version": /* */,
  "description": /* */,
  "main": /* */,
  "repository": /* */,
  "author": /* */,
  "license": /* */,
  "scripts": {
    "start: "node index.js",
    "dev": "nodemon index.js",
    "db:create": "run.env createdb pinapp",
    "db:migrate": "run.env knex migrate:latest"
  }
}
```

Install nodemon as dev dependency so that our server restarts itself after every change:

```bash
yarn add nodemon --dev
```

Go ahead, start the server with `yarn dev` and send your first query at `http://localhost:3001/graphiql`.

```graphql
{
  pins {
    id
    title
    link
    image
  }
}
```

![Query example](/graphiql-query.gif)

The API allows client to list pins, so the next step is allowing them to create pins.

## Server side GraphQL mutations

In order to let clients create pins, we need to do two things. Define a new `Mutation` type in our type definitions, and also create a corresponding resolver.

We will create a mutation called `addPin`. It will receive `title`, `link` and `image` s required values. It will return the created pin `id`.

```js
// ...
const typeDefs = `
  type Pin { title: String!, link: String!, image: String!, id: Int! }
  type Query { pins: [Pin] }
  type Mutation { addPin(title: String!, link: String!, image: String!): Int }
`;
```

We will add a `Mutation` field to `resolvers`. It's function will insert a pin to the database and return the created id.

```js
const resolvers = {
  Query: {/* */},
  Mutation: {
    addPin: async (_, { title, link, image }) => {
      const [id] = await database("pins")
        .returning("id")
        .insert({ title, link, image });
      return id;
    }
  }
};
// ...
```

That's all we need in order to allow users to create pins. Try the new mutation by going to `http://localhost:3001/graphiql` and send the following query:

```graphql
mutation {
  addPin(title: "Best GraphQL video ever!", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image:"https://graphql.org/img/logo.svg")
}
```

![Mutation example](/graphiql-mutation.gif)

The final feature of our API is providing a way for clients to get notified whenever a user adds new pins. We will use GraphQL Subscriptions to achieve that.

## Server side GraphQL subscriptions

Adding Subscriptions to an Apollo GraphQL Server is pretty straightforward. We will follow the steps defined in [Apollo Server Subscription docs](https://www.apollographql.com/docs/graphql-subscriptions/). It will require five steps:

1. Install dependencies:

```bash
yarn add subscriptions-transport-ws graphql-postgres-subscriptions
```

2. Change our schema by adding a `Subscription` query and resolver

```js
const typeDefs = `
  type Pin { title: String!, link: String!, image: String!, id: Int! }
  type Query { pins: [Pin] }
  type Mutation { addPin(title: String!, link: String!, image: String!): Int }
  type Subscription { pinAdded: Pin }
`
```

3. Setup a PostgresPubSub instance that our server will publish new events to

```js
const pubsub = new PostgresPubSub({
  user: process.env.USER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
})
```

4. Hook together PubSub and GraphQL Subscription

```js
const resolvers = {
  Query: {/* */},
  Mutation: {
    addPin: async (_, { title, link, image }) => {
      // ...
      pubsub.publish("pinAdded", { pinAdded: { title, link, image, id } });
      return id;
    }
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator('pinAdded'),
    },
  },
}
```

5. Setting up a `SubscriptionServer`

```js
const ws = createServer(server)

ws.listen(PORT, () => {
  console.log(`Go to http://${HOST}:${PORT}/graphiql to run queries!`)
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    }
  )
})
```

This is what the new changes in `index.js` look like:

```js
// ...
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { PostgresPubSub } = require('graphql-postgres-subscriptions')

const pubsub = new PostgresPubSub({
  user: process.env.USER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
})

// ...

const typeDefs = `
  type Pin { title: String!, link: String!, image: String!, id: Int! }
  type Query { pins: [Pin] }
  type Mutation { addPin(title: String!, link: String!, image: String!): Int }
  type Subscription { pinAdded: Pin }
`

const resolvers = {
  Query: {/* */},
  Mutation: {
    addPin: async (_, { title, link, image }) => {
      // ...
      pubsub.publish("pinAdded", { pinAdded: { title, link, image, id } });
      return id;
    }
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator('pinAdded'),
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const server = express()

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://${HOST}:${PORT}/subscriptions`,
  })
)

const ws = createServer(server)

ws.listen(PORT, () => {
  console.log(`Go to http://${HOST}:${PORT}/graphiql to run queries!`)
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    }
  )
})
```

You can play with subscriptions by starting two servers at the same time.

```bash
# Start server in localhost:3001
node index.js
# Start server in localhost:3002
PORT=3002 node index.js
```

Send a subscription query to one of them using GraphiQL (http://localhost:3001/graphiql).

```graphql
subscription {
  pinAdded {
    id
    title
    link
    image
  }
}
```

Afterwards send a mutation to the other server (http://localhost:3002/graphiql).

```graphql
mutation {
  addPin(title: "Truly the best GraphQL video ever!", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image:"https://graphql.org/img/logo.svg")
}
```

This is what that should look like. Notice that the subscription query receives the data we asked as soon as we send the mutation.

![Subscription example](/graphiql-subscription.gif)

That's it, we are finished with the server for now. [Here](https://github.com/GraphQLCollege/apollo-subscriptions-example/tree/18eb0e4ffbafbd90956a772e56746f0113fa38e2/packages/server) is it's source code in case you need it.

Now let's connect client and server using Apollo Client.

## Setup React Apollo

We will use [React Apollo](https://www.apollographql.com/docs/react/) to connect our components with GraphQL queries. React Apollo is a library which lets us query GraphQL APIs using React components. Not only Apollo Client makes it dead easy to query GraphQL APIs, but it also provides several features like merging queries from different components into a single HTTP request and zero-config caching.

There are two ways to setup React Apollo. One way is installing [Apollo Boost](https://www.apollographql.com/docs/react/essentials/get-started.html), and the other is [installing several dependencies](https://www.apollographql.com/docs/react/advanced/boost-migration.html). The first one is a quicker way to get started. It's perfectly fine for simple use cases. But if we want greater flexibility or we have advanced requirements (such as using Subscriptions), then the second one is the only choice.

We will install the required libraries with the following command:

```bash
yarn add apollo-cache-inmemory apollo-client apollo-link apollo-link-error apollo-link-http graphql graphql-tag react-apollo
```

To use React Apollo we need to wrap our components with a `<ApolloProvider />`. It must be one of the top level components of our app. `ApolloProvider` receives a client property, which we can create with `new ApolloClient({ link, cache })`.

We will create a link using `ApolloLink.from`. It composes different links into one, which we can send to `ApolloClient` constructor. We will use `apollo-link-http` and `apollo-link-error`. We configure http link with our server's uri. Error link exposes an `onError` function, which we will use to log our app GraphQL and network errors.

To summarize, you need to do three things:

1. Add new dependencies
2. Setup Apollo Client
3. Wrap your components with ApolloProvider

This is what `App.js` must look like after those changes:

```js
import React, { Component } from "react";
import {
  Container,
  Nav,
  PinListPage,
  AddPinPage,
  Spinner
} from "apollo-subscription-example-components";
// 1. Add new dependencies
import gql from "graphql-tag";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

// 2. Setup client
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: "http://localhost:3001/graphql",
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

// 3. Wrap components with ApolloProvider
class App extends Component {
  state = { pins: this.props.pins || [] };
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <PinListPage pins={this.state.pins} />
          <AddPinPage
            addPin={pin => {
              this.setState(({ pins }) => ({ pins: pins.concat([pin]) }));
            }}
            />
          <Nav />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
```

We must make an additional change to our server. By default, it rejects requests made from different domains. To change that behavior, we will add and install a package called `cors`. It will make our API (hosted at http://localhost:3001) accept requests from our client, which is at a different domain (http://localhost:3000).

Run these commands:

```bash
cd ../server
yarn add cors
```

Require and setup cors middleware in `server/index.js`:

```js
const cors = require("cors");

// ...

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const server = express()

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

server.use(cors())
```

Now that we have setup our client and server, it's time to use React Apollo's `<Query />` component to fetch data from the API.

## React Apollo's Query component

React Apollo provides a `<Query />` component. It receives a graphql query as input, and outputs an object with `loading`, `error` and `data` properties. It looks a little bit like this: `<Query query={MY_QUERY}>{({ data, loading, error }) => <YourComponent data={data} loading={loading} error={error} />}</Query>`.

As you may have noticed, `<Query />` receives a function as children. Most React components receive other components as child, not functions. Both `Query` and `Mutation` components implement a technique called render props. It is just a way of sharing data between React components. Read more about it in [this page](https://reactjs.org/docs/render-props.html) from the official React documentation.

We will use React Apollo's `<Query />` component to create a component called `PinsQuery`. It will fetch data from our API, and return that information to `<PinListPage />`. To understand what we'll make, it's useful to look at how we want to use it.

```js
<PinsQuery>{pins => <PinListPage pins={pins} />}</PinsQuery>
```

As you can see, we will create this component using render props, the same technique that React Apollo uses.

The responsibilities of `<PinsQuery />` are:

* Receive `PINS_QUERY`
* Fetch data
* If loading is true, render a `<Spinner />`
* If error is true, show an error message
* If data is defined, then pass it as an argument to `children`

This is what the implementation looks like:

```js
const PINS_QUERY = gql`
  {
    pins {
      title
      link
      image
      id
    }
  }
`;

const PinsQuery = ({ children }) => (
  <Query query={PINS_QUERY}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <div style={{ paddingTop: 20 }}>
            <Spinner show />
          </div>
        );
      if (error) return <p>Error :(</p>;

      return children(data.pins);
    }}
  </Query>
);
```

The following step is creating a `<AddPinMutation />` component, using the same technique that we used on `<PinsQuery />`.

## React Apollo's Mutation component

We will implement a component called `<AddPinMutation />` which will output a function to its children. Our `<AddPinPage />` component will receive that function and call it when it needs to.

```js
<AddPinMutation>
  {addPin => (
    <AddPinPage
      addPin={({ title, link, image }) =>
        addPin({ variables: { title, link, image } })
      }
    />
  )}
</AddPinMutation>
```

To create this component we'll use React Apollo's `<Mutation />` component.

Just like the `<Query />` component we used earlier, it receives a function as a children and a query property.

It also receives a property called `refetchQueries`. We want to update our app with the new data generated after a mutation. One way of doing that is fetching all pins after the user adds a new one. That is the simplest way to make sure that our data is updated, and is the options that we will choose for the moment.

The query that we will send to `AddPinMutation` has a new aspect compared to `PINS_QUERY`: It implements [GraphQL variables](http://graphql.org/learn/queries/#variables) because it is dynamic. We want to be able to create pins with different names, links and images.

We will define three required variables called `$title`, `$link` and `$image`. This is what our query will look like:

```graphql
mutation AddPin($title: String!, $link: String!, $image: String!) {
  addPin(title: $title, link: $link, image: $image)
}
```

Add the following code after the `PinsQuery` definition to create `<AddPinMutation />`:

```js
const PinsQuery = // ...

const AddPinMutation = ({ children }) => (
  <Mutation
    mutation={gql`
      mutation AddPin($title: String!, $link: String!, $image: String!) {
        addPin(title: $title, link: $link, image: $image)
      }
    `}
    refetchQueries={[{ query: PINS_QUERY }]}
  >
    {(addPin, { data, loading, error }) =>
      children(addPin, { data, loading, error })
    }
  </Mutation>
);
```

We just added queries and mutations to our app in a few lines of code thanks to React Apollo. This is what `App.js` looks like after sending queries and mutations to our API:

```js
import React, { Component } from "react";
import {
  Container,
  Nav,
  PinListPage,
  AddPinPage,
  Spinner
} from "apollo-subscription-example-components";
import gql from "graphql-tag";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: "http://localhost:3001/graphql",
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

const PINS_QUERY = gql`
  {
    pins {
      title
      link
      image
      id
    }
  }
`;

const PinsQuery = ({ children }) => (
  <Query query={PINS_QUERY}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <div style={{ paddingTop: 20 }}>
            <Spinner show />
          </div>
        );
      if (error) return <p>Error :(</p>;

      return children(data.pins);
    }}
  </Query>
);

const AddPinMutation = ({ children }) => (
  <Mutation
    mutation={gql`
      mutation AddPin($title: String!, $link: String!, $image: String!) {
        addPin(title: $title, link: $link, image: $image)
      }
    `}
    refetchQueries={[{ query: PINS_QUERY }]}
  >
    {(addPin, { data, loading, error }) =>
      children(addPin, { data, loading, error })
    }
  </Mutation>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <PinsQuery>{pins => <PinListPage pins={pins} />}</PinsQuery>
          <AddPinMutation>
            {(addPin, { data, loading, error }) => (
              <AddPinPage
                addPin={({ title, link, image }) =>
                  addPin({ variables: { title, link, image } })
                }
              />
            )}
          </AddPinMutation>
          <Nav />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
```

In case you need it, [this](https://github.com/GraphQLCollege/apollo-subscriptions-example/tree/b77681679388420e8c95c82634c4e7e638445c3b/packages/client) is the complete source code for the client after we added React Apollo.

After making these changes, you will be able to persist created pins. That is a huge step forward compared with the previous version of the app, where a browser refresh wiped off all your fancy pins.

## Real time updates with GraphQL Subscriptions

We want to update our list of pins when a user adds a new one. React Apollo's `<Query />` component provides a very intuitive way of doing that with a property called `subscribeToMore`. It is a function that receives a subscription query and an updateQuery field which is a function.

This function will send the query argument to our subscriptions server so it can receive real time updates. When it receives new data, it will run the `updateQuery` function to merge the new data with the current data.

Before we use `subscribeToMore`, we need to add two subscription-related dependencies. Run the following command to install `apollo-link-ws` and `subscription-transport-ws`.

```bash
yarn add apollo-link-ws subscriptions-transport-ws
```

To setup subscriptions we need to do three things:

1. Point WebSocketLink to subscriptions server
2. Implement `subscribeToMorePins`
3. Call `subscribeToMorePins` in `App`'s `componentDidMount`

First of all we will add `WebSocketLink` to our list of links, alongside `apollo-link-http` and `apollo-link-error`.

```js
// ...
import { WebSocketLink } from "apollo-link-ws";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/subscriptions`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(/* */),
    wsLink,
    new HttpLink({/* */})
  ]),
  cache: new InMemoryCache()
});
```

Now it's time to update `<PinsQuery />` by adding `subscribeToMorePins`. We create a query called `PINS_SUBSCRIPTION` and send it to `<Query />`'s `subscribeToMore` function. We also add an `updateQuery` property, which is a function that receives the added pin, and adds that pin to the previous list of pins.

Finally we pass `subscribeToMorePins` as a second argument to `<PinsQuery />`'s children.

```js
const PINS_SUBSCRIPTION = gql`
  subscription {
    pinAdded {
      title
      link
      image
      id
    }
  }
`;

const PinsQuery = ({ children }) => (
  <Query query={PINS_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading)
        return (
          <div style={{ paddingTop: 20 }}>
            <Spinner show />
          </div>
        );
      if (error) return <p>Error :(</p>;
      const subscribeToMorePins = () => {
        subscribeToMore({
          document: PINS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data || !subscriptionData.data.pinAdded)
              return prev;
            const newPinAdded = subscriptionData.data.pinAdded;

            return Object.assign({}, prev, {
              pins: [...prev.pins, newPinAdded]
            });
          }
        });
      };

      return children(data.pins, subscribeToMorePins);
    }}
  </Query>
);
```

You also need to remove `refetchQueries` from `AddPinMutation` because it's not needed anymore. Our list of pins will get updated automatically every time we add a new one, no need to fetch everything again. This is also a performance win, because we used to fetch everything even though we only needed the newest element.

The last step is calling `subscribeToMorePins` in `App`'s `componentDidMount`. To do that we will need to pull `ApolloProvider` and `PinsQuery` as `App`'s parents instead of children. The reason for moving those components up is because `App` needs to receive `subscribeToMorePins` as a prop in order to call it from a lifecycle method.

This is what `App` component looks like after the last changes:

```js
class App extends Component {
  componentDidMount() {
    this.props.subscribeToMorePins();
  }
  render() {
    return (
      <Container>
        <PinListPage pins={this.props.pins} />
        <AddPinMutation>
          {(addPin, { data, loading, error }) => (
            <AddPinPage
              addPin={({ title, link, image }) =>
                addPin({ variables: { title, link, image } })
              }
            />
          )}
        </AddPinMutation>
        <Nav />
      </Container>
    );
  }
}

export default () => (
  <ApolloProvider client={client}>
    <PinsQuery>
      {/* Wrap App with PinsQuery because we need to access subscribeToMorePins in componentDidMount */}
      {(pins, subscribeToMorePins) => (
        <App pins={pins} subscribeToMorePins={subscribeToMorePins} />
      )}
    </PinsQuery>
  </ApolloProvider>
);
```

That's the final rock we needed to climb. You can now have multiple instances of our app which will update themselves every time a new pin is added.

All code is available on Github at https://github.com/GraphQLCollege/apollo-subscriptions-example.

## Conclusion

We went from zero to having a functional mini-pinterest app implemented with React, Node, Apollo Client, Apollo Server and Postgres.

I hope you learned a couple of things along the way! GraphQL Subscriptions are great tools to have at your disposal when creating GraphQL powered apps. They provide powerful real-time functionality and are also really easy to implement thanks to the abstractions provided by the Apollo stack.

Feel free to reach out to [our community](https://spectrum.chat/graphql-college) if you have any doubts.

Have a great day!
