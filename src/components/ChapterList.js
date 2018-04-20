import React from 'react'
import Link from 'gatsby-link'

export default class ChapterList extends React.Component {
  render() {
    const { chapterList, ...props } = this.props
    return (
      <div {...props} className="chapter-list">
        <span style={{ marginBottom: 20, display: 'inline-block' }}>
          GraphQL Webapps
        </span>
        <ol>
          {chapterList.map(({ title, slug, metadata }) => (
            <li key={slug}>
              {metadata.online ? (
                <Link
                  onClick={() => this.setState({ isOpen: false })}
                  to={`/graphql-webapps/${slug}`}
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </li>
          ))}
        </ol>
      </div>
    )
  }
}
