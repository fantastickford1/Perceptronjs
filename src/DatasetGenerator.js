import domtoimage from 'dom-to-image';
import canvasToImage from 'canvas-to-image';
//import jsonfile from 'jsonfile';
import jsonfile from 'json-file';

export class DatasetGenerator {
  constructor() {
    this.canvasSet = [];
    this.dataSets = {};
    this.allData = [];
  }

  getCanvasArray(){
    this.canvasSet = [].slice.call(
      document.getElementsByClassName('mycanvas')
    );
  }

  writeCanvas(font){
    this.getCanvasArray();
    this.canvasSet.forEach( (canvas , index) => {
      var ctx = canvas.getContext("2d");
      ctx.font = font;
      var data = canvas.id;
      ctx.fillStyle='rgb(255, 255, 255)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle='rgb(0, 0, 0)';
      ctx.fillText(data, 2, 8);
    });
  }

  getDatasets(){
    this.getCanvasArray();
    this.canvasSet.forEach( (canvas) =>{
      domtoimage.toPixelData(canvas)
        .then( ( pixel ) =>{
          var character = canvas.id;
          var bytes = [];
          for(var y=0; y < canvas.scrollHeight; ++y){
            for(var x = 0; x < canvas.scrollWidth; ++x){
              var pixelAtXYOffset = (4 * y * canvas.scrollHeight) + (4 * x);
              var pixelAtXY = pixel.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
              bytes.push(this.filtro(pixelAtXY));
            }
          }
          this.allData.push({character , bytes});
        });
    });
  }

  saveJSON(){
    let jsonString = JSON.stringify(this.allData);
    console.log(jsonString);

  }

  filtro(pixelAtXY){
    return (pixelAtXY[0] >= 125 && pixelAtXY[0] <= 255) && (pixelAtXY[1] >= 125 && pixelAtXY[1] <= 255) && (pixelAtXY[2] >= 125 && pixelAtXY[2] <= 255)? 1 : 0;
  }

  saveImg(){
    this.getCanvasArray();
    this.canvasSet.forEach( (canvas) =>{
      canvasToImage(canvas.id, {
        name: `myJPG${canvas.id}`,
        type: 'jpg',
        quality: 1
      });
    });
  }

}
