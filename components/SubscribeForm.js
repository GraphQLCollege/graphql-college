import React from "react";

const SubscribeForm = ({ text = "Subscribe to newsletter", center }) => (
  <div id="mc_embed_signup">
    <form
      action="https://app.us14.list-manage.com/subscribe/post?u=fb32ddee18e334ce8490db51a&amp;id=9f53f632ff&amp;f_id=004693e0f0"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_blank"
      noValidate
      style={{ textAlign: center ? "center" : "start" }}
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
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_fb32ddee18e334ce8490db51a_9f53f632ff"
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
);

export default SubscribeForm;
