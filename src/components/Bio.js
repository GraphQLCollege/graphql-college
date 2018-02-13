import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
          alignItems: 'flex-end',
        }}
      >
        <img
          src={profilePic}
          alt={`Julian Mayorga`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ marginBottom: 0 }}>
          Written by{' '}
          <a
            href="https://twitter.com/juli_mayorga"
            style={{ boxShadow: 'none' }}
          >
            Julian
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
