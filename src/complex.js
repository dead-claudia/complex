"use strict";

var F = require("SIMD").Float32x4;
var p = require("./polyfill.js");
var Ops = require("./ops.js");

function ComplexNumberBase(data) {
    this._ = data;
    Object.freeze(this);
}

// Extra validation is necessary for this to correctly work.
function ComplexNumber(real, imaginary) {
    ComplexNumberBase.call(this, F(+real, +imaginary));
}
module.exports = ComplexNumber;

// Alias the prototype. An instance of either should instanceof check as both.
ComplexNumber.prototype = ComplexNumberBase.prototype;

function realToComplex(num) {
    return new ComplexNumberBase(F(num, 0));
}

function imagToComplex(num) {
    return new ComplexNumberBase(F(0, num));
}

var complexNaN = new ComplexNumberBase(F.splat(NaN));

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

getter(ComplexNumber.prototype, "real", function () {
    return Ops.getReal(this._);
});

getter(ComplexNumber.prototype, "imag", function () {
    return Ops.getImag(this._);
});

function equal(a, b) {
    return a === b || isNaN(a) && isNaN(b);
}

methods(false, ComplexNumber.prototype, {
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

    add: function (num) {
        if (num instanceof ComplexNumber) {
            return new ComplexNumberBase(Ops.addComp(this._, num._));
        } else {
            return new ComplexNumberBase(Ops.addNum(this._, +num));
        }
    },

    sub: function (num) {
        if (num instanceof ComplexNumber) {
            return new ComplexNumberBase(Ops.subComp(this._, num._));
        } else {
            return new ComplexNumberBase(Ops.subNum(this._, +num));
        }
    },

    mul: function (num) {
        if (num instanceof ComplexNumber) {
            return new ComplexNumberBase(Ops.mulComp(this._, num._));
        } else {
            return new ComplexNumberBase(Ops.mulNum(this._, +num));
        }
    },

    div: function (num) {
        if (num instanceof ComplexNumber) {
            return new ComplexNumberBase(Ops.divComp(this._, num._));
        } else {
            return new ComplexNumberBase(Ops.divNum(this._, +num));
        }
    },

    recip: function () {
        return new ComplexNumberBase(Ops.recipComp(this._));
    },

    arg: function () {
        return realToComplex(Ops.argComp(this._));
    },

    abs: function () {
        return realToComplex(Ops.absComp(this._));
    },

    conj: function () {
        return new ComplexNumberBase(Ops.conjComp(this._));
    },

    neg: function () {
        return new ComplexNumberBase(Ops.negComp(this._));
    },

    exp: function () {
        return new ComplexNumberBase(Ops.expComp(this._));
    },

    sin: function () {
        return new ComplexNumberBase(Ops.sinComp(this._));
    },

    cos: function () {
        return new ComplexNumberBase(Ops.cosComp(this._));
    },

    tan: function () {
        return new ComplexNumberBase(Ops.tanComp(this._));
    },

    log: function () {
        return new ComplexNumberBase(Ops.logComp(this._));
    },

    sqrt: function () {
        return new ComplexNumberBase(Ops.sqrtComp(this._));
    },

    sinh: function () {
        return new ComplexNumberBase(Ops.sinhComp(this._));
    },

    cosh: function () {
        return new ComplexNumberBase(Ops.coshComp(this._));
    },

    tanh: function () {
        return new ComplexNumberBase(Ops.tanhComp(this._));
    },


    equals: function (num) {
        return num instanceof ComplexNumber && Ops.equal(this._, num._);
    },
});

