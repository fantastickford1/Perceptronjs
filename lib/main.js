'use strict';

var _DatasetGenerator = require('./DatasetGenerator');

var datagen = new _DatasetGenerator.DatasetGenerator();

var writeButton = document.getElementById('write');
var getData = document.getElementById('data');
var saveDAta = document.getElementById('save');

var index = 0;
var fonts = ['Bitstream Charter', 'Century Schoolbook L', 'FreeMono', 'FreeSans', 'FreeSerif', 'Garuda', 'Kinnari', 'Laksaman', 'Liberation', 'Loma', 'NanumGothic', 'Nimbus Mono L', 'Nimbus Sans L', 'Norasi', 'Padauk', 'Purisa', 'Sawasdee', 'STIX'];
var data = [];

writeButton.addEventListener("click", function () {
  if (index < fonts.length) {
    console.log(fonts[index]);
    datagen.writeCanvas(fonts[index]);
  }
});

getData.addEventListener('click', function () {
  data.push(datagen.getDatasets());
});

saveDAta.addEventListener('click', function () {
  datagen.saveJSON(data);
  datagen.erraseCanvas();
  index++;
});