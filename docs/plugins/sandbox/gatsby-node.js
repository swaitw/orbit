const path = require("path");
const { unlinkSync } = require("fs");
const LoadablePlugin = require("@loadable/webpack-plugin");

const { getScope, omitTypes } = require("./helpers");
const { statsFile } = require("./consts");

exports.onCreateNode = async ({ node, actions, loadNodeContent }) => {
  if (node.sourceInstanceName === "examples" && node.internal.type === "File") {
    const { createNodeField } = actions;
    const { relativeDirectory, name } = node;

    await loadNodeContent(node);

    const value = relativeDirectory.split("/").slice(-1).concat(name.toLowerCase()).join("-");

    const { content } = node.internal;

    const example = content.match(/(?<=example:)([\s\S]*)(?=,+[\W]+info)/gim);

    const scope = getScope(content);

    createNodeField({
      node,
      name: "scope",
      value: scope,
    });

    createNodeField({
      node,
      name: "example",
      value: example ? omitTypes(example[0]) : "",
    });

    createNodeField({
      node,
      name: "example_id",
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allFile(filter: { absolutePath: { regex: "/__examples__/" } }) {
        nodes {
          id
          relativePath
          fields {
            example_id
            example
            scope {
              name
              path
              default
            }
          }
        }
      }
    }
  `);

  result.data.allFile.nodes.forEach(({ id, fields }) => {
    createPage({
      path: `examples/${fields.example_id}`.toLowerCase(),
      component: path.resolve(path.resolve(__dirname, "../../src/templates/Example/index.tsx")),
      context: {
        fields,
        id,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-javascript") {
    actions.setWebpackConfig({
      plugins: [new LoadablePlugin()],
    });
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: "@loadable/babel-plugin" });
};

exports.onPostBuild = () => {
  unlinkSync(statsFile);
};
