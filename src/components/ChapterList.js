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
        <ol>{chapterList.map(title => <li key={title}>{title}</li>)}</ol>
      </div>
    )
  }
}
