const callsites = require('callsites');
const { dirname, resolve } = require('path');

module.exports = ({ name, opts } = {}) => {
  const package = require(name);
  const engine = name === '@dylan/balm' ? package.balm(opts) : package(opts);
  const render = engine.render.bind(engine);

  return {
    instance: engine,
    render: (template, data) => {
      const from = callsites()[2].getFileName();
      const fromDir = dirname(from);
      const path = resolve(fromDir, template.replace(/^~/, '.'));
      return render(path, data);
    }
  }
}
