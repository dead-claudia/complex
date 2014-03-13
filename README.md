Complex.js
==========

Complex number implementation in Javascript

The source is in complex.js, and the latest stable minified
version is in complex.min.js. The minified library is built
using the Closure Compiler.

This code is licensed with the GNU GPL v3 or later. Preference
goes to the license.

**NOTE:** The file complex.es6.js is written in ECMAScript 6,
and is not meant for standard use currently.

-----

## Documentation ##

### Key: ###

 - *argument* - an argument
 - (SomeClass) *argument* - an argument of type SomeClass
 - (ClassOne|ClassTwo) - either of type ClassOne or ClassTwo
 - **method**() - a method

### Constructor: ###

- **ComplexNumber**(*real*, *imaginary*)
   
  - (Number) *real* - real part
  - (Number) *imaginary* - imaginary part
  - Note: Instances of this class are immutable. None of the properties can be changed or added to.

### Properties: ###

- **ComplexNumber.real** - real part
  
  ***Returns:*** `Number`

- **ComplexNumber.imag** - imaginary part
  
  ***Returns:*** `Number`

- **ComplexNumber.prototype.length**
  
  ***Returns:*** `Number`
  The length of this class is always 2.

### Methods: ###

- **.toString**() - stringifies it to the form `'a + bi'`
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `String`

- **.plus**(*num*) - adds a number to a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  - (ComplexNumber|Number) *num* - the number to add
  
  ***Returns:*** `String`

- **.minus**(*num*) - subtracts a number from a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  - (ComplexNumber|Number) *num* - the number to subtract
  
  ***Returns:*** `ComplexNumber`

- **.times**(*num*) - multiplies a number with a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  - (ComplexNumber|Number) *num* - the number to multiply
  
  ***Returns:*** `ComplexNumber`

- **.divide**(*num*) - divides a number from a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  - (ComplexNumber|Number) *num* - the number to divide
  
  ***Returns:*** `ComplexNumber`

- **.recip**() - returns the reciprocal of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.arg**() - returns the angle/argument of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `Number`

- **.abs**() - returns the absolute value/modulus of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `Number`

- **.conj**() - returns the conjugate of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.negate**() - returns the negative of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.exp**() - returns *e* raised to the power of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.sin**() - returns the sine of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.cos**() - returns the cosine of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.tan**() - returns the tangent of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.log**() - returns the logarithm of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.sqrt**() - returns the square root of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.sinh**() - returns the hyperbolic sine of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.cosh**() - returns the hyperbolic cosine of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **.tanh**() - returns the hyperbolic tangent of a ComplexNumber
  
  ***Arguments:***
  
  - *this* - a ComplexNumber instance
  
  ***Returns:*** `ComplexNumber`

- **ComplexNumber.realToComplex**(*real*) - static method to convert a real
  number to a ComplexNumber instance
  
  ***Arguments:***
  
  - *real* - the real number to convert
  
  ***Returns:*** `ComplexNumber`

- **ComplexNumber.imagToComplex**(*imaginary*) - static method to convert an
  imaginary number to a ComplexNumber instance
  
  ***Arguments:***
  
  - *real* - the coefficient of the imaginary number to convert
  
  ***Returns:*** `ComplexNumber`
