import {Perceptron} from "./Perceptron";

let data = {
  X   : [
          [ 0 , 0 ],
          [ 1 , 0 ],
          [ 0 , 1 ],
          [ 1 , 1 ]
        ],
  W   : [ 0.1 , 0.1 ],
  T   : 1,
  tol : 0.01,
  N   : 0.01
}

let Y = {
  AND : [ 0, 0, 0, 1 ],
  OR  : [ 0, 1, 1, 1 ],
  XOR : [ 0, 1, 1, 0 ]
}



//Perceptron(X,Y,W,T,tol,N)
let perceptron_AND = new Perceptron(
  data.X,
  Y.AND,
  data.W,
  data.T,
  data.tol,
  data.N
  );

let perceptron_OR = new Perceptron(
  data.X,
  Y.OR,
  data.W,
  data.T,
  data.tol,
  data.N
  );

var Y_AND = perceptron_AND.learning();
var Y_OR = perceptron_OR.learning();

let result = { Y_AND, Y_OR }

console.log(result);

let XUpdate = data.X.map( (Xi) => [ perceptron_AND.output( Xi ), perceptron_OR.output( Xi ) ]);

let perceptron_XOR = new Perceptron(
  XUpdate,
  Y.XOR,
  data.W,
  data.T,
  data.tol,
  data.N
);

perceptron_XOR.enableDebug();

perceptron_XOR.learning();
