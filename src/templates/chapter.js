import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm, scale } from '../utils/typography'
import Navigator from '../components/Navigator'
import BookHeader from '../components/BookHeader'

import './chapter.css'

class ChapterTemplate extends React.Component {
  render() {
    const chapterList = this.props.data.allGraphQlWebappsChapters.edges.map(
      ({ node: { chapter: { slug, title, metadata } } }) => ({
        slug,
        title,
        metadata,
      })
    )
    const { html, title, previous, next } = this.props.pathContext

    return (
      <div className="chapter">
        <Helmet title={title} />
        <div
          className="chapter-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Navigator previous={previous} next={next} />
        <p
          style={{
            borderTop: 'solid 1px',
            marginTop: '1.75rem',
            paddingTop: '1rem',
          }}
        >
          Doubts? Suggestions?{' '}
          <a
            style={{ display: 'inline-block', marginBottom: 70 }}
            href="https://github.com/GraphQLCollege/graphql-webapps/issues"
            target="_blank"
          >
            Let us know and we will help you
          </a>
        </p>
        <BookHeader chapter={title} chapterList={chapterList} />
      </div>
    )
  }
}

export default ChapterTemplate

export const pageQuery = graphql`
  query GraphQlWebappsChaptersList {
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
