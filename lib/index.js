"use strict";

var _Perceptron = require("./Perceptron");

var data = {
  X: [[0, 0], [1, 0], [0, 1], [1, 1]],
  W: [0.1, 0.1],
  T: 1,
  tol: 0.01,
  N: 0.01
};

var Y = {
  AND: [0, 0, 0, 1],
  OR: [0, 1, 1, 1],
  XOR: [0, 1, 1, 0]
};

//Perceptron(X,Y,W,T,tol,N)
var perceptron_AND = new _Perceptron.Perceptron(data.X, Y.AND, data.W, data.T, data.tol, data.N);

var perceptron_OR = new _Perceptron.Perceptron(data.X, Y.OR, data.W, data.T, data.tol, data.N);

var Y_AND = perceptron_AND.learning();
var Y_OR = perceptron_OR.learning();

var result = { Y_AND: Y_AND, Y_OR: Y_OR };

console.log(result);

var XUpdate = data.X.map(function (Xi) {
  return [perceptron_AND.output(Xi), perceptron_OR.output(Xi)];
});

var perceptron_XOR = new _Perceptron.Perceptron(XUpdate, Y.XOR, data.W, data.T, data.tol, data.N);

perceptron_XOR.enableDebug();

perceptron_XOR.learning();