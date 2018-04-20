const path = require('path')
const _ = require('lodash')
const remark = require('remark')
const frontmatter = require('remark-frontmatter')
const yaml = require('js-yaml')
const remarkHtml = require('remark-html')
const visit = require('unist-util-visit')
const select = require('unist-util-select')
const gatsbyRemarkPrismjs = require('gatsby-remark-prismjs')
const gatsbyRemarkAutolinkHeaders = require('gatsby-remark-autolink-headers')
const { createFilePath } = require('gatsby-source-filesystem')
const crypto = require('crypto')

/*
  Transforms book's markdown files into the following data structure
  [
    {
      title: "Web development workflow",
      slug: "web-development-workflow",
      text: "## Web development workflow",
      next: null,
      previous: null
    }
  ]
*/
function processChapterFiles(chapterFiles) {
  return _.flow([
    // Extract file name and text
    items =>
      items.map(({ name, object: { text } }) => {
        return {
          name,
          text,
        }
      }),
    // Sort by chapter number
    items =>
      _.sortBy(items, item => {
        const chapterNumber = parseInt(
          item.name.split('-')[1].split('.')[0],
          10
        )
        return chapterNumber
      }),
    // Parse title and yaml metadata from markdown text
    items => {
      return items.map(({ text }, index) => {
        const parsedMarkdown = remark()
          .use(frontmatter)
          .parse(text).children
        const title = parsedMarkdown.find(({ type }) => type === 'heading')
          .children[0].value
        const markdownConfig = parsedMarkdown.find(
          ({ type }) => type === 'yaml'
        )
        const metadata = markdownConfig
          ? yaml.safeLoad(markdownConfig.value)
          : {}
        const slug = _.kebabCase(title)
        return {
          title,
          slug,
          text,
          metadata,
        }
      })
    },
    // Associate slugs of next and previous chapters
    items =>
      items.map((item, index, array) => {
        const previous =
          index === 0 ||
          (array[index - 1].metadata && !array[index - 1].metadata.online)
            ? ""
            : array[index - 1].slug
        const next =
          index === array.length - 1 ||
          (array[index + 1].metadata && !array[index + 1].metadata.online)
            ? ""
            : array[index + 1].slug
        return {
          ...item,
          next,
          previous,
        }
      }),
  ])(chapterFiles)
}

/**
 * Remark plugin that removes {filename} from markdown code blocks
 * E.g. "```js {src/App.js}\nconsole.log(1);\n```" -> "```js\nconsole.log(1);\n```"
 */
function stripLanguageData() {
  return tree => {
    visit(tree, 'code', node => {
      if (node.lang) {
        node.lang = node.lang.split(' ')[0]
      }
    })
  }
}

function addChapterNumbersToHeaders(chapterNumber) {
  return () => tree => {
    const h2 = select.one(tree, 'heading[depth=2]')
    h2.children.splice(0, 0, {
      type: 'html',
      value: `<span class="chapter-number">Chapter ${chapterNumber}</span>`,
    })
  }
}

function markdownToHtml(chapter, index) {
  return new Promise((resolve, reject) => {
    remark()
      .use(frontmatter)
      .use(remarkHtml)
      .use(stripLanguageData)
      .use(() => {
        return tree => {
          return gatsbyRemarkPrismjs({ markdownAST: tree })
        }
      })
      .use(() => {
        return tree => {
          return gatsbyRemarkAutolinkHeaders({ markdownAST: tree })
        }
      })
      .use(addChapterNumbersToHeaders(index + 1))
      .process(chapter.text, (err, file) => {
        if (err) {
          return reject(err)
        }
        resolve({ ...chapter, html: file.contents })
      })
  })
}

exports.onCreateNode = async ({ node, boundActionCreators, getNode }) => {
  if (node.internal.type === 'GithubRepository') {
    const { createNode } = boundActionCreators
    let chapters = processChapterFiles(node.object.entries)
    chapters = await Promise.all(chapters.map(markdownToHtml))
    chapters.forEach(chapter => {
      createNode({
        id: `${chapter.slug} >> GraphQlWebappsChapters`,
        parent: null,
        children: [],
        chapter,
        internal: {
          type: `GraphQlWebappsChapters`,
          content: JSON.stringify(chapter),
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(chapter))
            .digest(`hex`),
        },
      })
    })
  }
}
