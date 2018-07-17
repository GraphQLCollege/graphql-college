import React, { Component } from "react";
import dynamic from "next/dynamic";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import NoSSR from "react-no-ssr";
import styled from "styled-components";

import "graphiql/graphiql.css";
import Burger from "./Burger";

const GraphiQL = dynamic(import("graphiql"), {
  ssr: false
});

const typeDefs = `
type Query {
  burger: Burger!
}

type Burger {
  bun(type: Bun!): Bun
  patty(type: Patty!): Patty
  topping: Topping
}

enum Bun {
  simple
  sesame
}

enum Patty {
  meat
  doubleMeat
  tripleMeat
  chicken
  mushroom
  sauteedVegetables
}

enum Cheese {
  simple
  cheddar
}

type Topping {
  cheese(type: Cheese!): Cheese
  egg: Boolean
  lettuce: Boolean
  tomato: Boolean
  bacon: Boolean
}
`;

const resolvers = {
  Query: {
    burger: () => ({})
  },
  Burger: {
    bun: (_, { type }) => type,
    patty: (_, { type }) => type,
    topping: () => ({})
  },
  Topping: {
    cheese: (a, { type }) => type
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .graphiql-container {
    height: 400px;
  }

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

class App extends Component {
  state = { burger: null };
  render() {
    return (
      <Wrapper>
        <NoSSR>
          <GraphiQL
            fetcher={graphQLParams => {
              return graphql(schema, graphQLParams.query).then(res => {
                if (res.errors) {
                  return;
                }
                this.setState({ burger: res.data.burger });
                return res;
              });
            }}
            defaultQuery={this.props.defaultQuery}
            schema={schema}
          />
        </NoSSR>
        <Burger burger={this.state.burger} />
      </Wrapper>
    );
  }
}

export default App;
