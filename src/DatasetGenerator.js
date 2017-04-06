import domtoimage from 'dom-to-image';
import canvasToImage from 'canvas-to-image';
//import jsonfile from 'jsonfile';

export class DatasetGenerator {
  constructor() {
    this.canvasSet = [];
    this.dataSets = {};
    this.allData = [];
    this.textFile = null;
  }

  getCanvasArray(){
    this.canvasSet = [].slice.call(
      document.getElementsByClassName('mycanvas')
    );
  }

  erraseCanvas(){
    this.canvasSet.forEach( (canvas) =>{
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  writeCanvas(font){
    console.log(font);
    this.getCanvasArray();
    this.canvasSet.forEach( (canvas , index) => {
      console.log('Dibujando');
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
    this.canvasSet.forEach( (canvas) =>{
      domtoimage.toPixelData(canvas)
        .then( ( pixel ) =>{
          console.log('Se obtendra data');
          var character = canvas.id;
          var bytes = [];
          for(var y=0; y < canvas.scrollHeight; ++y){
            console.log('Obteniendo data');
            for(var x = 0; x < canvas.scrollWidth; ++x){
              var pixelAtXYOffset = (4 * y * canvas.scrollHeight) + (4 * x);
              var pixelAtXY = pixel.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
              bytes.push(this.filtro(pixelAtXY));
            }
          }
          console.log('se obtuvo el data');
          this.allData.push({character , bytes});
          //then Final
        });
        //end forEach
    });
    console.log('before the return');
    return this.allData;
  }

  saveJSON(data){
    let jsonString = JSON.stringify(data);
    console.log('save funtion');
    console.log(data);
    var link = document.getElementById('downloadlink');
		link.href = this.makeTextFile( jsonString );
		link.style.display = 'block';
  }

  makeTextFile ( text ) {
  	var data = new Blob([text], {type: 'text/plain'});

  	if (this.textFile !== null)
  		window.URL.revokeObjectURL(this.textFile);

  	this.textFile = window.URL.createObjectURL( data );

  	return this.textFile;
  }


  filtro(pixelAtXY){
    return (pixelAtXY[0] >= 125 && pixelAtXY[0] <= 255) && (pixelAtXY[1] >= 125 && pixelAtXY[1] <= 255) && (pixelAtXY[2] >= 125 && pixelAtXY[2] <= 255)? 1 : 0;
  }

  saveImg(){
    this.canvasSet.forEach( (canvas) =>{
      canvasToImage(canvas.id, {
        name: `myJPG${canvas.id}`,
        type: 'jpg',
        quality: 1
      });
    });
  }

}
