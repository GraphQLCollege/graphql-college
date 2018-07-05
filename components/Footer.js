import React from "react";
import Link from "next/link";
import styled from "styled-components";

import GithubLogo from "./github-logo.svg";

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: solid 1px #e535ab;
  padding-top: 50px;
  padding-bottom: 50px;
  max-width: 800px;
  margin: 0 auto;
  padding-left: 0;
  padding-right: 0;
`;

const Footer = () => (
  <Section>
    <div>
      <Link href="/">
        <a style={{ color: "#333" }}>Home</a>
      </Link>
    </div>
    <div>
      <a
        href="https://github.com/GraphQLCollege/graphql-college"
        target="_blank"
        style={{ textDecoration: "none", boxShadow: "none" }}
      >
        <GithubLogo style={{ color: "#333" }} width={25} height={25} />
      </a>
    </div>
  </Section>
);

export default Footer;
