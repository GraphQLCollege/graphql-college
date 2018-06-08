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
import GithubLogo from '../components/github-logo.svg'

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
            marginLeft: 50,
            marginRight: 50,
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
                  margin: 0,
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
              color: 'black',
              boxShadow: 'none',
            }}
            to="/"
          >
            Posts
          </Link>
          <Link
            style={{
              marginLeft: 30,
              color: 'black',
              boxShadow: 'none',
            }}
            to="/fullstack-graphql"
          >
            Book
          </Link>
          <Link
            style={{
              marginLeft: 30,
              color: 'black',
              boxShadow: 'none',
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

const Footer = () => (
  <section className="footer">
    <div>
      <Link
        style={{ color: 'black', textDecoration: 'none', boxShadow: 'none' }}
        to="/"
      >
        Home
      </Link>
    </div>
    <div>
      <a
        href="https://github.com/GraphQLCollege/graphql-college"
        target="_blank"
        style={{ textDecoration: 'none', boxShadow: 'none' }}
      >
        <GithubLogo style={{ color: 'black' }} width={25} height={25} />
      </a>
    </div>
  </section>
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
        {<Footer />}
      </div>
    )
  }
}

export default Template
