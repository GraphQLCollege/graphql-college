import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Tweet } from "react-twitter-widgets";

import Book from "../components/book-perspective.svg";
import Button from "../components/Button";
import SubscribeForm from "../components/SubscribeForm";
import MediumLogo from "../components/medium-logo.svg";
import FacebookLogo from "../components/facebook-logo.svg";
import GithubLogo from "../components/github-logo.svg";
import PinterestLogo from "../components/pinterest-logo.svg";
import ShopifyLogo from "../components/shopify-logo.svg";
import TwitterLogo from "../components/twitter-logo.svg";
import KhanLogo from "../components/khan-logo.svg";
import AirbnbLogo from "../components/airbnb-logo.svg";
import PaypalLogo from "../components/paypal-logo.svg";
import GithubCornerRight from "../components/github-corner-right.svg";

const BookButtons = () => (
  <div className="book-buttons">
    <a
      className="gumroad-button"
      href="https://gum.co/fullstack-graphql?wanted=true"
      target="_blank"
      data-gumroad-single-product="true"
    >
      Buy
    </a>
    <a
      target="_blank"
      href="/static/fullstack-graphql-sample.zip"
      className="sample-chapter-button"
    >
      Sample chapter
    </a>
  </div>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  max-width: 800px;
  margin: 0 auto;

  .book-main-copy {
    margin-top: 50px;
  }

  @media (min-width: 600px) {
    display: grid;
    grid-template-areas: "headline book" "content content";
    grid-template-columns: 50% 50%;
    padding: 20px;

    .book-main-copy {
      padding: 1.75rem;
      margin-top: 0;
    }
  }

  h1 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
    color: inherit;
    font-family: Rubik;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    font-size: 2.5rem;
    line-height: 1.1;
  }

  p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
  }

  img {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
    display: block;
  }

  a {
    text-decoration: none;
  }
