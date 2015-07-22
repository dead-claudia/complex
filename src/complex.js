"use strict";

var F = require("SIMD").Float32x4;
var p = require("./polyfill.js");
var Ops = require("./ops.js");

function ComplexBase(data) {
    this._ = data;
    Object.freeze(this);
}

// Extra validation is necessary for this to correctly work.
function Complex(real, imaginary) {
    return new ComplexBase(F(+real, +imaginary));
}
module.exports = Complex;

// Alias the prototype. An instance of either should instanceof check as both.
Complex.prototype = ComplexBase.prototype;

function fromReal(num) {
    return new ComplexBase(F(num, 0));
}

function fromImag(num) {
    return new ComplexBase(F(0, num));
}

var complexNaN = new ComplexBase(F.splat(NaN));

function methods(enumerable, host, props) {
    enumerable = !!enumerable;
    for (var prop in props) {
        if (Object.prototype.hasOwnProperty.call(props, prop)) {
            Object.defineProperty(host, prop, {
                writable: true,
                enumerable: enumerable,
                configurable: true,
                value: props[prop],
            });
        }
    }
}

function getter(host, name, impl) {
    Object.defineProperty(host, name, {
        writable: true,
        enumerable: false,
        configurable: true,
        get: impl,
    });
}

// Better than the global (it doesn't coerce)
function isNaN(x) {
    return x !== x; // eslint-disable-line no-self-compare
}

getter(Complex.prototype, "real", function () {
    return Ops.getReal(this._);
});

getter(Complex.prototype, "imag", function () {
    return Ops.getImag(this._);
});

function equal(a, b) {
    return a === b || isNaN(a) && isNaN(b);
}

methods(false, Complex.prototype, {
    toString: function () {
        var real = Ops.getReal(this._);
        var imag = Ops.getImag(this._);

        if (isNaN(real) || isNaN(imag)) {
            return "NaN";
        } else if (!isFinite(real) || !isFinite(imag)) {
            return "Infinity";
        } else if (imag === 0) {
            return real + "";
        } else if (real === 0) {
            if (imag === 1) {
                return "i";
            } else if (imag === -1) {
                return "-i";
            } else {
                return imag + "i";
            }
        }

        var negative = imag < 0;
        var pm = negative ? " - " : " + ";
        if (negative) imag = -imag;

        if (imag === 1) {
            return real + pm + "i";
        } else {
            return real + pm + imag + "i";
        }
    },

    toJSON: function () {
        return [Ops.getReal(this._), Ops.getImag(this._)];
    },

    add: function (num) {
        if (num instanceof Complex) {
            return new ComplexBase(Ops.addComp(this._, num._));
        } else {
            return new ComplexBase(Ops.addNum(this._, +num));
        }
    },

    sub: function (num) {
        if (num instanceof Complex) {
            return new ComplexBase(Ops.subComp(this._, num._));
        } else {
            return new ComplexBase(Ops.subNum(this._, +num));
        }
    },

    mul: function (num) {
        if (num instanceof Complex) {
            return new ComplexBase(Ops.mulComp(this._, num._));
        } else {
            return new ComplexBase(Ops.mulNum(this._, +num));
        }
    },

    div: function (num) {
        if (num instanceof Complex) {
            return new ComplexBase(Ops.divComp(this._, num._));
        } else {
            return new ComplexBase(Ops.divNum(this._, +num));
        }
    },

    recip: function () {
        return new ComplexBase(Ops.recipComp(this._));
    },

    arg: function () {
        return fromReal(Ops.argComp(this._));
    },

    abs: function () {
        return fromReal(Ops.absComp(this._));
    },

    conj: function () {
        return new ComplexBase(Ops.conjComp(this._));
    },

    neg: function () {
        return new ComplexBase(Ops.negComp(this._));
    },

    exp: function () {
        return new ComplexBase(Ops.expComp(this._));
    },

    sin: function () {
        return new ComplexBase(Ops.sinComp(this._));
    },

    cos: function () {
        return new ComplexBase(Ops.cosComp(this._));
    },

    tan: function () {
        return new ComplexBase(Ops.tanComp(this._));
    },

    log: function () {
        return new ComplexBase(Ops.logComp(this._));
    },

    sqrt: function () {
        return new ComplexBase(Ops.sqrtComp(this._));
    },

    sinh: function () {
        return new ComplexBase(Ops.sinhComp(this._));
    },

    cosh: function () {
        return new ComplexBase(Ops.coshComp(this._));
    },

    tanh: function () {
        return new ComplexBase(Ops.tanhComp(this._));
    },

    equals: function (num) {
        return num instanceof Complex && Ops.equal(this._, num._);
    },
});

