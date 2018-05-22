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
        <ol>
          <li>
            Introduction
            <ul>
              <li>Why GraphQL?</li>
              <li>What is GraphQL?</li>
              <li>How to use GraphQL?</li>
              <li>Sample application</li>
              <li>Development environment</li>
            </ul>
          </li>
          <li>
            Reading and writing data
            <ul>
              <li>Query</li>
              <li>Fields</li>
              <li>Multiple fields</li>
              <li>Operation name</li>
              <li>Arguments</li>
              <li>Aliases</li>
              <li>Fragments</li>
              <li>Variables</li>
              <li>Directives</li>
              <li>Default variables</li>
              <li>Mutations</li>
              <li>Inline fragments</li>
              <li>Meta fields</li>
            </ul>
          </li>
          <li>Data modeling</li>
          <li>
            Building GraphQL APIs
            <ul>
              <li>Database</li>
              <li>Business logic</li>
              <li>Testing</li>
              <li>Subscriptions</li>
            </ul>
          </li>
          <li>
            Building GraphQL clients
            <ul>
              <li>React Apollo</li>
              <li>Subscriptions</li>
              <li>Testing</li>
            </ul>
          </li>
        </ol>
      </div>
    )
  }
}
