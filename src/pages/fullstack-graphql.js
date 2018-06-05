import React from 'react'
import { media } from 'glamor'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'
import Book from '../components/book-perspective.svg'
import Button from '../components/Button'
import SubscribeForm from '../components/SubscribeForm'

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
              href="/fullstack-graphql-sample.zip"
              className="sample-chapter-button"
            >
              Sample chapter
            </a>
          </div>
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
      </div>
    )
  }
}

export default FullstackGraphQL
