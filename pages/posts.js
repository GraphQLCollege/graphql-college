import React from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

import Book from "../components/book.svg";

import { prettyDate } from "../utils/time";

const StyledBook = styled.div`
  justify-self: center;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;

  @media (min-width: 600px) {
    justify-self: flex-end;
    padding-right: 0;
    align-items: flex-end;
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column-reverse;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

class Index extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <Wrapper>
        <ul style={{ paddingLeft: 0, paddingRight: 50, marginTop: 0 }}>
          {posts.map(post => (
            <li
              key={post.title}
              style={{ listStyle: "none", marginBottom: 75 }}
            >
              <h3
                style={{
                  fontSize: "1.4rem",
                  marginBottom: 0,
                  marginTop: 0,
                  fontWeight: 400
                }}
              >
                <Link href={post.filename}>
                  <a>{post.title}</a>
                </Link>
              </h3>
              <small>{prettyDate(post.meta.date)}</small>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
        <StyledBook>
          <Link href="/fullstack-graphql">
            <Book style={{ cursor: "pointer" }} width={200} />
          </Link>
          <p style={{ width: 200 }}>
            Learn to build fullstack GraphQL apps with this hands-on book
          </p>
        </StyledBook>
      </Wrapper>
    );
  }
}

Index.getInitialProps = async context => {
  if (context.asPath === "/posts") {
    return { posts: [] };
  }
  const posts = context.query.posts.map(post => {
    const { meta } = require(`../posts/${post.filename}.mdx`);
    return { ...post, meta };
  });
  posts.sort((a, b) => {
    return new Date(a.meta.date) < new Date(b.meta.date);
  });
  return { posts };
};

export default Index;
