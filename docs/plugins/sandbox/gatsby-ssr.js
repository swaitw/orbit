const { readFileSync, existsSync } = require("fs");
const { ChunkExtractor } = require("@loadable/server");

const { statsFile } = require("./consts");

const extractor = new ChunkExtractor({
  stats: existsSync(statsFile) ? JSON.parse(readFileSync(statsFile, "utf8")) : {},
  entrypoints: [],
});

exports.wrapRootElement = ({ element }) => extractor.collectChunks(element);

exports.onRenderBody = ({ setPostBodyComponents, setHeadComponents }) => {
  setHeadComponents(extractor.getLinkElements());

  setPostBodyComponents([...extractor.getScriptElements(), ...extractor.getStyleElements()]);

  extractor.chunks = [];
};
