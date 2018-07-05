const remarkHighlight = require("remark-highlight.js");
const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [remarkHighlight]
  }
});
const withCSS = require("@zeit/next-css");

const { withPosts } = require("./utils/posts");
const { withoutFlow, withSvgsAsReactComponents } = require("./utils/webpack");

module.exports = withSvgsAsReactComponents(
  withoutFlow(
    withPosts(
      withCSS(
        withMDX({
          pageExtensions: ["js", "jsx", "mdx"]
        })
      )
    )
  )
);
