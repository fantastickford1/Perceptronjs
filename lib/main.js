'use strict';

var _DatasetGenerator = require('./DatasetGenerator');

var datagen = new _DatasetGenerator.DatasetGenerator();

var writeButton = document.getElementById('write');
var doDataSets = document.getElementById('get');
var saveImg = document.getElementById('save');
var saveJSON = document.getElementById('saveDataSets');

writeButton.addEventListener("click", function () {
  return datagen.writeCanvas('Kinnari');
});
doDataSets.addEventListener("click", function () {
  return datagen.getDatasets();
});
saveImg.addEventListener("click", function () {
  return datagen.saveImg();
});
saveJSON.addEventListener("click", function () {
  return datagen.saveJSON();
});