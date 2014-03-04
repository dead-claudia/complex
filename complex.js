(function () {

/* Helper functions */
function notComplexNumber(num) {
  var args = arguments.toArray();
  if (args[1]) {
    return !(args.shift().constructor === ComplexNumber) &&
             notComplexNumber(args));
  }
  return (num.constructor !== ComplexNumber);
}

function exportFunctions(array) {
  window['ComplexNumber'] = ComplexNumber;
  ComplexNumber.prototype['toString'] = ComplexNumber.prototype.toString();
  ComplexNumber.prototype['plus'] = ComplexNumber.prototype.plus();
  ComplexNumber.prototype['minus'] = ComplexNumber.prototype.minus();
  ComplexNumber.prototype['times'] = ComplexNumber.prototype.times();
  ComplexNumber.prototype['divide'] = ComplexNumber.prototype.divide();
}

ComplexNumber(real, imaginary) {
  var this.re = real;
  var this.im = imaginary;
}

ComplexNumber.prototype = {
  toString: function (num) {
    if (num.constructor !== ComplexNumber)
      throw new TypeError();
    var real = (num) ? num.re : this.re;
    var imag = (num) ? num.im : this.im;
    
    if (isNaN(real) || isNaN(imag))
      return 'NaN';
    
    if (!isFinite(real) || !isFinite(imag))
      return 'Infinity';
    
    if (imag == 0) return real.toString();
    if (real == 0) return imag + 'i';
    
    var positive = (imag > 0);
    var pm = (positive) ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  }
  
  plus: function (numOne, numTwo) {
    if (numTwo) {
      if (notComplexNumber(numOne, numTwo))
        throw new TypeError();
      return new ComplexNumber(numOne.re + numTwo.re,
                               numOne.im + numTwo.im);
    }
    if (notComplexnumber(this, numOne))
      throw new TypeError();
    return new ComplexNumber(this.re + numOne.re,
                             this.im + numOne.im);
  }
  
  minus: function (numOne, numTwo) {
    if (numTwo) {
      if (notComplexNumber(numOne, numTwo))
        throw new TypeError();
      return new ComplexNumber(numOne.re - numTwo.re,
                               numOne.im - numTwo.im);
    }
    if (notComplexNumber(this, numOne))
      throw new TypeError();
    return new ComplexNumber(this.re - numOne.re,
                             this.im - numOne.im);
  }
  times: function (numOne, numTwo) {
    
  }
}


this['ComplexNumber'] = ComplexNumber; // implicit global

})();
