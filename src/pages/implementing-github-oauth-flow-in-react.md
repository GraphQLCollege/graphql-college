---
title: Implementing Github OAuth flow in React
date: 2018-03-16
---

![Example Github OAuth flow](/github-oauth.gif)

In this article you will learn how to implement Github's OAuth authentication in client side apps. First you will learn about how Github's OAuth process works, and then you will implement it in a React application by building it from scratch.

Github is one of the first large companies to offer a public GraphQL API. The main benefit of this switch is scalability.

> It seemed like our responses simultaneously sent too much data and didn’t include data that consumers needed.

You can read more about it in [their announcement](https://githubengineering.com/the-github-graphql-api/) from 2016.

In order to interact with their API, you need to authenticate your users with their Github account through a mecanism called OAuth.

Because of [security-related limitations](http://blog.vjeux.com/2012/javascript/github-oauth-login-browser-side.html), Github's Oauth flow for client side apps is not straightforward. You will learn how to communicate between your app and an open source service called [Gatekeeper](https://github.com/prose/gatekeeper) that simplifies Github's OAuth process.

## Github's OAuth flow

The whole process can be summarized in three steps:

1.  Redirect users to `http://github.com/login/oauth/authorize?client_id=...redirect_uri=http://example.com/oauth_redirect` in order to request GitHub access

![Step one](/github-auth-step-1.png)

2.  If the user accepts, Github redirects back to your app with a code parameter (`http://example.com/oauth_redirect?code=...`)

![Step two](/github-auth-step-2.png)

3.  Exchange code for an access token by making a `POST` request to `POST https://github.com/login/oauth/access_token?client_id=...&redirect_uri=http://www.example.com/oauth_redirect&client_secret=...&code=...`

![Step three](/github-auth-step-3.png)

Unfortunately you cannot make this request from a browser because that would require you to store your client secret in your public client side app. Keeping a secret in a public place is a huge no, so you need a server for this step.

Github will send you a token in the `HTTP` response body. You can send this token to Github's API to make requests on behalf of this user.

![Step four](/github-auth-step-4.png)

## Example

We will understand how this process works by implementing it in a React application.

### React setup

Create an app with `create-react-app`. Go to the new directory. Finally start the development server to see it in action.

```
cd gitstar
```

```
create-react-app gitstar
```

```
yarn start
```

![Generated react app](/react-app.png)

### Github setup

Create OAuth app in github by following the steps in https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/

![Create OAuth app](/register-oauth-app.png)

You need a server to store your client secret and send it to github. If you already have an API you can do setup a route that exchanges a code for a token. Another options is setting up Gatekeeper. Gatekeeper is an open source service which helps you trade a github code for a token.

We will use Gatekeeper. Deploy it to heroku by following the steps in Gatekeeper's [README](https://github.com/prose/gatekeeper#deploy-on-heroku)

If you deployed it correctly, you can access it by its URL. In this case we registered https://gitstar.herokuapp.com/.

### Step 1: Redirect users to Github

First of all we'll add a simple header with our app name on the left, and a login link on the right. We already created the Header components for you, so you just need to import them using `yarn`.

```
yarn add gitstar-components
```

Modify `App.js` by deleting the generated code that we don't user. Import the components that we'll use though this example and add an `a` tag pointing to `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`. Modify the `render` function so that it looks like the following:

```js
import React, { Component } from 'react'

import {
  STATUS,
  Loading,
  Avatar,
  Logo,
  Logotype,
  Container,
  Header,
} from 'gitstar-components'

const CLIENT_ID = 'cdc18a1912950f105f70'
const REDIRECT_URI = 'http://localhost:3000/'

class App extends Component {
  state = {
    status: STATUS.INITIAL,
    token: null,
  }
  render() {
    return (
      <Container>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
            <Logotype />
          </div>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          >
            Login
          </a>
        </Header>
      </Container>
    )
  }
}

export default App
```

### Step 2: Receive token from Github

After your users authorize your app, Github will send them back to the callback URI that you defined in their developer settings. We told Github to redirect users to our root endpoint. We can grab the code they sent in `<App />`'s `componentDidMount`.

```js
class App extends Component {
  state = {
    /* ... */
  }
  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1]
    console.log(code)
  }
  render() {
    /* ... */
  }
}
```

### Step 3: Exchange code with access token

Use `fetch` to exchange the code for a token through our Gatekeeper URL, in this case https://gitstar.herokuapp.com/. From now on you can use this token to make requests on behalf of your authenticated user.

```js
class App extends Component {
  state = {
    /* ... */
  }
  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1]
    if (code) {
      this.setState({ status: STATUS.LOADING })
      fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING,
          })
        })
    }
  }
  render() {
    /* ... */
  }
}
```

Finally, add a couple of elements to identify the different states of the app. This is what the final `App.js` looks like:

```js
import React, { Component } from "react";

import {
  STATUS,
  Loading,
  Avatar,
  Logo,
  Logotype,
  Container,
  Header
} from "gitstar-components";

const CLIENT_ID = "cdc18a1912950f105f70";
const REDIRECT_URI = "http://localhost:3000/";

class App extends Component {
  state = {
    status: STATUS.INITIAL,
    token: null
  };
  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.setState({ status: STATUS.LOADING });
      fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING
          });
        });
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Logo />
            <Logotype />
          </div>
          <Avatar
            style={{
              transform: `scale(${
                this.state.status === STATUS.AUTHENTICATED ? "1" : "0"
              })`
            }}
          />
          <a
            style={{
              display: this.state.status === STATUS.INITIAL ? "inline" : "none"
            }}
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          >
            Login
          </a>
        </Header>
        <Loading
          status={this.state.status}
          callback={() => {
            if (this.props.status !== STATUS.AUTHENTICATED) {
              this.setState({
                status: STATUS.AUTHENTICATED
              });
            }
          }}
        />
      </Container>
    );
  }
}

export default App;
```

These elements exist merely to improve the app's UX. The purpose of these components is to let you know when the app is waiting for github's request, and finally tell you that you are authenticated.

If you'd like to see how I made the imported components, take a look at the final source code in [github](https://github.com/GraphQLCollege/gitstar/tree/5b33dd588f60b077f0f58a9a038d854d8115adfb).

Here is a live codesandbox with the final result:

<iframe src="https://codesandbox.io/embed/nrv6k9zqxp?module=%2Fsrc%2FApp.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Summary

You learned how Gihub's OAuth flow works. You also applied that knowledge by creating a simple React app with Github authentication.

Now that your users can login with Github, you can start making requests to [Github's GraphQL API](https://developer.github.com/v4/) on their behalf.
