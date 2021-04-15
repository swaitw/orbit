const { loadableReady } = require("@loadable/component");
const ReactDOM = require("react-dom");

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      ReactDOM.render(element, container, callback);
    });
  };
};
