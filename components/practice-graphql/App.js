import React, { Component } from "react";
import GraphiQL from "graphiql";
import GraphQLJSON from "graphql-type-json";
import {
  graphql,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  printSchema,
} from "graphql";
import schemaBuilder from "./graphql-schema-from-json";
import Editor from "./Editor";
import { GraphQLError } from "graphql/error";

import data from "./data.json";

const graphQLFetcher = (schema) => (graphQLParams) => {
  return graphql(schema, graphQLParams.query);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "main",
      data: JSON.stringify(data, null, "\t"),
      schema: schemaBuilder(data),
      error: null,
      query: `{
  # Get a single entity by id
  Post(id: 1) {
      id
      title
      views
      user_id
  }
}`,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      try {
        const schema = schemaBuilder(JSON.parse(this.state.data));
        // TODO: Enforce that top level key are arrays with id keys. Use ESLINT.
        // https://github.com/marmelab/json-graphql-server#example
        this.setState((state) => ({ schema, error: null }));
      } catch (error) {
        console.error(error);
        if (error instanceof GraphQLError) {
          this.setState({ error });
        }
      }
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.mode === "main" && (
          <div className="main">
            <h2>Practice GraphQL</h2>
            <p>Learn GraphQL by querying a schema based on JSON data</p>
            <p>Here is how it works:</p>
            <ul>
              <li>
                Enter any JSON data into the{" "}
                <a
                  style={{ color: "#e535ab" }}
                  href="#"
                  onClick={() => this.setState({ mode: "editor" })}
                >
                  {"{ }"}
                </a>{" "}
                tab
              </li>
              <li>
                See the generated schema in the{" "}
                <a
                  style={{ color: "#e535ab" }}
                  href="#"
                  onClick={() => this.setState({ mode: "schema" })}
                >
                  {"[ ]"}
                </a>{" "}
                tab
              </li>
              <li>
                Query that schema in the{" "}
                <a
                  style={{ color: "#e535ab" }}
                  href="#"
                  onClick={() => this.setState({ mode: "graphiql" })}
                >
                  ▶
                </a>{" "}
                tab
              </li>
            </ul>
            <p>
              We use{" "}
              <a
                href="https://github.com/marmelab/graphql-schema-from-json"
                target="_blank"
              >
                this algorithm
              </a>{" "}
              to create a GraphQL Schema from JSON data. You can put any kind of
              JSON data in the editor, but try to stick to the rules provided by
              the algorithm. They are actually pretty simple:
            </p>
            <ol>
              <li>All top level keys should be arrays of objects</li>
              <li>Every object must have an id property</li>
            </ol>
            <p>
              <a
                style={{ color: "#e535ab" }}
                href="#"
                onClick={() => this.setState({ mode: "graphiql" })}
              >
                Start querying now! {"▶"}
              </a>
            </p>
          </div>
        )}
        {this.state.mode === "editor" && (
          <div className="editor">
            <Editor
              value={this.state.data}
              onChange={(code) => this.setState({ data: code })}
            />
            <div
              className="editor-error"
              style={{
                backgroundColor: this.state.error
                  ? "indianred"
                  : "darkseagreen",
                height: this.state.error ? "auto" : "2.5vh",
              }}
            >
              {this.state.error ? this.state.error.message : null}
            </div>
          </div>
        )}
        {this.state.mode === "schema" && (
          <div className="schema">
            <Editor
              mode="simple"
              value={printSchema(this.state.schema)}
              readOnly
            />
          </div>
        )}
        {this.state.mode === "graphiql" && (
          <GraphiQL
            // query={this.state.query}
            className={this.state.mode}
            fetcher={graphQLFetcher(this.state.schema)}
            schema={this.state.schema}
          />
        )}
        <nav>
          <span
            className="change-mode"
            onClick={() => this.setState({ mode: "main" })}
          >
            {"⬤"}
          </span>
          <span
            className="change-mode"
            onClick={() => this.setState({ mode: "editor" })}
          >
            {"{ }"}
          </span>
          <span
            className="change-mode"
            onClick={() => this.setState({ mode: "schema" })}
          >
            {"[ ]"}
          </span>
          <span
            className="change-mode"
            onClick={() => this.setState({ mode: "graphiql" })}
          >
            {"▶"}
          </span>
        </nav>
      </div>
    );
  }
}

export default App;
