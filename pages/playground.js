import React from "react";
import Link from "next/link";

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <h1>Playground</h1>
        <p>
          Are you an active learner, who prefers to get your hands dirty instead
          of reading through a bunch of documentation? Then you've come to the
          right place!
        </p>
        <ul
          style={{
            display: "grid",
            listStyle: "none",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            padding: 0,
            gridGap: 20
          }}
        >
          <li style={{ border: "solid 1px #e10098", padding: 20 }}>
            <div>
              <Link href="/practice-graphql">
                <a>Learn GraphQL by querying JSON</a>
              </Link>
              <ul style={{ listStyle: "none" }}>
                <li>📄 Enter any JSON data</li>
                <li>👁️ See the generated GraphQL schema</li>
                <li>🧙‍♀️ Query that schema using GraphiQL</li>
              </ul>
            </div>
          </li>
          <li style={{ border: "solid 1px #e10098", padding: 20 }}>
            <div>
              <Link href="/burger">
                <a>Customize your perfect burger using GraphQL</a>
              </Link>
              <ul style={{ listStyle: "none" }}>
                <li>🍞 Choose your bun</li>
                <li>🍖 Pick your patty</li>
                <li>🍳 Choose any topping</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
