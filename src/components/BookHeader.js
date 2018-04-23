import React from 'react'
import Link from 'gatsby-link'

import TableOfContents from '../components/TableOfContents'
import Button from '../components/Button'
import { headerMargin } from '../utils/layout'

import './BookHeader.css'

const BookHeader = ({ chapter, chapterList, ...props }) => (
  <nav className="book-header" css={headerMargin} {...props}>
    <TableOfContents chapterList={chapterList} />
    <Link to="/graphql-webapps" className="book-title">
      GraphQL Webapps
    </Link>
    <div className="buy-button-placeholder" />
    {/* <Button
      style={{
        borderRadius: '10px',
        padding: '10px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        border: 'none',
        fontSize: '.75rem',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      Buy Ebook
    </Button> */}
  </nav>
)

export default BookHeader
