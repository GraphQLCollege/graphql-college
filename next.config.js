const remarkHighlight = require("remark-highlight.js");
const slug = require("remark-slug");
const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [remarkHighlight, slug],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  // TODO: Redirect to graphqlapps
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  // async redirects() {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      // use: ["@svgr/webpack"],
      use: ["svg-react-loader"],
    });

    return config;
  },
});
