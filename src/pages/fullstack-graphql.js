import React from 'react'
import { media } from 'glamor'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'
import Book from '../components/book-perspective.svg'
import Button from '../components/Button'
import ChapterList from '../components/ChapterList'
import SubscribeForm from '../components/SubscribeForm'

import "./fullstack-graphql.css";

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
            Learn GraphQL with a hands-on approach. You will build a full stack
            GraphQL application step by step using NodeJS, Apollo GraphQL and
            React.
          </p>
          <div style={{ display: 'flex', fontSize: '.75rem' }}>
            <a
              className="gumroad-button"
              href="https://gum.co/fullstack-graphql?wanted=true"
              target="_blank"
              data-gumroad-single-product="true"
            >
              Buy
            </a>
          </div>
        </div>
        <div
          style={{
            padding: rhythm(),
            gridArea: 'content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <p>
              GraphQL is revolutionizing client-server communication. It is a
              powerful technology that:
            </p>
            <ol>
              <li>
                Improves communication with API consumers. Facilitates team
                communication by providing an easy way for frontend developers
                to know all methods that the API exposes. It also enables better
                communication with 3rd party API consumers because GraphQL
                services have zero configuration API documentation.
              </li>
              <li>
                Empowers clients by giving them complete data fetching control.
                GraphQL lets clients ask for the exact data that they need. Not
                more, not less. It also lets clients ask for nested resources in
                the same operation, avoiding the need for REST-style cascading
                requests. REST tends to push complexity to API clients.
              </li>
              <li>
                Optimizes network usage by reducing HTTP payloads and number of
                requests. Reducing data and requests directly maps to a better
                experience for mobile users.
              </li>
            </ol>
            <p>
              With this book you will learn how to use GraphQL to build full
              stack web applications. You will learn how to develop a complete
              GraphQL client-server application from scratch. You will learn how
              to fetch data from the client, how to design that data in the
              server, how to develop NodeJS GraphQL servers and finally how to
              create React GraphQL clients.
            </p>
            <ChapterList />
            <SubscribeForm />
          </div>
        </div>
      </div>
    )
  }
}

export default FullstackGraphQL