function cast(num) {
    return num instanceof Complex ? num : fromReal(+num);
}

methods(true, Complex, {
    from: cast,
    fromReal: cast,

    fromImag: function (num) {
        if (num instanceof Complex) {
            // This method effectively multiplies the number by i. Let's
            // also do that with complex numbers.
            return new ComplexBase(F.swizzle(num._, 1, 0, 2, 3));
        } else {
            return fromImag(+num);
        }
    },

    real: function (num) {
        if (num instanceof Complex) {
            return Ops.real(num._);
        } else {
            return +num;
        }
    },

    imag: function (num) {
        if (num instanceof Complex) {
            return Ops.real(num._);
        } else {
            return 0;
        }
    },

    add: function (num1, num2) {
        if (num1 instanceof Complex) {
            num1.add(num2);
        } else if (num2 instanceof Complex) {
            num2.add(num1);
        } else {
            fromReal(+num1 + num2);
        }
    },

    sub: function (num1, num2) {
        if (num1 instanceof Complex) {
            return num1.sub(num2);
        } else if (num2 instanceof Complex) {
            return new ComplexBase(+num1 - num2.real, -num2.imag);
        } else {
            return fromReal(+num1 - num2);
        }
    },

    mul: function (num1, num2) {
        if (num1 instanceof Complex) {
            return num1.mul(num2);
        } else if (num2 instanceof Complex) {
            return num2.mul(num1);
        } else {
            return fromReal(+num1 * num2);
        }
    },

    div: function (num1, num2) {
        if (num1 instanceof Complex) {
            return num1.sub(num2);
        } else if (num2 instanceof Complex) {
            return new ComplexBase(
                Ops.divComp(fromReal(+num1), num2._));
        } else {
            return fromReal(+num1 - num2);
        }
    },

    recip: function (num) {
        if (num instanceof Complex) {
            return num.recip();
        } else {
            return fromReal(1 / num);
        }
    },

    arg: function (num) {
        if (num instanceof Complex) {
            return num.arg();
        } else if (isNaN(num = +num) || num === 0) {
            return complexNaN;
        } else {
            return fromReal(num > 0 ? 0 : Math.PI);
        }
    },

    abs: function (num) {
        if (num instanceof Complex) {
            return num.abs();
        } else {
            return fromReal(Math.abs(+num));
        }
    },

    conj: function (num) {
        if (num instanceof Complex) {
            return num.conj();
        } else {
            return fromReal(+num);
        }
    },

    neg: function (num) {
        if (num instanceof Complex) {
            return num.conj();
        } else {
            return fromReal(-num);
        }
    },

    exp: function (num) {
        if (num instanceof Complex) {
            return num.exp();
        } else {
            return fromReal(Math.exp(+num));
        }
    },

    sin: function (num) {
        if (num instanceof Complex) {
            return num.sin();
        } else {
            return fromReal(Math.sin(+num));
        }
    },

    cos: function (num) {
        if (num instanceof Complex) {
            return num.cos();
        } else {
            return fromReal(Math.cos(+num));
        }
    },

    tan: function (num) {
        if (num instanceof Complex) {
            return num.tan();
        } else {
            return fromReal(Math.tan(+num));
        }
    },

    log: function (num) {
        if (num instanceof Complex) {
            return num.log();
        } else {
            return fromReal(Math.log(+num));
        }
    },

    sqrt: function (num) {
        if (num instanceof Complex) {
            return num.sqrt();
        } else if ((num = +num) >= 0) {
            return fromReal(Math.sqrt(+num));
        } else {
            return fromImag(Math.sqrt(-num));
        }
    },

    sinh: function (num) {
        if (num instanceof Complex) {
            return num.sinh();
        } else {
            return fromReal(p.sinh(+num));
        }
    },

    cosh: function (num) {
        if (num instanceof Complex) {
            return num.cosh();
        } else {
            return fromReal(p.cosh(num));
        }
    },

    tanh: function (num) {
        if (num instanceof Complex) {
            return num.tanh();
        } else {
            return fromReal(p.tanh(num));
        }
    },

    equals: function (num1, num2) {
        if (num1 instanceof Complex) {
            return num1.equals(num2);
        } else if (num2 instanceof Complex) {
            return equal(Ops.getReal(num2._), num1) &&
                Ops.getImag(num2._) === 0;
        } else {
            return equal(num1, num2);
        }
    },
});
