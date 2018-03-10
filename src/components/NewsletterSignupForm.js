import React from 'react'
import { media } from 'glamor'
import Link from 'gatsby-link'

import Book from './GraphQLWebapps'
import { rhythm } from '../utils/typography'
import Button from '../components/Button'
import SubscribeForm from '../components/SubscribeForm'

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
        <Link style={{ boxShadow: 'none' }} to="/graphql-webapps">
          <Book
            style={{
              alignSelf: 'center',
              justifySelf: 'center',
              maxHeight: 300,
            }}
            width={'80%'}
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
            to="/graphql-webapps"
          >
            <h3>Learn how to build Web Applications using GraphQL</h3>
          </Link>
          <SubscribeForm />
        </div>
      </div>
    )
  }
}

export default NewsletterSignupForm
