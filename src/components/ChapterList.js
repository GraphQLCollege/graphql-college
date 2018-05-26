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
          <li>1. Introduction</li>
          <li>
            2. Reading and writing data
            <ul style={{ listStyleType: 'none' }}>
              <li>2.1 Queries and Mutations</li>
              <li>2.2 Query</li>
              <li>2.3 Nested Fields</li>
              <li>2.4 Multiple fields</li>
              <li>2.5 Operation name</li>
              <li>2.6 Arguments</li>
              <li>2.7 Aliases</li>
              <li>2.8 Fragments</li>
              <li>2.9 Variables</li>
              <li>2.10 Directives</li>
              <li>2.11 Default variables</li>
              <li>2.12 Inline fragments</li>
              <li>2.13 Meta fields</li>
              <li>2.14 Mutations</li>
            </ul>
          </li>
          <li>
            3. Data modeling
            <ul style={{ listStyleType: 'none' }}>
              <li>3.1 Schema, types and resolvers</li>
              <li>3.2 Schemas</li>
              <li>3.3 Type definitions</li>
              <li>3.4 Resolvers</li>
            </ul>
          </li>
          <li>
            4. Building GraphQL APIs
            <ul style={{ listStyleType: 'none' }}>
              <li>4.1 Database</li>
              <li>4.2 Business logic</li>
              <li>4.3 Testing</li>
              <li>4.4 Subscriptions</li>
              <li>4.5 File organization</li>
            </ul>
          </li>
          <li>
            5. Building GraphQL clients
            <ul style={{ listStyleType: 'none' }}>
              <li>5.1 Apollo Client</li>
              <li>5.2 React Apollo</li>
              <li>5.3 Subscriptions</li>
              <li>5.4 Testing</li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}
