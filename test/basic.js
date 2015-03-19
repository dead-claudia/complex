'use strict';

var ComplexNumber = require('..').ComplexNumber;
var expect = require('expect.js');

describe('Basic methods and properties', function () {
    describe('ComplexNumber#real', function () {
        it('should reporesent the positive real part correctly', function () {
            var test = new ComplexNumber(1, 2);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(1);
        });

        it('should reporesent the positive real part correctly', function () {
            var test = new ComplexNumber(1, 0);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(1);
        });

        it('should reporesent the positive real part correctly', function () {
            var test = new ComplexNumber(1, -2);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(1);
        });

        it('should reporesent the positive real part correctly', function () {
            var test = new ComplexNumber(1, 1);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(1);
        });

        it('should reporesent the positive real part correctly', function () {
            var test = new ComplexNumber(1, -1);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(1);
        });

        it('should represent a zero real part correctly', function () {
            var test = new ComplexNumber(0, 2);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(0);
        });

        it('should represent a zero real part correctly', function () {
            var test = new ComplexNumber(0, 0);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(0);
        });

        it('should represent a zero real part correctly', function () {
            var test = new ComplexNumber(0, 1);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(0);
        });

        it('should represent a zero real part correctly', function () {
            var test = new ComplexNumber(0, -1);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(0);
        });

        it('should represent a zero real part correctly', function () {
            var test = new ComplexNumber(0, -2);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(0);
        });

        it('should represent a negative real part correctly', function () {
            var test = new ComplexNumber(-1, -2);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(-1);
        });

        it('should represent a negative real part correctly', function () {
            var test = new ComplexNumber(-1, 0);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(-1);
        });

        it('should represent a negative real part correctly', function () {
            var test = new ComplexNumber(-1, 2);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(-1);
        });

        it('should represent a negative real part correctly', function () {
            var test = new ComplexNumber(-1, 1);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(-1);
        });

        it('should represent a negative real part correctly', function () {
            var test = new ComplexNumber(-1, -1);
            expect(test.real).to.be.a('number');
            expect(test.real).to.be(-1);
        });
    });

    describe('ComplexNumber#imag', function () {
        it('should represent a positive imaginary part correctly', function () {
            var test = new ComplexNumber(1, 2);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(2);
        });

        it('should represent a positive imaginary part correctly', function () {
            var test = new ComplexNumber(0, 2);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(2);
        });

        it('should represent a positive imaginary part correctly', function () {
            var test = new ComplexNumber(-1, 2);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(2);
        });

        it('should represent a positive imaginary part correctly', function () {
            var test = new ComplexNumber(1, 1);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(1);
        });

        it('should represent a positive imaginary part correctly', function () {
            var test = new ComplexNumber(-1, 1);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(1);
        });

        it('should represent a positive imaginary part correctly', function () {
            var test = new ComplexNumber(0, 1);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(1);
        });

        it('should represent a zero imaginary part correctly', function () {
            var test = new ComplexNumber(1, 0);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(0);
        });

        it('should represent a zero imaginary part correctly', function () {
            var test = new ComplexNumber(0, 0);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(0);
        });

        it('should represent a zero imaginary part correctly', function () {
            var test = new ComplexNumber(-1, 0);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(0);
        });

        it('should represent a negative imaginary part correctly', function () {
            var test = new ComplexNumber(-1, -2);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(-2);
        });

        it('should represent a negative imaginary part correctly', function () {
            var test = new ComplexNumber(0, -2);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(-2);
        });

        it('should represent a negative imaginary part correctly', function () {
            var test = new ComplexNumber(1, -2);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(-2);
        });

        it('should represent a negative imaginary part correctly', function () {
            var test = new ComplexNumber(1, -1);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(-1);
        });

        it('should represent a negative imaginary part correctly', function () {
            var test = new ComplexNumber(-1, -1);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(-1);
        });

        it('should represent a negative imaginary part correctly', function () {
            var test = new ComplexNumber(0, -1);
            expect(test.imag).to.be.a('number');
            expect(test.imag).to.be(-1);
        });
    });

    describe('ComplexNumber#toString', function () {
        /*********/
        /* basic */
        /*********/
        it('should return the correct representation (+, +)', function () {
            var test = new ComplexNumber(1, 2);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('1 + 2i');
        });

        it('should return the correct representation (0, +)', function () {
            var test = new ComplexNumber(0, 2);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('2i');
        });

        it('should return the correct representation (+, 0)', function () {
            var test = new ComplexNumber(1, 0);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('1');
        });

        it('should return the correct representation (0, 0)', function () {
            var test = new ComplexNumber(0, 0);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('0');
        });

        /*************/
        /* negatives */
        /*************/
        it('should return the correct representation (-, -)', function () {
            var test = new ComplexNumber(-1, -2);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-1 - 2i');
        });

        it('should return the correct representation (0, -)', function () {
            var test = new ComplexNumber(0, -2);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-2i');
        });

        it('should return the correct representation (-, 0)', function () {
            var test = new ComplexNumber(-1, 0);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-1');
        });

        /*******************/
        /* different signs */
        /*******************/
        it('should return the correct representation (+, -)', function () {
            var test = new ComplexNumber(1, -2);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('1 - 2i');
        });

        it('should return the correct representation (-, +)', function () {
            var test = new ComplexNumber(-1, 2);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-1 + 2i');
        });

        /*********************/
        /* special cases     */
        /* (i.e. i == 1 * i) */
        /*********************/
        it('should return the correct representation (1, 1)', function () {
            var test = new ComplexNumber(1, 1);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('1 + i');
        });

        it('should return the correct representation (1, -1)', function () {
            var test = new ComplexNumber(1, -1);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('1 - i');
        });

        it('should return the correct representation (-1, 1)', function () {
            var test = new ComplexNumber(-1, 1);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-1 + i');
        });

        it('should return the correct representation (-1, -1)', function () {
            var test = new ComplexNumber(-1, -1);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-1 - i');
        });

        it('should return the correct representation (0, 1)', function () {
            var test = new ComplexNumber(0, 1);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('i');
        });

        it('should return the correct representation (0, -1)', function () {
            var test = new ComplexNumber(0, -1);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-i');
        });

        it('should return the correct representation (-1, 0)', function () {
            var test = new ComplexNumber(-1, 0);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('-1');
        });

        it('should return the correct representation (1, 0)', function () {
            var test = new ComplexNumber(1, 0);
            expect(test.toString()).to.be.a('string');
            expect(test.toString()).to.be('1');
        });
    });

    describe('ComplexNumber#negate', function () {
        it('should return the negation correctly', function () {
            var test = new ComplexNumber(1, 2);
            expect(test.negate()).to.eql(new ComplexNumber(-1, -2));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(0, 2);
            expect(test.negate()).to.eql(new ComplexNumber(0, -2));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(1, 0);
            expect(test.negate()).to.eql(new ComplexNumber(-1, 0));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(0, 0);
            expect(test.negate()).to.eql(new ComplexNumber(0, 0));
        });

        /*************/
        /* negatives */
        /*************/
        it('should return the negation correctly', function () {
            var test = new ComplexNumber(-1, -2);
            expect(test.negate()).to.eql(new ComplexNumber(1, 2));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(0, -2);
            expect(test.negate()).to.eql(new ComplexNumber(0, 2));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(-1, 0);
            expect(test.negate()).to.eql(new ComplexNumber(1, 0));
        });

        /*******************/
        /* different signs */
        /*******************/
        it('should return the negation correctly', function () {
            var test = new ComplexNumber(1, -2);
            expect(test.negate()).to.eql(new ComplexNumber(-1, 2));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(-1, 2);
            expect(test.negate()).to.eql(new ComplexNumber(1, -2));
        });

        /*********************/
        /* special cases     */
        /* (i.e. i == 1 * i) */
        /*********************/
        it('should return the negation correctly', function () {
            var test = new ComplexNumber(1, 1);
            expect(test.negate()).to.eql(new ComplexNumber(-1, -1));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(1, -1);
            expect(test.negate()).to.eql(new ComplexNumber(-1, 1));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(-1, 1);
            expect(test.negate()).to.eql(new ComplexNumber(1, -1));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(-1, -1);
            expect(test.negate()).to.eql(new ComplexNumber(1, 1));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(0, 1);
            expect(test.negate()).to.eql(new ComplexNumber(0, -1));
        });

        it('should return the negation correctly', function () {
            var test = new ComplexNumber(0, -1);
            expect(test.negate()).to.eql(new ComplexNumber(0, 1));
        });
    });
});
