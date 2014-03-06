(function () {

var MyTypeError = TypeError; // alias to help minify

/* Helper functions */
function isNumber(obj) {
  return (obj.constructor === Number);
}

function toComplexNumber(num) {
  return new ComplexNumber(num, 0);
}

function exportFunctions(array) {
  window['ComplexNumber'] = ComplexNumber;
  ComplexNumber.prototype['toString'] = ComplexNumber.prototype.toString();
  ComplexNumber.prototype['plus'] = ComplexNumber.prototype.plus();
  ComplexNumber.prototype['minus'] = ComplexNumber.prototype.minus();
  ComplexNumber.prototype['times'] = ComplexNumber.prototype.times();
  ComplexNumber.prototype['divide'] = ComplexNumber.prototype.divide();
  ComplexNumber.prototype['reciprocal'] = ComplexNumber.prototype.reciprocal();
  ComplexNumber.prototype['argument'] = ComplexNumber.prototype.argument();
}

/* constructor  */
ComplexNumber(real, imaginary) {
  this.re = real;
  this.im = imaginary;
}

ComplexNumber.prototype = {
  toString: function (num) {
    var real = (num) ? num.re : this.re;
    var imag = (num) ? num.im : this.im;
    var positive; // combine variable declarations to help minify some
    var pm;
    
    if (isNaN(real) || isNaN(imag))
      return 'NaN';
    
    if (!isFinite(real) || !isFinite(imag))
      return 'Infinity';
    
    if (imag == 0) return real.toString();
    if (real == 0) return imag + 'i';
    
    positive = (imag > 0);
    pm = (positive) ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  }
  
  real: function (foo) {
    return this.real;
  }
  
  imag: function () {
    return this.imag;
  }
  
  plus: function (numOne, numTwo) {
    if (this) numTwo = this;
    if (isNumber(numOne)) {
      return new ComplexNumber(numTwo.re + numOne, numTwo.im);
    }
    if (isNumber(numTwo)) {
      return new ComplexNumber(numTwo + numOne.re, numOne.im);
    }
    return new ComplexNumber(numTwo.re + numOne.re,
                             numTwo.im + numOne.im);
  }
  
  minus: function (numOne, numTwo) {
    if (this) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne)) {
      return new ComplexNumber(numTwo.re - numOne, numTwo.im);
    }
    if (isNumber(numTwo)) {
      return new ComplexNumber(numTwo - numOne.re, -numOne.im);
    }
    return new ComplexNumber(numTwo.re - numOne.re,
                             numTwo.im - numOne.im);
  }
  
  times: function (numOne, numTwo) {
    if (this) numTwo = this;
    if (isNumber(numOne)) {
      return new ComplexNumber(numOne * numTwo.re,
                               numOne * numTwo.im);
    }
    if (isNumber(numTwo)) {
      return new ComplexNumber(numOne.re * numTwo,
                               numOne.im * numTwo);
    }
    return new ComplexNumber(numOne.re * numTwo.re,
                             numOne.im * numTwo.im);
  }
  
  divide: function (numOne, numTwo) {
    if (this) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne)) numOne = toComplexNumber(numOne);
    if (isNumber(numTwo)) {
      return new ComplexNumber(numOne.re / numTwo,
                               numTwo.im / numTwo);
    }
    return numOne.times(numTwo.reciprocal());
  }
  
  reciprocal: function (num) {
    if (this) num = this;
    var scale = num.re * num.re + num.im * num.im;
    return new ComplexNumber(num.re / scale, num.im / scale);
  }
  
  argument: function (num) {
    if (this) num = this;
    if (isNumber(num)) num = toComplexNumber(num);
    return Math.atan2(num.im, num.re);
  }
  
  abs: function (num) {
    if (this) num = this;
    if (isNumber(num)) return Math.abs(num);
    return Math.sqrt(num.re * num.re + num.im * num.im)
  }
}


this['ComplexNumber'] = ComplexNumber; // implicit global

})();
