import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'

import { rhythm, scale } from '../utils/typography'
import { pagePadding } from '../utils/layout'
import Logo from '../components/Logo'
import Button from '../components/Button'
import LogoHorizontal from '../components/LogoHorizontal'

import './index.css'

const Header = ({ location: { pathname } }) => (
  <Media query={'(min-width: 426px)'}>
    {matches => (
      <header
        style={{
          display: 'flex',
          justifyContent: matches ? 'space-between' : 'center',
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: rhythm(2),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {matches ? <LogoHorizontal height={50} /> : <Logo height={100} />}
          </Link>
        </h3>
      </header>
    )}
  </Media>
)

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }
    return (
      <div css={pagePadding}>
        {<Header location={location} />}
        {children()}
      </div>
    )
  }
}

export default Template
