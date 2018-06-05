import React from 'react'
import { media } from 'glamor'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'
import Book from '../components/book-perspective.svg'
import Button from '../components/Button'
import SubscribeForm from '../components/SubscribeForm'
import profilePic from '../components/profile-pic.png'

import './fullstack-graphql.css'

class FullstackGraphQL extends React.Component {
  render() {
    return (
      <div
        css={[
          { display: 'flex', flexDirection: 'column' },
          media('(min-width: 600px)', {
            display: 'grid',
            gridTemplateAreas: "'headline book' 'content content'",
            gridTemplateColumns: '50% 50%',
          }),
        ]}
      >
        <Helmet title="Fullstack GraphQL" />
        <Book
          style={{
            justifySelf: 'center',
            gridArea: 'book',
            width: '100%',
            maxWidth: 400,
          }}
        />
        <div style={{ padding: rhythm(), gridArea: 'headline' }}>
          <h1 style={{ textTransform: 'uppercase', fontWeight: 400 }}>
            Learn to build FullStack GraphQL Applications
          </h1>
          <p>
            Learn GraphQL with a hands-on approach. With this book you will
            build a full stack GraphQL application step by step using NodeJS,
            Apollo GraphQL and React.
          </p>
          <div className="book-buttons">
            {/* <a
              className="gumroad-button"
              href="https://gum.co/fullstack-graphql?wanted=true"
              target="_blank"
              data-gumroad-single-product="true"
            >
              Buy
            </a> */}
            <a
              target="_blank"
              href="/fullstack-graphql-sample.zip"
              className="sample-chapter-button"
            >
              Sample chapter
            </a>
          </div>
        </div>
        <SubscribeForm text="Subscribe to receive book updates" />
        <div className="what-you-will-build">
          <h2>What you'll build</h2>
          <img src="/pinapp.gif" />
          <p>You will build from scratch a Pinterest clone called PinApp</p>
          <p>
            Every chapter will slowly teach you the different moving parts of a
            GraphQL stack.
          </p>
          <p>
            The <b>first chapter</b> will teach you how to read and write data
            from PinApp, like fetching users or pins, using the GraphQL query
            language.
          </p>
          <p>
            The <b>second chapter</b> will teach you how to design PinApp's data
            model using the GraphQL schema design language.
          </p>
          <p>
            In the <b>third chapter</b> you will learn how to create PinApp's
            GraphQL APIs using{' '}
            <a
              href="https://www.apollographql.com/docs/apollo-server/"
              target="_blank"
            >
              Apollo Server
            </a>. You will expose to HTTP the schema you designed in the
            previous chapter. You will also learn how to connect an API with a
            Postgres database, and how to organize the API source code.
          </p>
          <p>
            The <b>fourth chapter</b> teaches you how to build PinApp's frontend
            using{' '}
            <a target="_blank" href="https://www.apollographql.com/client">
              Apollo Client 2.0
            </a>{' '}
            and{' '}
            <a href="https://reactjs.org/" target="_blank">
              React 16
            </a>.
          </p>
          <p>
            In the <b>fifth chapter</b> you will learn how to add real time
            features to PinApp using GraphQL Subscriptions.
          </p>
          <p>
            The <b>sixth chapter</b> will teach you how to test PinApp's API and
            frontend using{' '}
            <a href="http://facebook.github.io/jest/" target="_blank">
              Jest
            </a>.
          </p>
        </div>
        <div className="chapters">
          <h2>Chapters</h2>
          <ul>
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
          <img src={profilePic} alt={`Julian Mayorga - Author`} />
        </div>
        <div className="final-words">
          <p>
            Interested?{' '}
            <a
              style={{
                boxShadow: 'none',
                textDecoration: 'underline',
                color: '#e535ab',
              }}
              href=""
              target="_blank"
              href="/fullstack-graphql-sample.zip"
            >
              Download the sample chapter
            </a>{' '}
            to get a taste of the book. If you have any questions, I would be
            very happy to answer them, so please send me an email to{' '}
            <a
              style={{
                boxShadow: 'none',
                textDecoration: 'underline',
                color: '#e535ab',
              }}
              href="mailto:julian@graphql.college"
            >
              julian@graphql.college
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default FullstackGraphQL
