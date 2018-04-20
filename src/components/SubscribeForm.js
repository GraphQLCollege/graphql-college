import React from 'react'

import { rhythm } from '../utils/typography'
import Button from '../components/Button'

const SubscribeForm = () => (
  <form
    action="https://wizardry.us17.list-manage.com/subscribe/post?u=cfb63d53c2a9fedaa08d89e24&amp;id=ded508fb58"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    target="_blank"
    noValidate
    css={[
      {
        display: 'grid',
        gridGap: rhythm(0.5),
        border: 'solid 1px lightslategray',
        padding: rhythm(1),
        maxWidth: 400,
        marginTop: rhythm(2),
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    ]}
  >
    <div>As you may have noticed, this book is a work in progress.</div>
    <div>Subscribe to get notified when we release new content.</div>
    <div>No ads. No external links. Just fresh chapters or posts.</div>
    <div style={{ position: 'absolute', left: -5000 }}>
      <input
        type="text"
        name="b_cfb63d53c2a9fedaa08d89e24_ded508fb58"
        tabIndex="-1"
        value=""
      />
    </div>
    <Button
      style={{ backgroundColor: 'lightslategray' }}
      value="Subscribe"
      name="subscribe"
      type="submit"
    >
      Subscribe
    </Button>
  </form>
)

export default SubscribeForm
