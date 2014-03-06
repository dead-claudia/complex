(function () {

var MyTypeError = TypeError; // alias to help minify

/* Helper functions */
function isNumber(obj) {
  return (obj.constructor === Number);
}

function isInteger(num) {
  return (num % 1 == num);
}

function toComplexNumber(num) {
  return newComplexNumber(num, 0);
}

var abs = Math.abs;
var sin = Math.sin;
var cos = Math.cos;
var exp = Math.exp;
var pow = Math.pow;

if (Math.sinh) {
  var sinh = Math.sinh;
  var cosh = Math.cosh;
  var tanh = Math.tanh;
} else {
  var sinh = function (num) {
    var e = Math.E;
    var p = pow(e, num);
    return (p - 1 / p) / 2;
  };
  var cosh = function (num) {
    var e = Math.E;
    var p = pow(e, num);
    return (p + 1 / p) / 2;
  };
  var tanh = function (num) {
    var e = Math.E;
    var p = pow(e, num);
    var r = 1 / p;
    return (p + r) / (p - r);
  }
}

function newComplexNumber(real, imag) {
  return new ComplexNumber(real, imag);
}

function exportFunctions() {
  ComplexNumber.fn['toString'] = ComplexNumber.fn.toString;
  ComplexNumber.fn['plus'] = ComplexNumber.fn.plus;
  ComplexNumber.fn['minus'] = ComplexNumber.fn.minus;
  ComplexNumber.fn['times'] = ComplexNumber.fn.times;
  ComplexNumber.fn['divide'] = ComplexNumber.fn.divide;
  ComplexNumber.fn['recip'] = ComplexNumber.fn.recip;
  ComplexNumber.fn['arg'] = ComplexNumber.fn.arg;
  ComplexNumber.fn['real'] = ComplexNumber.fn.real;
  ComplexNumber.fn['imag'] = ComplexNumber.fn.imag;
  
  ComplexNumber.prototype = ComplexNumber.fn;
  window['ComplexNumber'] = ComplexNumber;
}

/* constructor  */
ComplexNumber(real, imaginary) {
  this.re = real;
  this.im = imaginary;
}

ComplexNumber.fn = {
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
  
  real: function (num) {
    return (num) ? num.re : this.re;
  }
  
  imag: function (num) {
    return (num) ? num.im : this.im;
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
  
  conj: function (num) {
    if (this) num = this;
    return newComplexNumber(num.re, -num.im);
  }
  
  negate: function (num) {
    if (this) num = this;
    return newComplexNumber(-num.re, -num.im);
  }
  
  exp: function (num) {
    if (this) num = this;
    var real = num.re;
    var imag = num.im;
    if (isInteger(real)) return toComplexNumber(exp(real));
    return newComplexNumber(exp(real) * cos(imag),
                            exp(real) * sin(imag));
  }
  
  sin: function (num) {
    if (this) num = this;
    var real = num.re;
    var imag = num.im;
    if (isInteger(real)) return toComplexNumber(sin(real));
    return newComplexNumber(sin(real) * Math.cosh(imag),
                            cos(real) * Math.sinh(imag));
  }
  
  cos: function (num) {
    if (this) num = this;
    var real = num.re;
    var imag = num.im;
    return newComplexNumber(Math.cos(real) * Math.cosh(imag),
                            Math.sin(real) * Math.sinh(imag));
  }
  
  
}

/* conditional function assignments */
if (Math.hypot) {
  ComplexNumber.fn.abs = function (num) {
    if (this) num = this;
    if (isNumber(num)) return abs(num);
    return Math.hypot(num.im, num.re);
  }
} else {
  ComplexNumber.fn.abs = function (num) {
    if (this) num = this;
    if (isNumber(num)) return abs(num);
    var x = abs(num.re);
    var y = abs(num.im);
    var t = Math.min(x, y);
    x = Math.max(x, y);
    t /= x;
    return x * Math.sqrt(1 + t * t);
  }
}

exportFunctions();

})();
