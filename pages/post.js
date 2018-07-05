import React from "react";
import styled from "styled-components";
import Error from "next/error";
import Helmet from "react-helmet";

import {
  Post as StyledPost,
  H1,
  Pre,
  Img,
  Blockquote,
  A,
  Code
} from "../components/post";
import Bio from "../components/Bio";
import BookBanner from "../components/BookBanner";
import SubscribeForm from "../components/SubscribeForm";

class Post extends React.Component {
  render() {
    const { path, post } = this.props;
    if (path === "/post") {
      return <Error statusCode={404} />;
    }
    const Mdx = require(`../posts${path}.mdx`);
    const { date } = Mdx.meta;

    return (
      <StyledPost>
        <Helmet title={post.title} />
        <Mdx.default
          components={{
            h1: ({ children }) => <H1 date={date}>{children}</H1>,
            pre: Pre,
            img: Img,
            blockquote: Blockquote,
            a: A,
            code: Code
          }}
        />
        <hr
          style={{
            backgroundColor: "#e535ab",
            marginBottom: "1.4rem"
          }}
        />
        <Bio />
        <SubscribeForm
          center
          text="Liked this article? Subscribe to receive more in your inbox"
        />
        <BookBanner />
      </StyledPost>
    );
  }
}

Post.getInitialProps = async context => {
  return { path: context.asPath, post: context.query.post };
};

export default Post;
