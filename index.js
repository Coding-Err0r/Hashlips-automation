const basePath = process.cwd();
const { readLayers, sleep } = require(`${basePath}/layers.js`);
const {
  startCreating,
  buildSetup,
} = require(`${basePath}/src/main.js`);

(async () => {
  buildSetup();
  startCreating();
})();
