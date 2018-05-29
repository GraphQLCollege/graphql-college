import React from 'react'
import { media } from 'glamor'
import Link from 'gatsby-link'

import Book from './book.svg'
import { rhythm } from '../utils/typography'
import Button from '../components/Button'

class NewsletterSignupForm extends React.Component {
  render() {
    return (
      <div
        css={[
          { display: 'flex', flexDirection: 'column' },
          media('(min-width: 426px)', {
            display: 'grid',
            gridTemplateAreas: 'book form',
            width: '75%',
            marginLeft: 'auto',
            marginRight: 'auto',
            gridTemplateColumns: '1fr 1fr',
          }),
        ]}
      >
        <Link style={{ boxShadow: 'none' }} to="/fullstack-graphql">
          <Book
            style={{
              alignSelf: 'center',
              justifySelf: 'center',
              maxHeight: 300,
            }}
          />
        </Link>
        <div
          css={[
            {
              width: '80%',
              alignSelf: 'center',
              justifySelf: 'center',
              height: 'auto',
            },
          ]}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'underline',
              color: '#e535ab',
            }}
            to="/fullstack-graphql"
          >
            <h3>Learn how to build Web Applications using GraphQL</h3>
          </Link>
          <div
            css={[
              {
                display: 'grid',
                gridGap: rhythm(0.5),
              },
            ]}
          >
            <div>
              Learn fullstack GraphQL development by building an app from
              scratch
            </div>
            <Link
              style={{
                display: 'inline-block',
                width: '100%',
                boxShadow: 'none',
              }}
              to="/fullstack-graphql"
            >
              <Button
                style={{ width: '100%' }}
                value="Read"
                name="read"
                type="submit"
              >
                Go
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsletterSignupForm
