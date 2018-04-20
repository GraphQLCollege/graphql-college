import React from 'react'
import Link from 'gatsby-link'

import TextIcon from './TextIcon'
import ChapterList from './ChapterList'

import './TableOfContents.css'

export default class TableOfContents extends React.Component {
  state = { isOpen: false }
  render() {
    return (
      <div className="table-of-contents">
        <TextIcon
          style={{
            width: 30,
            height: 30,
            cursor: 'pointer',
          }}
          onClick={() => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))}
        />
        <ChapterList
          style={{
            width: this.state.isOpen ? '100vw' : 0,
            padding: this.state.isOpen ? 30 : 0,
          }}
          chapterList={this.props.chapterList}
        />
      </div>
    )
  }
}
