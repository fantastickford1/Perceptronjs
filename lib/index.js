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
perceptron_AND.enableDebug();
perceptron_OR.enableDebug();
console.log("Learning AND..... \n");
var Y_AND = perceptron_AND.learning();

console.log("Learning OR..... \n");
var Y_OR = perceptron_OR.learning();

var result = { Y_AND: Y_AND, Y_OR: Y_OR };
console.log("Pesos finales de AND y OR => " + result + " \n");

console.log("Salidas de AND \n");
data.X.forEach(function (Xi) {
  return console.log(perceptron_AND.output(Xi));
});

console.log("Salidas de OR \n");
data.X.forEach(function (Xi) {
  return console.log(perceptron_OR.output(Xi));
});

console.log("Building X for XOR ... \n");
var XUpdate = data.X.map(function (Xi) {
  return [perceptron_AND.output(Xi), perceptron_OR.output(Xi)];
});
console.log(XUpdate);

var perceptron_XOR = new _Perceptron.Perceptron(XUpdate, Y.XOR, data.W, data.T, data.tol, data.N);

perceptron_XOR.enableDebug();
console.log("Learning XOR... \n");
perceptron_XOR.learning();
console.log("Salidas de XOR \n");
XUpdate.forEach(function (Xi) {
  return console.log(perceptron_XOR.output(Xi));
});