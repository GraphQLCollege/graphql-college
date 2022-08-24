import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Book from "./book.svg";
import Button from "../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 426px) {
    display: grid;
    grid-template-areas: book form;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: 1fr 1fr;
  }
`;

class BookBanner extends React.Component {
  render() {
    return (
      <Wrapper>
        <a href="/fullstack-graphql">
          <Book
            style={{
              alignSelf: "center",
              justifySelf: "center",
              maxHeight: 300,
            }}
          />
        </a>
        <div
          style={{
            width: "80%",
            alignSelf: "center",
            justifySelf: "center",
            height: "auto",
          }}
        >
          <a
            href="/fullstack-graphql"
            style={{
              boxShadow: "none",
              textDecoration: "underline",
              color: "#e535ab",
            }}
          >
            <h3
              style={{
                marginBottom: "1.75rem",
                color: "inherit",
                fontFamily: "'Rubik',sans-serif",
                fontWeight: 400,
                textRendering: "optimizeLegibility",
                fontSize: "1.4427rem",
                lineHeight: 1.1,
                marginTop: 0,
              }}
            >
              Fullstack GraphQL Book
            </h3>
          </a>
          <div
            style={{
              display: "grid",
              gridGap: "0.875rem",
            }}
          >
            <div>
              Learn fullstack GraphQL development by building an app from
              scratch
            </div>
            <a
              href="/fullstack-graphql"
              style={{
                display: "inline-block",
                width: "100%",
                boxShadow: "none",
              }}
            >
              <Button
                style={{ width: "100%" }}
                value="Read"
                name="read"
                type="submit"
              >
                Read
              </Button>
            </a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default BookBanner;
