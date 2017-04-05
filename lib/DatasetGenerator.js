'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasetGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//import jsonfile from 'jsonfile';


var _domToImage = require('dom-to-image');

var _domToImage2 = _interopRequireDefault(_domToImage);

var _canvasToImage = require('canvas-to-image');

var _canvasToImage2 = _interopRequireDefault(_canvasToImage);

var _jsonFile = require('json-file');

var _jsonFile2 = _interopRequireDefault(_jsonFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatasetGenerator = exports.DatasetGenerator = function () {
  function DatasetGenerator() {
    _classCallCheck(this, DatasetGenerator);

    this.canvasSet = [];
    this.dataSets = {};
    this.allData = [];
  }

  _createClass(DatasetGenerator, [{
    key: 'getCanvasArray',
    value: function getCanvasArray() {
      this.canvasSet = [].slice.call(document.getElementsByClassName('mycanvas'));
    }
  }, {
    key: 'writeCanvas',
    value: function writeCanvas(font) {
      this.getCanvasArray();
      this.canvasSet.forEach(function (canvas, index) {
        var ctx = canvas.getContext("2d");
        ctx.font = font;
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

      this.getCanvasArray();
      this.canvasSet.forEach(function (canvas) {
        _domToImage2.default.toPixelData(canvas).then(function (pixel) {
          var character = canvas.id;
          var bytes = [];
          for (var y = 0; y < canvas.scrollHeight; ++y) {
            for (var x = 0; x < canvas.scrollWidth; ++x) {
              var pixelAtXYOffset = 4 * y * canvas.scrollHeight + 4 * x;
              var pixelAtXY = pixel.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
              bytes.push(_this.filtro(pixelAtXY));
            }
          }
          _this.allData.push({ character: character, bytes: bytes });
        });
      });
    }
  }, {
    key: 'saveJSON',
    value: function saveJSON() {
      var jsonString = JSON.stringify(this.allData);
      console.log(jsonString);
    }
  }, {
    key: 'filtro',
    value: function filtro(pixelAtXY) {
      return pixelAtXY[0] >= 125 && pixelAtXY[0] <= 255 && pixelAtXY[1] >= 125 && pixelAtXY[1] <= 255 && pixelAtXY[2] >= 125 && pixelAtXY[2] <= 255 ? 1 : 0;
    }
  }, {
    key: 'saveImg',
    value: function saveImg() {
      this.getCanvasArray();
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