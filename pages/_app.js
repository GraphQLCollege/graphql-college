import React from "react";
import App, { Container } from "next/app";

import Layout from "../components/Layout";

import "../utils/index.css";
import "../components/SubscribeForm.css";
import "../utils/fullstack-graphql.css";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../utils/post";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MDXProvider components={components}>
        <Container>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Container>
      </MDXProvider>
    );
  }
}
