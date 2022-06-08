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
  <>
    <div
      style={{
        borderBottom: "solid 1px #e535ab",
        display: "flex",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderRadius: 8,
          backgroundColor: "#ff47c5",
          color: "white",
          padding: 8,
          paddingLeft: 12,
          paddingRight: 12,
          marginRight: 8,
        }}
      >
        New!
      </div>
      <div>
        Make GraphQL Apps in minutes with{" "}
        <a href="https://graphqlapps.com">GraphQLApps</a>
      </div>
    </div>
    <StyledHeader>
      <Link href="/">
        <a>
          <h3
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <LogoHorizontal
              style={{
                height: "40px",
                boxShadow: "none",
                color: "inherit",
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
          paddingRight: 0,
        }}
      >
        <Link href="/">
          <a
            style={{
              color: "#333",
            }}
          >
            Posts
          </a>
        </Link>
        <Link href="/fullstack-graphql">
          <a
            style={{
              marginLeft: 30,
              color: "#333",
            }}
          >
            Book
          </a>
        </Link>
      </div>
    </StyledHeader>
  </>
);

export default Header;
