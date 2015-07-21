"use strict";

var ComplexNumber = require("./..");
var expect = require("expect.js");

describe("Basic methods and properties", function () {
    describe("ComplexNumber#real", function () {
        function shouldHaveReal(n, part) {
            var word;
            if (n > 0) {
                word = "positive";
            } else if (n === 0) {
                word = "zero";
            } else {
                word = "negative";
            }

            it("should represent a " + word + " real part correctly", function () {
                expect(n.real).to.be.a("number");
                expect(n.real).to.be(part);
            });
        }

        shouldHaveReal(new ComplexNumber(1, 2), 1);
        shouldHaveReal(new ComplexNumber(1, 0), 1);
        shouldHaveReal(new ComplexNumber(1, -2), 1);
        shouldHaveReal(new ComplexNumber(1, 1), 1);
        shouldHaveReal(new ComplexNumber(1, -1), 1);
        shouldHaveReal(new ComplexNumber(0, 2), 0);
        shouldHaveReal(new ComplexNumber(0, 0), 0);
        shouldHaveReal(new ComplexNumber(0, 1), 0);
        shouldHaveReal(new ComplexNumber(0, -1), 0);
        shouldHaveReal(new ComplexNumber(0, -2), 0);
        shouldHaveReal(new ComplexNumber(-1, -2), -1);
        shouldHaveReal(new ComplexNumber(-1, 0), -1);
        shouldHaveReal(new ComplexNumber(-1, 2), -1);
        shouldHaveReal(new ComplexNumber(-1, 1), -1);
        shouldHaveReal(new ComplexNumber(-1, -1), -1);
    });

    describe("ComplexNumber#imag", function () {
        function shouldHaveImaginary(n, part) {
            var word;
            if (n > 0) {
                word = "positive";
            } else if (n === 0) {
                word = "zero";
            } else {
                word = "negative";
            }

            it("should represent a " + word + " real part correctly", function () {
                expect(n.imag).to.be.a("number");
                expect(n.imag).to.be(part);
            });
        }

        shouldHaveImaginary(new ComplexNumber(1, 2), 2);
        shouldHaveImaginary(new ComplexNumber(0, 2), 2);
        shouldHaveImaginary(new ComplexNumber(-1, 2), 2);
        shouldHaveImaginary(new ComplexNumber(1, 1), 1);
        shouldHaveImaginary(new ComplexNumber(-1, 1), 1);
        shouldHaveImaginary(new ComplexNumber(0, 1), 1);
        shouldHaveImaginary(new ComplexNumber(1, 0), 0);
        shouldHaveImaginary(new ComplexNumber(0, 0), 0);
        shouldHaveImaginary(new ComplexNumber(-1, 0), 0);
        shouldHaveImaginary(new ComplexNumber(-1, -2), -2);
        shouldHaveImaginary(new ComplexNumber(0, -2), -2);
        shouldHaveImaginary(new ComplexNumber(1, -2), -2);
        shouldHaveImaginary(new ComplexNumber(1, -1), -1);
        shouldHaveImaginary(new ComplexNumber(-1, -1), -1);
        shouldHaveImaginary(new ComplexNumber(0, -1), -1);
    });

    describe("ComplexNumber#toString", function () {
        function check(left, right, expected, complex){
            var rep = "(" + left + ", " + right + ")";

            it("should return the correct representation " + rep, function () {
                expect(complex.toString()).to.be.a("string");
                expect(complex.toString()).to.be(expected);
            });
        }

        /*********/
        /* basic */
        /*********/
        check("+", "+", "1 + 2i", new ComplexNumber(1, 2));
        check("0", "+", "2i", new ComplexNumber(0, 2));
        check("+", "0", "1", new ComplexNumber(1, 0));
        check("0", "0", "0", new ComplexNumber(0, 0));

        /*************/
        /* negatives */
        /*************/
        check("-", "-", "-1 - 2i", new ComplexNumber(-1, -2));
        check("0", "-", "-2i", new ComplexNumber(0, -2));
        check("-", "0", "-1", new ComplexNumber(-1, 0));

        /*******************/
        /* different signs */
        /*******************/
        check("+", "-", "1 - 2i", new ComplexNumber(1, -2));
        check("-", "+", "-1 + 2i", new ComplexNumber(-1, 2));

        /*********************/
        /* special cases     */
        /* (i.e. i == 1 * i) */
        /*********************/
        check("1", "1", "1 + i", new ComplexNumber(1, 1));
        check("1", "-1", "1 - i", new ComplexNumber(1, -1));
        check("-1", "1", "-1 + i", new ComplexNumber(-1, 1));
        check("-1", "-1", "-1 - i", new ComplexNumber(-1, -1));
        check("0", "1", "i", new ComplexNumber(0, 1));
        check("0", "-1", "-i", new ComplexNumber(0, -1));
        check("-1", "0", "-1", new ComplexNumber(-1, 0));
        check("1", "0", "1", new ComplexNumber(1, 0));
    });

    describe("ComplexNumber#negate", function () {
        function shouldBeNegatedTo(a, b){
            it("should return the negation correctly", function () {
                expect(a.negate()).to.eql(b);
            });
        }

        shouldBeNegatedTo(new ComplexNumber(1, 2), new ComplexNumber(-1, -2));
        shouldBeNegatedTo(new ComplexNumber(0, 2), new ComplexNumber(0, -2));
        shouldBeNegatedTo(new ComplexNumber(1, 0), new ComplexNumber(-1, 0));
        shouldBeNegatedTo(new ComplexNumber(0, 0), new ComplexNumber(0, 0));

        /*************/
        /* negatives */
        /*************/
        shouldBeNegatedTo(new ComplexNumber(-1, -2), new ComplexNumber(1, 2));
        shouldBeNegatedTo(new ComplexNumber(0, -2), new ComplexNumber(0, 2));
        shouldBeNegatedTo(new ComplexNumber(-1, 0), new ComplexNumber(1, 0));

        /*******************/
        /* different signs */
        /*******************/
        shouldBeNegatedTo(new ComplexNumber(1, -2), new ComplexNumber(-1, 2));
        shouldBeNegatedTo(new ComplexNumber(-1, 2), new ComplexNumber(1, -2));

        /*********************/
        /* special cases     */
        /* (i.e. i == 1 * i) */
        /*********************/
        shouldBeNegatedTo(new ComplexNumber(1, 1), new ComplexNumber(-1, -1));
        shouldBeNegatedTo(new ComplexNumber(1, -1), new ComplexNumber(-1, 1));
        shouldBeNegatedTo(new ComplexNumber(-1, 1), new ComplexNumber(1, -1));
        shouldBeNegatedTo(new ComplexNumber(-1, -1), new ComplexNumber(1, 1));
        shouldBeNegatedTo(new ComplexNumber(0, 1), new ComplexNumber(0, -1));
        shouldBeNegatedTo(new ComplexNumber(0, -1), new ComplexNumber(0, 1));
    });
});
