const callsites = require('callsites');
const { dirname, resolve } = require('path');

module.exports = ({ name, opts } = {}) => {
  const engine = require(name);
  const engineInstance = engine(opts);
  let render;

  if (name === 'beard') {
    render = engineInstance.render.bind(engineInstance);
  }

  return {
    instance: engineInstance,
    render: (template, data) => {
      const from = callsites()[2].getFileName();
      const fromDir = dirname(from);
      const path = resolve(fromDir, template.replace(/^~/, '.'));
      return render(path, data);
    }
  }
}