methods(true, ComplexNumber, {
    realToComplex: function (num) {
        return realToComplex(+num);
    },

    imagToComplex: function (num) {
        return imagToComplex(+num);
    },

    real: function (num) {
        if (num instanceof ComplexNumber) {
            return Ops.real(num._);
        } else {
            return +num;
        }
    },

    imag: function (num) {
        if (num instanceof ComplexNumber) {
            return Ops.real(num._);
        } else {
            return 0;
        }
    },

    add: function (num1, num2) {
        if (num1 instanceof ComplexNumber) {
            num1.add(num2);
        } else if (num2 instanceof ComplexNumber) {
            num2.add(num1);
        } else {
            realToComplex(+num1 + num2);
        }
    },

    sub: function (num1, num2) {
        if (num1 instanceof ComplexNumber) {
            return num1.sub(num2);
        } else if (num2 instanceof ComplexNumber) {
            return new ComplexNumberBase(+num1 - num2.real, -num2.imag);
        } else {
            return realToComplex(+num1 - num2);
        }
    },

    mul: function (num1, num2) {
        if (num1 instanceof ComplexNumber) {
            return num1.mul(num2);
        } else if (num2 instanceof ComplexNumber) {
            return num2.mul(num1);
        } else {
            return realToComplex(+num1 * num2);
        }
    },

    div: function (num1, num2) {
        if (num1 instanceof ComplexNumber) {
            return num1.sub(num2);
        } else if (num2 instanceof ComplexNumber) {
            return new ComplexNumberBase(
                Ops.divComp(realToComplex(+num1), num2._));
        } else {
            return realToComplex(+num1 - num2);
        }
    },

    recip: function (num) {
        if (num instanceof ComplexNumber) {
            return num.recip();
        } else {
            return realToComplex(1 / num);
        }
    },

    arg: function (num) {
        if (num instanceof ComplexNumber) {
            return num.arg();
        } else if (isNaN(num = +num) || num === 0) {
            return complexNaN;
        } else {
            return realToComplex(num > 0 ? 0 : Math.PI);
        }
    },

    abs: function (num) {
        if (num instanceof ComplexNumber) {
            return num.abs();
        } else {
            return realToComplex(Math.abs(+num));
        }
    },

    conj: function (num) {
        if (num instanceof ComplexNumber) {
            return num.conj();
        } else {
            return realToComplex(+num);
        }
    },

    neg: function (num) {
        if (num instanceof ComplexNumber) {
            return num.conj();
        } else {
            return realToComplex(-num);
        }
    },

    exp: function (num) {
        if (num instanceof ComplexNumber) {
            return num.exp();
        } else {
            return realToComplex(Math.exp(+num));
        }
    },

    sin: function (num) {
        if (num instanceof ComplexNumber) {
            return num.sin();
        } else {
            return realToComplex(Math.sin(+num));
        }
    },

    cos: function (num) {
        if (num instanceof ComplexNumber) {
            return num.cos();
        } else {
            return realToComplex(Math.cos(+num));
        }
    },

    tan: function (num) {
        if (num instanceof ComplexNumber) {
            return num.tan();
        } else {
            return realToComplex(Math.tan(+num));
        }
    },

    log: function (num) {
        if (num instanceof ComplexNumber) {
            return num.log();
        } else {
            return realToComplex(Math.log(+num));
        }
    },

    sqrt: function (num) {
        if (num instanceof ComplexNumber) {
            return num.sqrt();
        } else if ((num = +num) >= 0) {
            return realToComplex(Math.sqrt(+num));
        } else {
            return imagToComplex(Math.sqrt(-num));
        }
    },

    sinh: function (num) {
        if (num instanceof ComplexNumber) {
            return num.sinh();
        } else {
            return realToComplex(p.sinh(+num));
        }
    },

    cosh: function (num) {
        if (num instanceof ComplexNumber) {
            return num.cosh();
        } else {
            return realToComplex(p.cosh(num));
        }
    },

    tanh: function (num) {
        if (num instanceof ComplexNumber) {
            return num.tanh();
        } else {
            return realToComplex(p.tanh(num));
        }
    },

    equals: function (num1, num2) {
        if (num1 instanceof ComplexNumber) {
            return num1.equals(num2);
        } else if (num2 instanceof ComplexNumber) {
            return equal(Ops.getReal(num2._), num1) &&
                Ops.getImag(num2._) === 0;
        } else {
            return equal(num1, num2);
        }
    },
});
