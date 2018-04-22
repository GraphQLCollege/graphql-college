import React from 'react'
import Link from 'gatsby-link'
import HamburgerMenu from 'react-hamburger-menu'

import ChapterList from './ChapterList'

import './TableOfContents.css'

export default class TableOfContents extends React.Component {
  state = { isOpen: false }
  render() {
    return (
      <div className="table-of-contents">
        <HamburgerMenu
          isOpen={this.state.isOpen}
          menuClicked={() =>
            this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
          }
          width={30}
          height={30}
          strokeWidth={1}
          rotate={0}
          color="rgb(225, 0, 152)"
          borderRadius={0}
          animationDuration={0.5}
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
