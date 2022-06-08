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
          {posts.map((post) => (
            <li
              key={post.title}
              style={{ listStyle: "none", marginBottom: 75 }}
            >
              <h3
                style={{
                  fontSize: "1.4rem",
                  marginBottom: 0,
                  marginTop: 0,
                  fontWeight: 400,
                }}
              >
                <Link href={post.filename}>
                  <a style={{ color: "#333" }}>{post.title}</a>
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

Index.getInitialProps = async (context) => {
  // if (context.asPath === "/posts") {
  return {
    posts: [
      {
        meta: { date: "2018-03-21" },
        title: "Building a Github Client with React Apollo",
        filename: "building-a-github-client-with-react-apollo",
        excerpt:
          "In this article you will learn how to use React Apollo to interact with Github GraphQL API. We will build a github client step by step.",
      },
      {
        meta: { date: "2018-07-20" },
        title:
          "Building an editable restaurant menu using Next.js, GraphCMS and Heroku",
        filename:
          "building-an-editable-restaurant-menu-using-nextjs-graphcms-and-heroku",
        excerpt:
          "With this tutorial you will learn how to create GraphQL APIs with user generated content using Next.js, GraphCMS and Heroku. This setup provides users a friendly admin interface to create, edit and delete content, while also letting developers build using their preferred tools (in this case server side rendered React and a GraphQL API).",
      },
      {
        meta: { date: "2018-03-12" },
        title: "Gradually migrating a Node and React app from REST to GraphQL",
        filename:
          "gradually-migrating-a-node-and-react-app-from-rest-to-graphql",
        excerpt:
          "Adopting GraphQL and Apollo client brings several benefits. Some of them are: smaller HTTP payloads, less network requests, zero config API documentation and declarative data fetching. Less network usage will benefit your users, and your developers will be more productive with better tooling and clear boundaries between frontend and backend.",
      },
      {
        meta: { date: "2018-04-05" },
        title: "GraphQL Subscriptions with React, Node, Apollo and Postgres",
        filename: "graphql-subscriptions-with-react-node-apollo-and-postgres",
        excerpt:
          "This guide will show you how to create a Pinterest-like example using React, Node, Apollo Client, Apollo Server and Postgres.",
      },
      {
        meta: { date: "2018-03-16" },
        title: "Implementing Github OAuth flow in React",
        filename: "implementing-github-oauth-flow",
        excerpt:
          "In this article you will learn how to implement Github's OAuth authentication in client side apps. First you will learn about how Github's OAuth process works, and then you will implement it in a React application by building it from scratch.",
      },
    ],
  };
  // }
  // const posts = context.query.posts.map(post => {
  //   const { meta } = require(`../posts/${post.filename}.mdx`);
  //   return { ...post, meta };
  // });
  // posts.sort((a, b) => {
  //   return new Date(a.meta.date) < new Date(b.meta.date);
  // });
  // return { posts };
};

export default Index;
