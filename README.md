Complex.js
==========

Complex number implementation in Javascript

The source is in complex.js, and the latest stable minified
source will be in complex.min.js once ready.

The minified source will is built using the Closure Compiler.

This code is licensed with the GNU GPL v3 or later. Preference
goes to the licensee.

<strong>NOTE: The file complex.es6.js is written in ECMAScript 6,
and is not the version meant for standard use.</strong>

-----

Here's some documentation for each of the methods:

**Constructor:**

 - ComplexNumber(*real*, *imaginary*)
   
   - (Number) *real* - real part
   - (Number) *imaginary* - imaginary part
   - Note: Instances of this class are immutable.

**Properties:**

 - *ComplexNumber*.real - real part
 - *ComplexNumber*.imag - imaginary part
 - *ComplexNumber*.prototype.length - The length of this class is always 2.

**Methods:**

 - .toString() - stringifies it to the form `'a + bi'`
