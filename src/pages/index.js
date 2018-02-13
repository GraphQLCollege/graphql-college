import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { media } from 'glamor'

import Bio from '../components/Bio'
import PostsLogo from '../components/PostsLogo'
import BooksLogo from '../components/BooksLogo'
import GraphQLWebapps from '../components/GraphQLWebapps'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div
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
            gridTemplateColumns: '1fr 1fr',
          }),
        ]}
      >
        <Helmet title={siteTitle} />
        <PostsLogo
          style={{ justifySelf: 'center', gridArea: 'posts-logo' }}
          width={100}
        />
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
                    <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                  <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                </div>
              )
            })}
        </div>
        <BooksLogo
          style={{
            gridArea: 'books-logo',
            justifySelf: 'center',
          }}
          width={100}
        />
        <div
          style={{
            gridArea: 'books',
            justifySelf: 'center',
            padding: rhythm(2),
          }}
        >
          <Link style={{ boxShadow: 'none' }} to="/graphql-webapps">
            <GraphQLWebapps width={200} />
          </Link>
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
