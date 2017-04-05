import {DatasetGenerator} from './DatasetGenerator';

let datagen = new DatasetGenerator();

let writeButton = document.getElementById('write');
let doDataSets = document.getElementById('get');
let saveImg = document.getElementById('save');
let saveJSON = document.getElementById('saveDataSets');

writeButton.addEventListener("click",() => datagen.writeCanvas('Kinnari'));
doDataSets.addEventListener("click", () => datagen.getDatasets());
saveImg.addEventListener("click", () => datagen.saveImg());
saveJSON.addEventListener("click", () => datagen.saveJSON());
