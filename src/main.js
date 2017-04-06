import {DatasetGenerator} from './DatasetGenerator';

let datagen = new DatasetGenerator();

let writeButton = document.getElementById('write');
let getData = document.getElementById('data');
let saveDAta = document.getElementById('save');

var index = 0;
let fonts = ['Bitstream Charter','Century Schoolbook L','FreeMono','FreeSans','FreeSerif','Garuda','Kinnari','Laksaman','Liberation','Loma','NanumGothic','Nimbus Mono L','Nimbus Sans L','Norasi','Padauk','Purisa','Sawasdee','STIX'];
let data = [];

writeButton.addEventListener("click",() => {
  if (index < fonts.length){
    console.log(fonts[index]);
    datagen.writeCanvas(fonts[index]);
  }
});

getData.addEventListener('click', () =>{
  data.push(datagen.getDatasets());
});

saveDAta.addEventListener('click', () =>{
  datagen.saveJSON(data);
  datagen.erraseCanvas();
  index++;
});
