import React from "react";
import App, { Container } from "next/app";

import Layout from "../components/Layout";

import "./index.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
