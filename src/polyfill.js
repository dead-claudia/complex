"use strict";

// We need some of the ES6 math functions. If they don't exist, we need a
// partial implementation (that assumes numbers). Since these polyfills
// aren't spec-compliant, we don't want to put them on the global object.

function check(original, polyfill) {
    if (typeof original === "function") {
        return original;
    } else {
        return polyfill;
    }
}

module.exports.sinh = check(Math.sinh, function (num) {
    var p = Math.exp(num);
    return (p - 1 / p) / 2;
});

module.exports.cosh = check(Math.cosh, function (num) {
    var p = Math.exp(num);
    return (p + 1 / p) / 2;
});

module.exports.tanh = check(Math.tanh, function (num) {
    var p = Math.exp(num);
    var r = 1 / p;
    return (p + r) / (p - r);
});

module.exports.hypot = check(Math.hypot, function (x, y) {
    if (x < 0) x = -x;
    y /= x;
    return x * Math.sqrt(1 + y * y);
});
