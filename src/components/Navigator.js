import React from 'react'
import Link from 'gatsby-link'

import Triangle from './Triangle'

const Navigator = ({ previous, next }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}
  >
    {previous ? (
      <Link
        style={{ boxShadow: 'none', marginRight: 20 }}
        to={`/fullstack-graphql/${previous}`}
      >
        <Triangle style={{ width: 30 }} direction="left" />
      </Link>
    ) : null}
    {next ? (
      <Link
        style={{ boxShadow: 'none', marginLeft: 20 }}
        to={`/fullstack-graphql/${next}`}
      >
        <Triangle style={{ width: 30 }} direction="right" />
      </Link>
    ) : null}
  </div>
)

export default Navigator
