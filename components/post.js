import React from "react";
import styled from "styled-components";
import Error from "next/error";

import { prettyDate } from "../utils/time";

export const Post = styled.div.attrs({
  className: "post"
})`
  max-width: 800px;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;

  @media (min-width: 600px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  :not(pre) > code[class*="language-"] {
    background-color: white;
    color: #e535ab;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 2.5rem;
    margin-top: 3.5rem;
    font-weight: 400;
  }

  .codesandbox {
    display: block;
    width: 100%;
    height: 500px;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
  }
`;

export const Pre = styled.pre`
  padding: 7px 14px;
  overflow: auto;
  position: relative;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.08),
    inset 0 -1px 0 rgba(0, 0, 0, 0.08), inset -1px 0 0 rgba(0, 0, 0, 0.08),
    inset 4px 0 0 rgba(0, 0, 0, 0.08);
  border-radius: 3px;
`;

const StyledDate = styled.p`
  font-size: 0.83255rem;
  line-height: 1.75rem;
  display: block;
  margin-bottom: 1.75rem;
  margin-top: -1.75rem;
`;

const StyledH1 = styled.h1`
  margin-bottom: 1.75rem;
  font-size: 2.5rem;
  line-height: 1.1;
`;

export const H1 = ({ children, date }) => (
  <React.Fragment>
    <StyledH1>{children}</StyledH1>
    <StyledDate>{prettyDate(date)}</StyledDate>
  </React.Fragment>
);

export const Img = styled.img`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  display: block;
  max-width: 100%;
  max-height: 500px;
  -o-object-fit: contain;
  object-fit: contain;
`;

export const Blockquote = styled.blockquote`
  margin-right: 1.75rem;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 1.42188rem;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.75rem;
  font-size: 1.20112rem;
  line-height: 1.75rem;
  color: hsla(0, 0%, 0%, 0.59);
  font-style: italic;
  border-left: 0.32813rem solid #e535ab;
`;

export const A = styled.a.attrs({ target: "_blank" })`
  > code[class*="language-"] {
    color: #007acc;
  }
`;

/* Color scheme based on graphql.org css */
export const Code = styled.code`
  font-family: "Roboto Mono", Menlo, Monaco, monospace;
  font-weight: 400;
  color: #202020;
  font-size: 13px;
  line-height: 17px;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  position: relative;
  margin-bottom: 1.75rem;

  /* Comment */
  .hljs-comment,
  .cm-comment {
    color: #999;
  }
  /* Punctuation */
  .hljs-punctuation,
  .cm-punctuation {
    color: #555;
  }
  /* Keyword */
  .hljs-keyword,
  .cm-keyword {
    color: #b11a04;
  }
  /* OperationName, FragmentName */
  .hljs-constant,
  .cm-def {
    color: #d2054e;
  }
  /* FieldName */
  .hljs-attr-name,
  .cm-property {
    color: #1f61a0;
  }
  /* FieldAlias */
  .cm-qualifier {
    color: #1c92a9;
  }
  /* ArgumentName and ObjectFieldName */
  .cm-attribute {
    color: #8b2bb9;
  }
  /* Number */
  .hljs-number,
  .cm-number {
    color: #2882f9;
  }
  /* String */
  .hljs-string,
  .cm-string {
    color: #d64292;
  }
  /* Boolean */
  .hljs-boolean,
  .cm-builtin {
    color: #d47509;
  }
  /* EnumValue */
  .hljs-enum,
  .cm-string-2 {
    color: #0b7fc7;
  }
  /* Variable */
  .hljs-variable,
  .cm-variable {
    color: #397d13;
  }
  /* Directive */
  .hljs-function,
  .cm-meta {
    color: #b33086;
  }
  /* Type */
  .hljs-type-name,
  .cm-atom {
    color: #ca9800;
  }
`;
