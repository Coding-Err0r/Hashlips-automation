const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'layers');
const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
const readLayers = async () => {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    let arr = [];
    files.forEach(function (file) {
      const fileName = file.split('#');
      arr.push(fileName);
    });
    arr.sort(sortFunction);

    function sortFunction(a, b) {
      if (a[1] === b[1]) {
        return 0;
      } else {
        return a[1] < b[1] ? -1 : 1;
      }
    }
    var file = fs.createWriteStream('array.txt');
    file.on('error', function (err) {
      /* error handling */
    });
    arr.forEach(function (v) {
      file.write(v[0] + ' \n');
    });
    file.end();
  });
};

// readLayers();
// let layersOrder = [];
// let layerConfigurations = [];
// layersOrder.push({ name: 'background' });
// layersOrder.push({ name: 'fur' });
// layersOrder.push({ name: 'metal' });
// layersOrder.push({ name: 'ear' });
// layerConfigurations.push({
//   growEditionSizeTo: 6,
//   layersOrder: layersOrder,
// });
// console.log(layerConfigurations);
let layersOrder = [];
let layerConfigurations = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('array.txt'),
});

lineReader.on('line', function (line) {
  layersOrder.push({ name: line });
});

function logTimer(doAfter) {
  setTimeout(() => {
    console.log('timer completed');
    doAfter();
  }, 1000);
}


logTimer(() => {
  layerConfigurations.push({
    growEditionSizeTo: 6,
    layersOrder: layersOrder,
  });
  console.log(layerConfigurations);
});
