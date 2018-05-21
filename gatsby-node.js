const path = require('path')
const _ = require('lodash')
const remark = require('remark')
const frontmatter = require('remark-frontmatter')
const yaml = require('js-yaml')
const remarkHtml = require('remark-html')
const gatsbyRemarkPrismjs = require('gatsby-remark-prismjs')
const gatsbyRemarkAutolinkHeaders = require('gatsby-remark-autolink-headers')
const { createFilePath } = require('gatsby-source-filesystem')

async function createBlogPostPages(graphql, createPage) {
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const markdown = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (markdown.errors) {
    console.error(markdown.errors)
    throw new Error(markdown.errors)
  }

  // Create blog posts pages.
  const posts = markdown.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? false : posts[index + 1].node
    const next = index === 0 ? false : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  try {
    await createBlogPostPages(graphql, createPage)
  } catch (error) {
    console.error(error)
  }
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.modifyWebpackConfig = ({ config, stage }, pluginOptions) => {
  // Remove svg from url-loader config
  config.loader('url-loader', {
    test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: `static/[name].[hash:8].[ext]`,
    },
  })

  // Graphiql fix https://github.com/graphql/graphiql/issues/617#issuecomment-344104641
  config.loader('ignore-loader', {
    test: /\.flow$/,
    loader: 'ignore-loader',
  })

  config.loader('svg-react-loader', {
    test: /\.svg$/,
    loader: 'svg-react-loader',
  })

  return config
}
