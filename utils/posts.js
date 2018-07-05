const path = require("path");
const fs = require("fs");
const find = require("unist-util-find");
const unified = require("unified");
const remark = require("remark-parse");
const inspect = require("unist-util-inspect");
const toMDXAST = require("@mdx-js/mdxast");
const prune = require("underscore.string/prune");

function getPostInfo(post) {
  const file = fs.readFileSync(path.join(__dirname, `../posts/${post}`), {
    encoding: "utf-8"
  });
  const tree = unified()
    .use(remark)
    .parse(file);

  const mdxast = toMDXAST({})(tree);

  return {
    filename: post.split(".")[0],
    title: find(mdxast, function(node) {
      return node.type === "heading";
    }).children[0].value,
    excerpt: prune(
      find(mdxast, function(node) {
        return node.type === "paragraph" && node.children[0].type === "text";
      }).children[0].value,
      140,
      "..."
    )
  };
}

function getPostsInfo() {
  const postsPath = path.join(__dirname, "../posts");
  return fs.readdirSync(postsPath).map(getPostInfo);
}

const withPosts = config => {
  return {
    ...config,
    exportPathMap: async defaultPathMap => {
      const posts = getPostsInfo();
      const postsPathMap = posts.reduce((postsMap, post, index) => {
        return {
          ...postsMap,
          [`/${post.filename}`]: {
            page: "/post",
            query: {
              post: posts.find(({ filename }) => filename === post.filename)
            }
          }
        };
      }, {});
      return {
        ...defaultPathMap,
        ...postsPathMap,
        "/": {
          page: "/posts",
          query: {
            posts
          }
        }
      };
    }
  };
};

module.exports = { getPostsInfo, withPosts };
