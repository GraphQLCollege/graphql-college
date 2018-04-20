import React from 'react'
import { media } from 'glamor'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'
import Book from '../components/book-perspective.svg'
import Button from '../components/Button'
import ChapterList from '../components/ChapterList'
import SubscribeForm from '../components/SubscribeForm'

class GraphQLWebapps extends React.Component {
  render() {
    const chapterList = this.props.data.allGraphQlWebappsChapters.edges.map(
      ({ node: { chapter: { slug, title, metadata } } }) => ({
        slug,
        title,
        metadata,
      })
    )
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
        <Helmet title="GraphQL Webapps Book" />
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
            <a
              href="https://github.com/GraphQLCollege/graphql-webapps"
              target="_blank"
            >
              Open source book
            </a>{' '}
            that teaches you to build a production grade GraphQL client and
            server. We will show you how all parts of the stack fit together by
            building an app from scratch. From requirements to deployment, from
            server to client.
          </p>
          <div style={{ display: 'flex', fontSize: '.75rem' }}>
            {/* <Button style={{ width: '100%', maxWidth: 150, padding: 10 }}>
              Buy Ebook
            </Button> */}
            <Link
              style={{
                boxShadow: 'none',
                width: '100%',
                display: 'inline-block',
                marginLeft: 10,
              }}
              to="/graphql-webapps/web-development-workflow"
            >
              <Button
                value="Read"
                style={{
                  width: '100%',
                  maxWidth: 150,
                  padding: 10,
                  // backgroundColor: 'lightslategray',
                }}
                name="read"
              >
                Read
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ padding: rhythm(), gridArea: 'content' }}>
          <ChapterList chapterList={chapterList} />
          <SubscribeForm />
        </div>
      </div>
    )
  }
}

export default GraphQLWebapps

export const pageQuery = graphql`
  query GraphQlWebappsChapterList {
    allGraphQlWebappsChapters {
      edges {
        node {
          chapter {
            title
            slug
            text
            next
            previous
            html
            metadata {
              online
            }
          }
        }
      }
    }
  }
`
