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
      },
    ]}
  >
    <div>Subscribe to hear when the book launches.</div>
    <div>Thou shall receive no spam.</div>
    <div style={{ position: 'absolute', left: -5000 }}>
      <input
        type="text"
        name="b_cfb63d53c2a9fedaa08d89e24_ded508fb58"
        tabIndex="-1"
        value=""
      />
    </div>
    <Button value="Subscribe" name="subscribe" type="submit">
      Subscribe
    </Button>
  </form>
)

export default SubscribeForm