`;

class FullstackGraphQL extends React.Component {
  render() {
    return (
      <Wrapper>
        <Helmet title="Fullstack GraphQL">
          <meta property="og:title" content="Fullstack GraphQL" />
          <meta
            property="og:description"
            content="Book about building FullStack GraphQL Applications"
          />
          <meta
            property="og:image"
            content="http://graphql.college/fullstack-graphql.jpg"
          />
          <meta
            property="og:url"
            content="https://graphql.college/fullstack-graphql"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content="Fullstack GraphQL" />
          <meta name="twitter:image:alt" content="Book cover" />
          <script src="https://gumroad.com/js/gumroad.js" />
        </Helmet>
        <Book
          style={{
            justifySelf: "center",
            gridArea: "book",
            width: "100%",
            maxWidth: 400,
          }}
        />
        <a
          href="https://github.com/GraphQLCollege/fullstack-graphql"
          target="_blank"
        >
          <GithubCornerRight />
        </a>
        <div className="book-main-copy" style={{ gridArea: "headline" }}>
          <h1 style={{ textTransform: "uppercase", fontWeight: 400 }}>
            Learn to build FullStack GraphQL Applications
          </h1>
          <p>
            Learn GraphQL with a hands-on approach. With this{" "}
            <a
              href="https://github.com/GraphQLCollege/fullstack-graphql"
              target="_blank"
              style={{
                color: "#e535ab",
              }}
            >
              open source book
            </a>{" "}
            you will build a full stack GraphQL application step by step using
            NodeJS, Apollo GraphQL and React.
          </p>
          <BookButtons />
        </div>
        <h2 style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          Overwhelmed by all the tools required for building GraphQL
          applications? <b>Learn how every piece fits together</b>
        </h2>
        <SubscribeForm text="Subscribe to receive book updates" />
        <div className="what-you-will-build">
          <h2>What you'll build</h2>
          <img src="/static/pinapp.gif" />
          <p>
            You will build from scratch a Pinterest clone called PinApp. Every
            chapter will slowly teach you the different moving parts of a
            GraphQL stack by adding features to the example project.
          </p>
          <p>
            Focus on learning, not on environment setup. Every chapter contains
            live, editable code samples.
          </p>
          <p>
            The <b>first chapter</b> will teach you how to read and write data
            from PinApp, like fetching users or pins, using the GraphQL query
            language.
          </p>
          <div className="code-samples">
            <a
              href="https://glitch.com/edit/#!/pinapp-queries-mutations"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Queries and mutations example
            </a>
          </div>
          <p>
            The <b>second chapter</b> will teach you how to design PinApp's data
            model using the GraphQL schema design language.
          </p>
          <div className="code-samples">
            <a href="https://glitch.com/edit/#!/pinapp-schema" target="_blank">
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Schema example
            </a>
          </div>
          <p>
            In the <b>third chapter</b> you will learn how to create PinApp's
            GraphQL APIs using{" "}
            <a
              href="https://www.apollographql.com/docs/apollo-server/"
              target="_blank"
            >
              Apollo Server
            </a>
            . You will expose to HTTP the schema you designed in the previous
            chapter. You will also learn how to connect an API with a Postgres
            database, and how to organize the API source code.
          </p>
          <div className="code-samples">
            <a href="https://glitch.com/edit/#!/pinapp-server" target="_blank">
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Server example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-database"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              SQLite3 example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-email-authentication"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Email Authentication example
            </a>
            <a href="https://glitch.com/edit/#!/pinapp-files" target="_blank">
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              File management example
            </a>
          </div>
          <p>
            The <b>fourth chapter</b> teaches you how to build PinApp's frontend
            using{" "}
            <a target="_blank" href="https://www.apollographql.com/client">
              Apollo Client 2.0
            </a>{" "}
            and{" "}
            <a href="https://reactjs.org/" target="_blank">
              React 16
            </a>
            .
          </p>
          <div className="code-samples">
            <a href="https://glitch.com/edit/#!/pinapp-initial" target="_blank">
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              React example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-client-side-state"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Client side state example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-apollo-client"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Apollo Client example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-react-apollo"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              React Apollo example
            </a>
          </div>
          <p>
            In the <b>fifth chapter</b> you will learn how to add real time
            features to PinApp using GraphQL Subscriptions.
          </p>
          <div className="code-samples">
            <a
              href="https://glitch.com/edit/#!/pinapp-postgres"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Postgres example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-subscriptions"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Server side Subscriptions example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-apollo-boost-migration"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Apollo Boost migration example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-client-subscriptions"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Client side Subscriptions example
            </a>
          </div>
          <p>
            The <b>sixth chapter</b> will teach you how to test PinApp's API and
            frontend using{" "}
            <a href="http://facebook.github.io/jest/" target="_blank">
              Jest
            </a>
            .
          </p>
          <div className="code-samples">
            <a
              href="https://glitch.com/edit/#!/pinapp-server-testing"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Server side testing example
            </a>
            <a
              href="https://glitch.com/edit/#!/pinapp-client-testing"
              target="_blank"
            >
              <div
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                {"< >"}
              </div>
              Client side testing example
            </a>
          </div>
        </div>
        <div className="book-section">
          <Tweet tweetId="1006238433847795712" options={{ cards: "hidden" }} />
        </div>
        <div className="chapters">
          <h2>Chapters</h2>
          <ul style={{ paddingLeft: 0 }}>
            <li className="chapter">
              <span className="chapter-number">1</span>
              <div className="chapter-title">Reading and writing data</div>
              <div className="wrap-collapsible">
                <input id="collapsible-1" className="toggle" type="checkbox" />
                <label htmlFor="collapsible-1" className="lbl-toggle">
                  Sections
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <ul className="chapter-sections">
                      <li>Queries and Mutations</li>
                      <li>Query</li>
                      <li>Nested fields</li>
                      <li>Multiple fields</li>
                      <li>Operation name</li>
                      <li>Arguments</li>
                      <li>Aliases</li>
                      <li>Fragments</li>
                      <li>Variables</li>
                      <li>Directives</li>
                      <li>Default variables</li>
                      <li>Inline fragments</li>
                      <li>Meta fields</li>
                      <li>Mutations</li>
                      <li>Summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="chapter">
              <span className="chapter-number">2</span>
              <div className="chapter-title">Data modeling</div>
              <div className="wrap-collapsible">
                <input id="collapsible-2" className="toggle" type="checkbox" />
                <label htmlFor="collapsible-2" className="lbl-toggle">
                  Sections
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <ul className="chapter-sections">
                      <li>Schema, types and resolvers</li>
                      <li>Schemas</li>
                      <li>Type definitions</li>
                      <li>Resolvers</li>
                      <li>Summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="chapter">
              <span className="chapter-number">3</span>
              <div className="chapter-title">GraphQL APIs</div>
              <div className="wrap-collapsible">
                <input id="collapsible-3" className="toggle" type="checkbox" />
                <label htmlFor="collapsible-3" className="lbl-toggle">
                  Sections
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <ul className="chapter-sections">
                      <li>Server</li>
                      <li>Database</li>
                      <li>Authentication</li>
                      <li>File organization</li>
                      <li>Summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="chapter">
              <span className="chapter-number">4</span>
              <div className="chapter-title">GraphQL Clients</div>
              <div className="wrap-collapsible">
                <input id="collapsible-4" className="toggle" type="checkbox" />
                <label htmlFor="collapsible-4" className="lbl-toggle">
                  Sections
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <ul className="chapter-sections">
                      <li>Initial React client</li>
                      <li>Client side state</li>
                      <li>Apollo Client</li>
                      <li>React Apollo</li>
                      <li>Query component</li>
                      <li>Apollo Provider</li>
                      <li>Mutation Component</li>
                      <li>Summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="chapter">
              <span className="chapter-number">5</span>
              <div className="chapter-title">Subscriptions</div>
              <div className="wrap-collapsible">
                <input id="collapsible-5" className="toggle" type="checkbox" />
                <label htmlFor="collapsible-5" className="lbl-toggle">
                  Sections
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <ul className="chapter-sections">
                      <li>Server side subscriptions</li>
                      <li>Pubsub systems</li>
                      <li>Implementing server side subscriptions</li>
                      <li>Client side subscriptions</li>
                      <li>Apollo boost migration</li>
                      <li>Implementing client side subscriptions</li>
                      <li>Summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="chapter">
              <span className="chapter-number">6</span>
              <div className="chapter-title">Testing</div>
              <div className="wrap-collapsible">
                <input id="collapsible-6" className="toggle" type="checkbox" />
                <label htmlFor="collapsible-6" className="lbl-toggle">
                  Sections
                </label>
                <div className="collapsible-content">
                  <div className="content-inner">
                    <ul className="chapter-sections">
                      <li>How to test GraphQL APIs</li>
                      <li>Testing setup</li>
                      <li>GraphQL Layer</li>
                      <li>HTTP Layer</li>
                      <li>Testing email based authentication</li>
                      <li>Subscription endpoints</li>
                      <li>How to test React Apollo GraphQL clients</li>
                      <li>Testing client-side authentication</li>
                      <li>Client subscriptions</li>
                      <li>Summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="book-section">
          <h2>Companies using GraphQL in production</h2>
          <div className="companies-using-graphql">
            <a href="https://www.facebook.com" target="_blank">
              <FacebookLogo />
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              style={{ color: "#111" }}
            >
              <GithubLogo />
            </a>
            <a href="https://www.medium.com" target="_blank">
              <MediumLogo />
            </a>
            <a href="https://www.pinterest.com" target="_blank">
              <PinterestLogo />
            </a>
            <a href="https://www.shopify.com" target="_blank">
              <ShopifyLogo />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <TwitterLogo />
            </a>
            <a href="https://www.producthunt.com" target="_blank">
              <img src="/static/producthunt-logo.webp" />
            </a>
            <a href="https://www.khanacademy.com" target="_blank">
              <KhanLogo />
            </a>
            <a href="https://www.airbnb.com" target="_blank">
              <AirbnbLogo />
            </a>
            <a href="https://www.paypal.com" target="_blank">
              <PaypalLogo />
            </a>
          </div>
        </div>
        <div className="about-author">
          <h2>Meet the author</h2>
          <p>
            Hi there! I am <b>Julian Mayorga</b>. I have been a full stack
            Javascript developer since 2013, working in a wide range of tech
            companies. From a payments startup to a digital car inspections
            company.
          </p>
          <p>
            Building beautiful frontends and APIs is my passion. And when I say
            beautiful, I mean both external as internal. Nowadays I am totally
            obsessed over GraphQL and React. Using them I feel like I can create
            lovely, maintainable products. I truly enjoy sharing this passion
            about building apps by writing at GraphQL College.
          </p>
          <img src="/static/profile-pic.png" alt={`Julian Mayorga - Author`} />
          <div
            style={{
              textAlign: "center",
            }}
          >
            <a
              href="https://twitter.com/_okjulian_"
              style={{
                boxShadow: "none",
                textDecoration: "none",
              }}
              target="_blank"
            >
              <TwitterLogo width={25} height={25} />
              @_okjulian_
            </a>
          </div>
        </div>
        <div className="final-words">
          <p>
            Interested?{" "}
            <a
              style={{
                boxShadow: "none",
                textDecoration: "underline",
                color: "#e535ab",
              }}
              target="_blank"
              href="/static/fullstack-graphql-sample.zip"
            >
              Download the sample chapter
            </a>{" "}
            to get a taste of the book. If you have any questions, I would be
            very happy to answer them, so please send me an email to{" "}
            <a
              style={{
                boxShadow: "none",
                textDecoration: "underline",
                color: "#e535ab",
              }}
              href="mailto:julian@graphql.college"
            >
              julian@graphql.college
            </a>
            .
          </p>
        </div>
        <div className="book-section">
          <BookButtons />
        </div>
      </Wrapper>
    );
  }
}

export default FullstackGraphQL;
