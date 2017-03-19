"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Perceptron = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mathjs = require("mathjs");

var _mathjs2 = _interopRequireDefault(_mathjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Perceptron = exports.Perceptron = function () {
  /**
  *@param {Array} X - Matris de entrada
  *@param {Array} Y - Salidas esperadas
  *@param {Array} W - Pesos de entrada
  *@param {number} T - Tetha
  *@param {number} tol - Tolerancia
  *@param {number} N -  Constante de proporcionalidad
  */
  function Perceptron(X, Y, W, T, tol, N) {
    _classCallCheck(this, Perceptron);

    this.X = X || [[0, 0], [1, 0], [0, 1], [1, 1]];
    this.Y = Y || [0, 1, 1, 1];
    this.W = W || [0.1, 0.1];
    this.T = T || 1;
    this.tol = tol || 0.01;
    this.N = N || 0.01;
    this.err_total = this.tol * 2;
    this.count = 0;
    this.DEB = false;
  }

  _createClass(Perceptron, [{
    key: "enableDebug",
    value: function enableDebug() {
      this.DEB = true;
    }
  }, {
    key: "disableDebug",
    value: function disableDebug() {
      this.DEB = false;
    }
  }, {
    key: "learning",
    value: function learning() {
      var _this = this;

      while (this.tol < this.err_total) {

        this.err_total = 0;

        this.X.forEach(function (Xi, indx) {

          //SAlida de la neurona
          var Yk = _this.output(Xi);

          //Calculo del error
          var error = _this.Y[indx] - Yk;

          //Actualizacion de los Pesos
          var st_op = _mathjs2.default.multiply(_this.N, Xi),
              nd_op = _mathjs2.default.multiply(st_op, error),
              update = _mathjs2.default.add(nd_op, _this.W);

          _this.W = update;

          _this.err_total += error * error;
        });

        this.count++;
        this.err_total = _mathjs2.default.sqrt(this.err_total);
        if (this.DEB) console.log("iteracion: " + this.count + " , error -> " + this.err_total + " , W -> " + this.W);
      }
      return this.W;
    }
  }, {
    key: "output",
    value: function output(Xi) {
      //Calculo de la U
      var U = _mathjs2.default.multiply(Xi, this.W);
      //Caluclo de la salida de la neurona
      var Yi = this.fa(U - this.T);

      return Yi;
    }
  }, {
    key: "fa",
    value: function fa(x) {
      return x <= 0 ? 0 : 1;
    }
  }]);

  return Perceptron;
}();