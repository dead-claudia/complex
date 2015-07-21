/* eslint-disable no-self-compare */

"use strict";

var p = require("./polyfill.js");
var SIMD = require("simd");

var F = SIMD.Float32x4;
var B = SIMD.Bool32x4;

var scalar0 = F.splat(0);
var scalarNaN = F.splat(NaN);

function anyIsNaN(a) {
    return B.anyTrue(F.notEqual(a, a));
}

module.exports.equal = function (a, b) {
    // Load both pairs into a single vector
    a = F.shuffle(a, b, 0, 1, 4, 5);

    // Make a second version of the above, swapped
    b = F.swizzle(a, 2, 3, 0, 1);

    // Test that the swapped and normal one are equivalent, or that they are
    // both NaNs (only one field is needed).
    return B.allTrue(F.equal(a, b)) || anyIsNaN(a);
};

// .real

module.exports.getReal = function (x) {
    return F.extractLane(x, 0);
};

// .imag

module.exports.getImag = function (x) {
    return F.extractLane(x, 1);
};

// .conj

var scalar1_n1 = F(1, -1, 1, 1);

module.exports.conjComp = function (x) {
    return F.mul(x, scalar1_n1);
};

// .add

module.exports.addNum = function (x, y) {
    return F.add(x, F(y, 0, 0, 0));
};

module.exports.addComp = function (x, y) {
    return F.add(x, y);
};

// .sub

module.exports.subNum = function (x, y) {
    return F.sub(x, F(y, 0, 0, 0));
};

module.exports.subComp = function (x, y) {
    return F.sub(x, y);
};

// .mul

module.exports.mulNum = function (x, y) {
    return F.mul(x, F.splat(y));
};

function mulComp(x, y) {
    var a = F.swizzle(x, 0, 1, 0, 1);
    var b = F.swizzle(y, 0, 1, 1, 0);
    var c = F.mul(F.mul(a, b), scalar1_n1);
    return F.add(c, F.swizzle(c, 2, 3, 0, 1));
}
module.exports.mulComp = mulComp;

var scalar1 = F.splat(1);

// .recip

function recip(x, y) {
    /*
     *     a           sign(a)          sign(b)
     * -------- = --------------- + --------------- i
     *  a + bi     (1 + (a/b)^2)     (1 + (b/a)^2)
     */
    var sign = B.sub(F.greaterThan(x, scalar0), F.lessThan(x, scalar0));
    var divisor = F.div(x, y);
    return F.div(sign, F.add(scalar1, F.mul(divisor, divisor)));
}

module.exports.recipComp = function (x) {
    var y = F.swizzle(x, 1, 0, 0, 0);
    if (anyIsNaN(y)) {
        return scalarNaN;
    } else {
        return recip(x, y);
    }
};

// .div

module.exports.divNum = function (x, y) {
    var divisor = F.splat(y);
    if (anyIsNaN(F.shuffle(x, divisor, 0, 1, 4, 4))) {
        return scalarNaN;
    } else {
        return F.div(x, y);
    }
};

function divComp(x, y) {
    if (anyIsNaN(F.shuffle(x, y, 0, 1, 4, 5))) {
        return scalarNaN;
    }

    var z = F.swizzle(y, 1, 0, 0, 0);
    var check = F.equal(z, scalar0);

    if (B.allTrue(check)) {
        return scalarNaN;
    }

    if (B.anyTrue(check)) {
        // (a + bi) / c
        // (a + bi) / di

        // The imaginary/real pairs are flipped.
        var imag = F.extractLane(z, 0);

        if (imag !== 0) {
            x = F.mul(F.swizzle(x, 1, 0, 0, 0), scalar1_n1);
            imag = F.extractLane(z, 1);
        }

        return F.div(x, F.splat(imag));
    }

    x = F.swizzle(x, 0, 1, 0, 0);
    y = recip(y, z);

    if (B.anyTrue(F.equal(x, scalar0))) {
        // a / (c + di)
        // bi / (c + di)
        var scale = F.splat(F.extractLane(x, 0) || -F.extractLane(x, 1));
        return F.div(scale, y);
    } else {
        return mulComp(x, y);
    }
}
module.exports.divComp = divComp;

