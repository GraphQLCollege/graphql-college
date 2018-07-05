import React from "react";
import App, { Container } from "next/app";

import Layout from "../components/Layout";
import { deleteServiceWorkers } from "../utils/offline";

import "./index.css";

export default class MyApp extends App {
  componentDidMount() {
    deleteServiceWorkers();
  }
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
