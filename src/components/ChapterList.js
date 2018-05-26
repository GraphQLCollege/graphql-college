import React from 'react'
import Link from 'gatsby-link'

export default class ChapterList extends React.Component {
  render() {
    const { chapterList, ...props } = this.props
    return (
      <div {...props} className="chapter-list">
        <span
          style={{
            marginBottom: 20,
            display: 'inline-block',
            fontWeight: 'bold',
          }}
        >
          Chapters
        </span>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            1. Reading and writing data
            <ul style={{ listStyleType: 'none' }}>
              <li>1.1 Queries and Mutations</li>
              <li>1.2 Query</li>
              <li>1.3 Nested Fields</li>
              <li>1.4 Multiple fields</li>
              <li>1.5 Operation name</li>
              <li>1.6 Arguments</li>
              <li>1.7 Aliases</li>
              <li>1.8 Fragments</li>
              <li>1.9 Variables</li>
              <li>1.10 Directives</li>
              <li>1.11 Default variables</li>
              <li>1.12 Inline fragments</li>
              <li>1.13 Meta fields</li>
              <li>1.14 Mutations</li>
            </ul>
          </li>
          <li>
            2. Data modeling
            <ul style={{ listStyleType: 'none' }}>
              <li>2.1 Schema, types and resolvers</li>
              <li>2.2 Schemas</li>
              <li>2.3 Type definitions</li>
              <li>2.4 Resolvers</li>
            </ul>
          </li>
          <li>
            3. Building GraphQL APIs
            <ul style={{ listStyleType: 'none' }}>
              <li>3.1 Database</li>
              <li>3.2 Business logic</li>
              <li>3.3 Testing</li>
              <li>3.4 Subscriptions</li>
              <li>3.5 File organization</li>
            </ul>
          </li>
          <li>
            4. Building GraphQL clients
            <ul style={{ listStyleType: 'none' }}>
              <li>4.1 Apollo Client</li>
              <li>4.2 React Apollo</li>
              <li>4.3 Subscriptions</li>
              <li>4.4 Testing</li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}
