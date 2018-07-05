const express = require("express");
const { parse } = require("url");
const fs = require("fs");
const next = require("next");

const { getPostsInfo } = require("./utils/posts");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const posts = getPostsInfo();

app.prepare().then(() => {
  const server = express();

  posts.forEach(({ filename }) => {
    server.get("/" + filename, (req, res) => {
      app.render(req, res, "/post", {
        post: posts.find(({ filename }) => {
          return `/${filename}` === req.url;
        })
      });
    });
  });

  server.get("/", (req, res) => {
    app.render(req, res, "/posts", {
      posts
    });
  });

  server.get("*", handle);

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
