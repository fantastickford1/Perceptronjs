import Math from "mathjs";

export class Perceptron {
  /**
  *@param {Array} X - Matris de entrada
  *@param {Array} Y - Salidas esperadas
  *@param {Array} W - Pesos de entrada
  *@param {number} T - Tetha
  *@param {number} tol - Tolerancia
  *@param {number} N -  Constante de proporcionalidad
  */
  constructor(X,Y,W,T,tol,N) {
    this.X =    X   || [
                        [0,0],
                        [1,0],
                        [0,1],
                        [1,1]
                      ];
    this.Y =    Y   || [0,1,1,1];
    this.W =    W   || [0.1,0.1];
    this.T =    T   || 1;
    this.tol =  tol || 0.01;
    this.N =    N   || 0.01;
    this.err_total = this.tol * 2;
    this.count = 0;
    this.DEB = false;
  }

  enableDebug(){
    this.DEB = true;
  }

  disableDebug(){
    this.DEB = false;
  }

  learning(){

    while (this.tol < this.err_total) {

      this.err_total = 0;

      this.X.forEach( (Xi,indx) => {

        //SAlida de la neurona
        let Yk = this.output( Xi );

        //Calculo del error
        let error = this.Y[indx] - Yk;

        //Actualizacion de los Pesos
        let st_op = Math.multiply(this.N, Xi),
        nd_op = Math.multiply(st_op, error),
        update = Math.add(nd_op,this.W);

        this.W = update;

        this.err_total += (error * error);
      });

      this.count++;
      this.err_total = Math.sqrt(this.err_total);
      if (this.DEB)
        console.log(`iteracion: ${this.count} , error -> ${this.err_total} , W -> ${this.W} \n`);
    }
    return this.W;
  }

  output(Xi){
    //Calculo de la U
    let U = Math.multiply(Xi,this.W);
    //Caluclo de la salida de la neurona
    let Yi = this.fa( U - this.T);

    return Yi;

  }

  fa( x ){
    return (x <= 0) ? 0:1;
  }




}
