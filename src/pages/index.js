import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { media } from 'glamor'

import Bio from '../components/Bio'
import PostsLogo from '../components/PostsLogo'
import BooksLogo from '../components/BooksLogo'
import Book from '../components/book.svg'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div
        className="page"
        css={[
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
          media('(min-width: 426px)', {
            display: 'grid',
            gridTemplateAreas: '"posts-logo books-logo" "posts books"',
            gridTemplateColumns: '2fr 1fr',
          }),
        ]}
      >
        <Helmet title={siteTitle} />
        <div
          css={[
            {
              gridArea: 'books',
              justifySelf: 'center',
              alignSelf: 'flex-start',
              padding: rhythm(2),
            },
            media('(min-width: 599px)', {
              justifySelf: 'flex-end',
              paddingRight: 0,
            }),
          ]}
        >
          <Link style={{ boxShadow: 'none' }} to="/graphql-webapps">
            <Book width={200} />
          </Link>
          <p css={{ width: 200 }}>
            Learn to build fullstack GraphQL apps with this open source book
          </p>
        </div>
        <div
          className="posts"
          style={{
            gridArea: 'posts',
            justifySelf: 'center',
            alignSelf: 'start',
          }}
        >
          {posts &&
            posts.length &&
            posts.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug
              return (
                <div key={node.fields.slug} className="post">
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{
                        color: '#e535ab',
                        boxShadow: 'none',
                        textDecoration: 'underline',
                      }}
                      to={node.fields.slug}
                    >
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                  <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
