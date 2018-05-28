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
              <li>1.15 Summary</li>
            </ul>
          </li>
          <li>
            2. Data modeling
            <ul style={{ listStyleType: 'none' }}>
              <li>2.1 Schema, types and resolvers</li>
              <li>2.2 Schemas</li>
              <li>2.3 Type definitions</li>
              <li>2.4 Resolvers</li>
              <li>2.5 Summary</li>
            </ul>
          </li>
          <li>
            3. GraphQL APIs
            <ul style={{ listStyleType: 'none' }}>
              <li>3.1 Database</li>
              <li>3.2 Business logic</li>
              <li>3.3 Testing</li>
              <li>3.4 File organization</li>
              <li>3.5 Summary</li>
            </ul>
          </li>
          <li>
            4. GraphQL clients
            <ul style={{ listStyleType: 'none' }}>
              <li>4.1 Simple GraphQL client</li>
              <li>4.2 Apollo Client</li>
              <li>4.3 React Apollo</li>
              <li>4.4 Summary</li>
            </ul>
          </li>
          <li>
            5. Subscriptions
            <ul style={{ listStyleType: 'none' }}>
              <li>5.1 Server side subscriptions</li>
              <li>5.2 PubSub</li>
              <li>5.3 Implementing server side Subscriptions</li>
              <li>5.4 Client side subscriptions</li>
              <li>5.5 Apollo boost migration</li>
              <li>5.6 Implementing client side subscriptions</li>
              <li>5.7 Summary</li>
            </ul>
          </li>
          <li>
            6. Testing
            <ul style={{ listStyleType: 'none' }}>
              <li>6.1 API testing approaches</li>
              <li>6.2 GraphQL layer</li>
              <li>6.3 HTTP layer</li>
              <li>6.4 Subscription endpoints</li>
              <li>6.5 Apollo GraphQL clients</li>
              <li>6.6 Summary</li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}
