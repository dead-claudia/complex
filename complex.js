(function () {

var MyTypeError = TypeError; // alias to help minify

/* Helper functions */
function isNumber(obj) {
  return (obj.constructor === Number);
}

function toComplexNumber(num) {
  return new ComplexNumber(num, 0);
}

function abs(num) {
  return Math.abs(num);
}

function newComplexNumber(real, imag) {
  return new ComplexNumber(real, imag);
}

function exportFunctions(array) {
  window['ComplexNumber'] = ComplexNumber;
  ComplexNumber.prototype['toString'] = ComplexNumber.prototype.toString;
  ComplexNumber.prototype['plus'] = ComplexNumber.prototype.plus;
  ComplexNumber.prototype['minus'] = ComplexNumber.prototype.minus;
  ComplexNumber.prototype['times'] = ComplexNumber.prototype.times;
  ComplexNumber.prototype['divide'] = ComplexNumber.prototype.divide;
  ComplexNumber.prototype['recip'] = ComplexNumber.prototype.recip;
  ComplexNumber.prototype['arg'] = ComplexNumber.prototype.arg;
  ComplexNumber.prototype['real'] = ComplexNumber.prototype.real;
  ComplexNumber.prototype['imag'] = ComplexNumber.prototype.imag;
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
    
    if (imag == 0) return real + '';
    if (real == 0) return imag + 'i';
    
    positive = (imag > 0);
    pm = (positive) ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  }
  
  real: function (foo) {
    return this.re;
  }
  
  imag: function () {
    return this.im;
  }
  
  plus: function (numOne, numTwo) {
    if (this) numTwo = this;
    if (isNumber(numOne))
      return newComplexNumber(numTwo.re + numOne, numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numTwo + numOne.re, numOne.im);
    
    return newComplexNumber(numTwo.re + numOne.re,
                            numTwo.im + numOne.im);
  }
  
  minus: function (numOne, numTwo) {
    if (this) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne))
      return newComplexNumber(numTwo.re - numOne, numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numTwo - numOne.re, -numOne.im);
    
    return newComplexNumber(numTwo.re - numOne.re,
                            numTwo.im - numOne.im);
  }
  
  times: function (numOne, numTwo) {
    if (this) numTwo = this;
    if (isNumber(numOne))
      return newComplexNumber(numOne * numTwo.re,
                              numOne * numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numOne.re * numTwo,
                              numOne.im * numTwo);
    
    return newComplexNumber(numOne.re * numTwo.re,
                            numOne.im * numTwo.im);
  }
  
  divide: function (numOne, numTwo) {
    if (this) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne)) numOne = toComplexNumber(numOne);
    if (isNumber(numTwo))
      return newComplexNumber(numOne.re / numTwo,
                              numTwo.im / numTwo);
    
    return numOne.times(numTwo.reciprocal());
  }
  
  recip: function (num) {
    if (this) num = this;
    var scale = num.re * num.re + num.im * num.im;
    return newComplexNumber(num.re / scale, num.im / scale);
  }
  
  arg: function (num) {
    if (this) num = this;
    if (isNumber(num)) num = toComplexNumber(num);
    return Math.atan2(num.im, num.re);
  }
  
  abs: function (num) {
    if (this) num = this;
    if (isNumber(num)) return abs(num);
    var x = abs(num.re);
    var y = abs(num.im);
    var t = Math.min(x, y);
    x = Math.max(x, y);
    t /= x;
    return x * Math.sqrt(1 + t * t);
  }
  
  conj: function (num) {
    return newComplexNumber(num.re, num.im);
  }
}


this['ComplexNumber'] = ComplexNumber; // implicit global

})();
