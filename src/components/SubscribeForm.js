import React from 'react'

import './SubscribeForm.css'

const SubscribeForm = ({ text = 'Subscribe to newsletter' }) => (
  <div id="mc_embed_signup">
    <form
      action="https://college.us17.list-manage.com/subscribe/post?u=cfb63d53c2a9fedaa08d89e24&amp;id=ded508fb58"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_blank"
      noValidate
    >
      <div id="mc_embed_signup_scroll">
        <label htmlFor="mce-EMAIL">{text}</label>
        <input
          type="email"
          name="EMAIL"
          className="email"
          id="mce-EMAIL"
          placeholder="email address"
          required
        />
        <div
          style={{ position: 'absolute', left: '-5000px' }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_cfb63d53c2a9fedaa08d89e24_ded508fb58"
            tabIndex="-1"
            value=""
          />
        </div>
        <div className="clear">
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="button"
          />
        </div>
      </div>
    </form>
  </div>
)

export default SubscribeForm
