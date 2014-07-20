/* jshint esnext:true */
module 'ComplexNumber' {

// removes excess from Object.prototype.toString.call();
let type = obj => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * Fully freezes object to make it immutable . Not used
 */
function freeze(obj) {
  Object.freeze(obj);
  [for (let prop Object.keys(obj))
    if (typeof prop === 'object' && !Object.isFrozen(prop))
      freeze(obj)];
}
// shortcut to test for number
const isNumber = obj => type(obj) === 'Number';

// shortcut to convert real to ComplexNumber
const realToComplex = num => new ComplexNumber(num, 0);

// shortcut to convert imaginary to ComplexNumber
const imagToComplex = num => new ComplexNumber(0, num);

// shortcut to test if defined
const def = param => type(num) !== 'Undefined';

class ComplexNumber {
  constructor(real, imaginary) {
    Object.defineProperty(this, 'real', {value: real});
    Object.defineProperty(this, 'imag', {value: imaginary});
  }
  
  toString() {
    let [real, imag] = [this.real, this.imag];
    
    if (isNaN(real) || isNaN(imag)) return NaN;
    
    if (!isFinite(real) || !isFinite(imag)) return Infinity;
    
    if (!imag && !real]) return '0';
    
    let positive = imag > 0;
    let pm = positive ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag === 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  }
  
  plus(num) {
    if (isNumber(num))
      return new ComplexNumber(this.real + num, this.imag);
    
    return (this.real + num.real, this.imag + num.imag);
  }
  
  minus(num) {
    if (isNumber(num))
      return new ComplexNumber(this.real - num, this.imag);
    
    return new ComplexNumber(this.real - num.real, this.imag - num.imag);
  }
  
  times(num) {
    if (isNumber(num))
      return new ComplexNumber(this.real * num, this.imag * num);
    
    return new ComplexNumber(this.real * num.real - this.imag * num.imag,
                             this.real * num.imag + this.imag * num.real);
  }
  
  divide(num) {
    if (isNumber(num))
      return new ComplexNumber(this.real / num, this.imag / num);
    
    return this.times(num.recip());
  }
  
  arg() {
    if (!this.imag) return Math.abs(this.real);
    if (!this.real) return Math.abs(this.imag);
    
    return Math.hypot(this.real, this.imag);
  }
  
  conj() {
    return new ComplexNumber(this.real, -this.imag);
  }
  
  negate() {
    return new ComplexNumber(-this.real, -this.imag);
  }
  
  exp() {
    if (!this.imag) return realToComplex(Math.exp(this.real));
    
    return new ComplexNumber(Math.exp(this.real) * Math.cos(this.imag),
                             Math.exp(this.real) * Math.sin(this.imag));
  }
  
  sin() {
    if (!this.imag) return realToComplex(Math.sin(this.real));
    
    return new ComplexNumber(Math.sin(this.real) * Math.cosh(this.imag),
                             Math.cos(this.real) * Math.sinh(this.imag));
  }
  
  cos() {
    if (!this.imag) return realToComplex(Math.cos(this.real));
    
    return new ComplexNumber(Math.cos(this.real) * Math.cosh(this.imag),
                             Math.sin(this.real) * Math.sinh(this.imag));
  }
  
  tan() {
    if (!this.imag) return realToComplex(Math.tan(this.real));
    if (!this.real) return realToComplex(Math.tanh(this.imag));
    
    return this.sin().divide(this.cos());
  }
  
  sqrt() {
    let r = this.abs();
    let t = this.arg() / 2;
    return new ComplexNumber(r * Math.cos(t), r * Math.sin(t));
  }
  
  sinh() {
    let real = Math.sinh(this.real);
    let imag = Math.sin(this.imag);
    if (!this.imag) return realToComplex(real);
    if (!this.real) return imagToComplex(imag);
    
    return new ComplexNumber(real * Math.cos(this.imag),
                             imag * Math.cosh(this.real));
  }
  
  cosh() {
    let real = Math.cosh(this.real);
    let imag = Math.cos(this.imag);
    if (!this.imag) return realToComplex(real);
    if (!this.real) return realToComplex(imag);
    
    return new ComplexNumber(real * imag,
                             Math.sinh(this.real) * Math.sin(this.imag));
  }
  
  tanh() {
    if (!this.imag) return realToComplex(Math.tanh(this.real));
    if (!this.real) return imagToComplex(Math.tan(this.imag));
    
    return this.sinh().divide(this.cosh());
  }
}

ComplexNumber.realToComplex = realToComplex;
ComplexNumber.imagToComplex = imagToComplex;

freeze(ComplexNumber);

export ComplexNumber;

};