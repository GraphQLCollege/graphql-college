import React from "react";
import { initGA, logPageView } from "../utils/analytics";

import Header from "./Header";
import Footer from "./Footer";

export default class Layout extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return (
      <div style={{ marginBottom: 50 }}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}