// .arg

module.exports.argComp = function (x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return NaN;
    return Math.atan2(imag, real);
};

// .abs

module.exports.absComp = function (x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return NaN;
    return p.hypot(real, imag);
};

// .negate

module.exports.negComp = F.neg;

// .exp

module.exports.expComp = function (x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;
    return F.mul(
        F(Math.cos(imag), Math.sin(imag), 0, 0),
        F.splat(Math.exp(real)));
};

// .sin

module.exports.sinComp = function (x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;
    if (imag === 0) return F(Math.sin(real), 0, 0, 0);
    return F.mul(
        F(Math.sin(real), Math.cos(real), 0, 0),
        F(p.cosh(imag), p.sinh(imag), 0, 0));
};

// .cos

module.exports.cosComp = function (x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;
    if (imag === 0) return F(Math.cos(real), 0, 0, 0);
    return F.mul(
        F(Math.cos(real), Math.sin(real), 0, 0),
        F(p.cosh(imag), p.sinh(imag), 0, 0));
};

// .tan

var scalar2 = F.splat(2);

module.exports.tanComp = function (x) {
    if (anyIsNaN(F.swizzle(x, 0, 1, 0, 0))) return scalarNaN;

    x = F.mul(x, scalar2);

    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (imag === 0) return F(Math.cos(real), 0, 0, 0);
    if (real === 0) return F(0, p.tanh(imag), 0, 0);
    var scale = F.splat(Math.cos(real) + p.cosh(imag));
    return F.div(F(Math.sin(real), p.sinh(imag), 0, 0), scale);
};

// .log

module.exports.logComp = function (x) {
    // Inlined argComp and absComp, since they only do one function call for
    // non-NaNs.
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;

    if (imag !== 0) {
        var tmp = imag;
        imag = Math.atan2(imag, real);
        real = p.hypot(real, tmp);
    }

    return F(Math.log(real), imag, 0, 0);
};

// .sqrt

module.exports.sqrtComp = function (x) {
    // Inlined argComp and absComp, since they only do one function call for
    // non-NaNs.
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;

    var scale = F.splat(p.hypot(real, imag));
    var angle = Math.atan2(imag, real) / 2;
    return F.mul(scale, F(Math.cos(angle), Math.sin(angle), 0, 0));
};

// .sinh

module.exports.sinhComp = function sinhComp(x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;
    if (imag === 0) return F(p.sinh(real), 0, 0, 0);
    if (real === 0) return F(0, Math.sin(imag), 0, 0);
    return F.mul(
        F(p.sinh(real), Math.sin(imag), 0, 0),
        F(Math.cos(imag), p.cosh(real), 0, 0));
};

// .cosh

module.exports.coshComp = function coshComp(x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;
    if (imag === 0) return F(p.cosh(real), 0, 0, 0);
    if (real === 0) return F(Math.cos(imag), 0, 0, 0);
    return F.mul(
        F(p.cosh(real), p.sinh(real), 0, 0),
        F(Math.cos(imag), Math.sin(imag)));
};

// .tanh

module.exports.tanhComp = function tanhComp(x) {
    var real = F.extractLane(x, 0);
    var imag = F.extractLane(x, 1);

    if (real !== real || imag !== imag) return scalarNaN;
    if (imag === 0) return F(p.cosh(real), 0, 0, 0);
    if (real === 0) return F(Math.cos(imag), 0, 0, 0);
    var scale = F.splat(p.cosh(real) + Math.cos(imag));
    return F.div(F(p.sinh(real), Math.sin(imag), 0, 0), scale);
};
