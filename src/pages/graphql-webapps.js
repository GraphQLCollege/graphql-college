import React from 'react'
import { media } from 'glamor'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'
import Book from '../components/GraphQLWebappsPerspective'
import Button from '../components/Button'

class GraphQLWebapps extends React.Component {
  constructor() {
    super()
    this.state = { email: '' }
  }
  render() {
    return (
      <div
        css={[
          media('(min-width: 426px)', {
            display: 'grid',
            gridTemplateAreas: "'headline book' 'content content'",
            gridTemplateColumns: '1fr 1fr',
          }),
        ]}
      >
        <Helmet title="GraphQL Webapps Book" />
        <Book
          style={{ justifySelf: 'center', gridArea: 'book' }}
          height="75vh"
        />
        <div style={{ padding: rhythm(), gridArea: 'headline' }}>
          <h1 style={{ textTransform: 'uppercase', fontWeight: 400 }}>
            Want to build web applications with GraphQL?
          </h1>
          <p>
            Go from zero to a production grade GraphQL client and server. We
            will show you how all parts of the stack fit together by building an
            app from requirements to deployment, from server to client.
          </p>
          <form
            css={[
              {
                display: 'grid',
                gridGap: rhythm(),
              },
              media('(min-width: 426px)', { padding: rhythm() }),
            ]}
            onSubmit={ev => {
              ev.preventDefault()
              alert(this.state.email)
              this.setState({ email: '' })
            }}
          >
            <input
              onChange={event => this.setState({ email: event.target.value })}
              value={this.state.email}
              placeholder="Email"
              style={{
                border: 'solid black 1px',
                padding: rhythm(0.5),
              }}
              type="email"
            />
            <Button>Let me know when it's ready</Button>
          </form>
        </div>
        <p
          style={{ gridArea: 'content', justifySelf: 'center', maxWidth: 700 }}
        >
          <ul>
            <li>Learn how to specify you app's requirements</li>
            <li>Design the UI using React</li>
            <li>Create a GraphQL server using NodeJS and Apollo</li>
            <li>Connect client and server with Apollo Client</li>
            <li>
              Write integration tests to make sure all the moving pieces fit
              nicely together
            </li>
            <li>Continuously deploy your app.</li>
          </ul>
        </p>
      </div>
    )
  }
}

export default GraphQLWebapps
