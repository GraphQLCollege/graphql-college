import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'
import { media } from 'glamor'

import {
  pagePadding,
  horizontalPadding,
  mobileHorizontalPadding,
} from '../utils/layout'
import Logo from '../components/Logo'
import Button from '../components/Button'
import LogoHorizontal from '../components/LogoHorizontal'

import './index.css'
import './syntax-highlighting-theme.css'

const Header = ({ location: { pathname } }) => (
  <Media query={'(min-width: 700px)'}>
    {matches => (
      <header
        className="page-header"
        css={[
          {
            display: 'flex',
            justifyContent: matches ? 'space-between' : 'space-around',
            minHeight: '10vh',
            alignItems: 'center',
          },
          media('(min-width: 700px)', {
            marginLeft: `-${horizontalPadding}`,
            marginRight: `-${horizontalPadding}`,
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding,
          }),
        ]}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 0,
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
            {matches ? (
              <LogoHorizontal style={{ height: '5vh' }} height="5vh" />
            ) : (
              <h1
                style={{
                  fontSize: '1.5rem',
                  color: '#e535ab',
                  margin: 0
                }}
              >
                GraphQL College
              </h1>
            )}
          </Link>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Link
            style={{
              color: '#e535ab',
              boxShadow: 'none',
              textDecoration: 'underline',
            }}
            to="/fullstack-graphql"
          >
            Book
          </Link>
          <Link
            style={{
              marginLeft: 30,
              color: '#e535ab',
              boxShadow: 'none',
              textDecoration: 'underline',
            }}
            to="/practice-graphql"
          >
            Playground
          </Link>
        </div>
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
      <div className="graphql-college">
        {<Header location={location} />}
        {children()}
      </div>
    )
  }
}

export default Template
