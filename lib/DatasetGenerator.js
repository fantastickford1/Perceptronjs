'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasetGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domToImage = require('dom-to-image');

var _domToImage2 = _interopRequireDefault(_domToImage);

var _canvasToImage = require('canvas-to-image');

var _canvasToImage2 = _interopRequireDefault(_canvasToImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import jsonfile from 'jsonfile';

var DatasetGenerator = exports.DatasetGenerator = function () {
  function DatasetGenerator() {
    _classCallCheck(this, DatasetGenerator);

    this.canvasSet = [];
    this.dataSets = {};
    this.allData = [];
    this.textFile = null;
  }

  _createClass(DatasetGenerator, [{
    key: 'getCanvasArray',
    value: function getCanvasArray() {
      this.canvasSet = [].slice.call(document.getElementsByClassName('mycanvas'));
    }
  }, {
    key: 'erraseCanvas',
    value: function erraseCanvas() {
      this.canvasSet.forEach(function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }, {
    key: 'writeCanvas',
    value: function writeCanvas(font) {
      console.log(font);
      this.getCanvasArray();
      this.canvasSet.forEach(function (canvas, index) {
        console.log('Dibujando');
        var ctx = canvas.getContext("2d");
        ctx.font = '10px ' + font;
        var data = canvas.id;
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText(data, 2, 8);
      });
    }
  }, {
    key: 'getDatasets',
    value: function getDatasets() {
      var _this = this;

      this.allData = [];
      this.canvasSet.forEach(function (canvas) {
        _domToImage2.default.toPixelData(canvas).then(function (pixel) {
          console.log('Se obtendra data');
          var character = canvas.id;
          var bytes = [];
          for (var y = 0; y < canvas.scrollHeight; ++y) {
            console.log('Obteniendo data');
            for (var x = 0; x < canvas.scrollWidth; ++x) {
              var pixelAtXYOffset = 4 * y * canvas.scrollHeight + 4 * x;
              var pixelAtXY = pixel.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
              bytes.push(_this.filtro(pixelAtXY));
            }
          }
          console.log('se obtuvo el data');
          _this.allData.push({ character: character, bytes: bytes });
          //then Final
        });
        //end forEach
      });
      console.log('before the return');
      return this.allData;
    }
  }, {
    key: 'saveJSON',
    value: function saveJSON(data) {
      var jsonString = JSON.stringify(data);
      console.log('save funtion');
      console.log(data);
      var link = document.getElementById('downloadlink');
      link.href = this.makeTextFile(jsonString);
      link.style.display = 'block';
    }
  }, {
    key: 'makeTextFile',
    value: function makeTextFile(text) {
      var data = new Blob([text], { type: 'text/plain' });

      if (this.textFile !== null) window.URL.revokeObjectURL(this.textFile);

      this.textFile = window.URL.createObjectURL(data);

      return this.textFile;
    }
  }, {
    key: 'filtro',
    value: function filtro(pixelAtXY) {
      return pixelAtXY[0] >= 125 && pixelAtXY[0] <= 255 && pixelAtXY[1] >= 125 && pixelAtXY[1] <= 255 && pixelAtXY[2] >= 125 && pixelAtXY[2] <= 255 ? 1 : 0;
    }
  }, {
    key: 'saveImg',
    value: function saveImg() {
      this.canvasSet.forEach(function (canvas) {
        (0, _canvasToImage2.default)(canvas.id, {
          name: 'myJPG' + canvas.id,
          type: 'jpg',
          quality: 1
        });
      });
    }
  }]);

  return DatasetGenerator;
}();