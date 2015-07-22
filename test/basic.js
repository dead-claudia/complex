"use strict";

var Complex = require("./..");
var expect = require("expect.js");

describe("Basic methods and properties", function () {
    describe("Complex", function () {
        it("should be equivalent to call as a constructor and not", function () {
            /* eslint-disable new-cap */
            expect(new Complex(0, 0).equals(Complex(0, 0))).to.be(true);
            expect(new Complex(1, 0).equals(Complex(1, 0))).to.be(true);
            expect(new Complex(1, 1).equals(Complex(1, 1))).to.be(true);
            expect(new Complex(0, 1).equals(Complex(0, 1))).to.be(true);
            expect(new Complex(-1, 0).equals(Complex(-1, 0))).to.be(true);
            expect(new Complex(-1, -1).equals(Complex(-1, -1))).to.be(true);
            expect(new Complex(0, -1).equals(Complex(0, -1))).to.be(true);
            /* eslint-enable new-cap */
        });

        it("should be independent of the instance", function () {
            expect(new Complex(0, 0).equals(Complex.call({}, 0, 0))).to.be(true);
            expect(new Complex(1, 0).equals(Complex.call({}, 1, 0))).to.be(true);
            expect(new Complex(1, 1).equals(Complex.call({}, 1, 1))).to.be(true);
            expect(new Complex(0, 1).equals(Complex.call({}, 0, 1))).to.be(true);
            expect(new Complex(-1, 0).equals(Complex.call({}, -1, 0))).to.be(true);
            expect(new Complex(-1, -1).equals(Complex.call({}, -1, -1))).to.be(true);
            expect(new Complex(0, -1).equals(Complex.call({}, 0, -1))).to.be(true);
        });
    });

    describe("Complex#real", function () {
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

        shouldHaveReal(new Complex(1, 2), 1);
        shouldHaveReal(new Complex(1, 0), 1);
        shouldHaveReal(new Complex(1, -2), 1);
        shouldHaveReal(new Complex(1, 1), 1);
        shouldHaveReal(new Complex(1, -1), 1);
        shouldHaveReal(new Complex(0, 2), 0);
        shouldHaveReal(new Complex(0, 0), 0);
        shouldHaveReal(new Complex(0, 1), 0);
        shouldHaveReal(new Complex(0, -1), 0);
        shouldHaveReal(new Complex(0, -2), 0);
        shouldHaveReal(new Complex(-1, -2), -1);
        shouldHaveReal(new Complex(-1, 0), -1);
        shouldHaveReal(new Complex(-1, 2), -1);
        shouldHaveReal(new Complex(-1, 1), -1);
        shouldHaveReal(new Complex(-1, -1), -1);
    });

    describe("Complex#imag", function () {
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

        shouldHaveImaginary(new Complex(1, 2), 2);
        shouldHaveImaginary(new Complex(0, 2), 2);
        shouldHaveImaginary(new Complex(-1, 2), 2);
        shouldHaveImaginary(new Complex(1, 1), 1);
        shouldHaveImaginary(new Complex(-1, 1), 1);
        shouldHaveImaginary(new Complex(0, 1), 1);
        shouldHaveImaginary(new Complex(1, 0), 0);
        shouldHaveImaginary(new Complex(0, 0), 0);
        shouldHaveImaginary(new Complex(-1, 0), 0);
        shouldHaveImaginary(new Complex(-1, -2), -2);
        shouldHaveImaginary(new Complex(0, -2), -2);
        shouldHaveImaginary(new Complex(1, -2), -2);
        shouldHaveImaginary(new Complex(1, -1), -1);
        shouldHaveImaginary(new Complex(-1, -1), -1);
        shouldHaveImaginary(new Complex(0, -1), -1);
    });

    describe("Complex#toString", function () {
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
        check("+", "+", "1 + 2i", new Complex(1, 2));
        check("0", "+", "2i", new Complex(0, 2));
        check("+", "0", "1", new Complex(1, 0));
        check("0", "0", "0", new Complex(0, 0));

        /*************/
        /* negatives */
        /*************/
        check("-", "-", "-1 - 2i", new Complex(-1, -2));
        check("0", "-", "-2i", new Complex(0, -2));
        check("-", "0", "-1", new Complex(-1, 0));

        /*******************/
        /* different signs */
        /*******************/
        check("+", "-", "1 - 2i", new Complex(1, -2));
        check("-", "+", "-1 + 2i", new Complex(-1, 2));

        /*********************/
        /* special cases     */
        /* (i.e. i == 1 * i) */
        /*********************/
        check("1", "1", "1 + i", new Complex(1, 1));
        check("1", "-1", "1 - i", new Complex(1, -1));
        check("-1", "1", "-1 + i", new Complex(-1, 1));
        check("-1", "-1", "-1 - i", new Complex(-1, -1));
        check("0", "1", "i", new Complex(0, 1));
        check("0", "-1", "-i", new Complex(0, -1));
        check("-1", "0", "-1", new Complex(-1, 0));
        check("1", "0", "1", new Complex(1, 0));
    });

    describe("Complex#negate", function () {
        function shouldBeNegatedTo(a, b){
            it("should return the negation correctly", function () {
                expect(a.negate()).to.eql(b);
            });
        }

        shouldBeNegatedTo(new Complex(1, 2), new Complex(-1, -2));
        shouldBeNegatedTo(new Complex(0, 2), new Complex(0, -2));
        shouldBeNegatedTo(new Complex(1, 0), new Complex(-1, 0));
        shouldBeNegatedTo(new Complex(0, 0), new Complex(0, 0));

        /*************/
        /* negatives */
        /*************/
        shouldBeNegatedTo(new Complex(-1, -2), new Complex(1, 2));
        shouldBeNegatedTo(new Complex(0, -2), new Complex(0, 2));
        shouldBeNegatedTo(new Complex(-1, 0), new Complex(1, 0));

        /*******************/
        /* different signs */
        /*******************/
        shouldBeNegatedTo(new Complex(1, -2), new Complex(-1, 2));
        shouldBeNegatedTo(new Complex(-1, 2), new Complex(1, -2));

        /*********************/
        /* special cases     */
        /* (i.e. i == 1 * i) */
        /*********************/
        shouldBeNegatedTo(new Complex(1, 1), new Complex(-1, -1));
        shouldBeNegatedTo(new Complex(1, -1), new Complex(-1, 1));
        shouldBeNegatedTo(new Complex(-1, 1), new Complex(1, -1));
        shouldBeNegatedTo(new Complex(-1, -1), new Complex(1, 1));
        shouldBeNegatedTo(new Complex(0, 1), new Complex(0, -1));
        shouldBeNegatedTo(new Complex(0, -1), new Complex(0, 1));
    });
});
