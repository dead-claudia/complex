Complex.js
==========

A basic, single-precision floating point complex number implementation in JavaScript, powered by SIMD.js.

```js
var Complex = require("complex");
```

If you find a bug, please file it in the issue tracker, or, even better, open up a PR. Make sure to run `gulp test` first.

*Note that the test suite is currently incomplete, but I'm most certainly open to PRs on that, too.*

---

Instances of `Complex` are immutable, and locked with `Object.freeze`.

### `Complex(real: number, imaginary: number)`
### `new Complex(real: number, imaginary: number)`

`real` is the real part, `imaginary`  is the imaginary part

### Instance Methods

-   `complex.real: number`

    The real part of this complex number.

-   `complex.imag: number`

    The imaginary part of this complex number.

-   `complex.toString(): string`

    Get this complex number serialized as a string. (e.g. `1 + 2i`)

-   `complex.toJSON(): [number, number]`

    Get this complex number's JSON representation.

-   `complex.add(num: number | Complex): Complex`

    Add `num` to this complex number. Analogous to `a + b`.

-   `complex.sub(num: number | Complex): Complex`

    Subtract `num` from this complex number. Analogous to `a - b`.

-   `complex.mul(num: number | Complex): Complex`

    Multiply `num` with this complex number. Analogous to `a * b`.

-   `complex.sub(num: number | Complex): Complex`

    Divide this complex number by `num`. Analogous to `a / b`.

-   `complex.recip(): Complex`

    Get the reciprocal of this complex number. Analogous to `1 / a`.

-   `complex.arg(): number`

    Get the argument of this complex number, i.e. `Math.atan2(this.real, this.imag)`

-   `complex.abs(): number`

    Get the absolute value (modulus) of this value, i.e. `Math.hypot(this.real, this.imag)`. Similar to `Math.abs(a)`.

-   `complex.conj(): Complex`

    Get the conjugate of this complex number, i.e. `a + bi -> a - bi`

-   `complex.neg(): Complex`

    Multiply this number by -1. Analogous to `-a`.

-   `complex.exp(): Complex`

    Get *e*<sup>*x*</sup>, where *x* is this complex number. Analogous to `Math.exp(a)`.

-   `complex.sin(): Complex`

    Get the sine of this complex number. Analogous to `Math.sin(a)`.

-   `complex.cos(): Complex`

    Get the cosine of this complex number. Analogous to `Math.cos(a)`.

-   `complex.tan(): Complex`

    Get the tangent of this complex number. Analogous to `Math.tan(a)`.

-   `complex.log(): Complex`

    Get the natural logarithm (base *e*) of this complex number. Analogous to `Math.log(a)`.

-   `complex.sqrt(): Complex`

    Get the square root of this complex number. Analogous to `Math.sqrt(a)`.

-   `complex.sinh(): Complex`

    Get the hyperbolic sine of this complex number. Analogous to `Math.sinh(a)` in ES2015.

-   `complex.cosh(): Complex`

    Get the hyperbolic cosine of this complex number. Analogous to `Math.cosh(a)` in ES2015.

-   `complex.tanh(): Complex`

    Get the hyperbolic tangent of this complex number. Analogous to `Math.tanh(a)` in ES2015.

-   `complex.equals(num: number | Complex): boolean`

    Check to see if these two numbers are equivalent. Note that it works logically, i.e. `Complex(1, 0).equals(1)` returns true.

### Static methods

All of the instance methods, except for `toString` and `toJSON` have corresponding methods, and they work like this:

```js
// Unary method
Complex.recip(num: number | Complex): Complex;
Complex.abs(num: number | Complex): number;

// Binary method
Complex.add(num1: number | Complex, num2: number | Complex): Complex;
Complex.equals(num1: number | Complex, num2: number | Complex): boolean;
```

They work on real numbers as well as complex numbers, and they work logically:

```js
Complex.add(1, 2) -> Complex(3, 0)
Complex.add(Complex(1, 0), 2) -> Complex(3, 0)
Complex.add(1, Complex(2, 0)) -> Complex(3, 0)
```

You can also use them as `map`, `reduce`, etc. functions without binding them (and that's why they exist):

```js
// nums is a list of possibly complex numbers
var sum = nums.reduce(Complex.add);
```

Other functions include:

-   `Complex.from(num: number | Complex): Complex`<br>
    `Complex.fromReal(num: number | Complex): Complex`

    Convert this (possibly complex) number into a complex number instance. Both forms are equivalent.

-   `Complex.fromImag(num: number | Complex): Complex`

    Make this the imaginary part of a (possibly) complex number. It effectively multiplies `num` with the imaginary unit, and that is the behavior when passing a complex number as an argument.

-   `Complex.real(num: number | Complex): number`

    Get the real part of a (possibly) complex number.

-   `Complex.imag(num: number | Complex): number`

    Get the imaginary part of a (possibly) complex number. For real numbers, this always returns 0.
