import React from "react";
import Link from "next/link";
import styled from "styled-components";

import LogoHorizontal from "./LogoHorizontal";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  max-width: 800px;

  @media (min-width: 600px) {
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <a>
        <h3
          style={{
            marginTop: 0,
            marginBottom: 0
          }}
        >
          <LogoHorizontal
            style={{
              height: "40px",
              boxShadow: "none",
              color: "inherit"
            }}
            height="40px"
          />
        </h3>
      </a>
    </Link>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 20,
        paddingRight: 0
      }}
    >
      <Link href="/">
        <a
          style={{
            color: "#333"
          }}
        >
          Posts
        </a>
      </Link>
      <Link href="/fullstack-graphql">
        <a
          style={{
            marginLeft: 30,
            color: "#333"
          }}
        >
          Book
        </a>
      </Link>
      <Link href="/practice-graphql">
        <a
          style={{
            marginLeft: 30,
            color: "#333"
          }}
        >
          Playground
        </a>
      </Link>
    </div>
  </StyledHeader>
);

export default Header;
