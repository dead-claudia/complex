"use strict";

var ComplexNumber = require("./..");
var expect = require("expect.js");

describe("Binary instance methods", function () {
    var compInst = new ComplexNumber(1, 2);
    var realInst = new ComplexNumber(1, 0);
    var imagInst = new ComplexNumber(0, 2);
    var zeroInst = new ComplexNumber(0, 0);

    var testNumber = 2;
    var testReal = new ComplexNumber(1, 0);
    var testImag = new ComplexNumber(0, 1);
    var testComp = new ComplexNumber(3, 2);
    var testCompZero = new ComplexNumber(0, 0);

    describe("x + y -> x.plus(y)", function () {
        it("should be correct: (1 + 2i) + 2 == (3 + 2i)", function () {
            expect(compInst.plus(testNumber)).to.eql(new ComplexNumber(3, 2));
        });

        it("should be correct: (1 + 2i) + (1 + 0i) == (2 + 2i)", function () {
            expect(compInst.plus(testReal)).to.eql(new ComplexNumber(2, 2));
        });

        it("should be correct: (1 + 2i) + (0 + 1i) == (1 + 3i)", function () {
            expect(compInst.plus(testImag)).to.eql(new ComplexNumber(1, 3));
        });

        it("should be correct: (1 + 2i) + (3 + 2i) == (4 + 4i)", function () {
            expect(compInst.plus(testComp)).to.eql(new ComplexNumber(4, 4));
        });

        it("should be correct: (1 + 2i) + (0 + 0i) == (1 + 2i)", function () {
            expect(compInst.plus(testCompZero)).to.eql(compInst);
        });

        it("should be correct: (1 + 2i) + 0 == (1 + 2i)", function () {
            expect(compInst.plus(0)).to.eql(compInst);
        });

        it("should be correct: (1 + 0i) + 2 == (3 + 0i)", function () {
            expect(realInst.plus(testNumber)).to.eql(new ComplexNumber(3, 0));
        });

        it("should be correct: (1 + 0i) + (1 + 0i) == (2 + 0i)", function () {
            expect(realInst.plus(testReal)).to.eql(new ComplexNumber(2, 0));
        });

        it("should be correct: (1 + 0i) + (0 + 2i) == (1 + 1i)", function () {
            expect(realInst.plus(testImag)).to.eql(new ComplexNumber(1, 1));
        });

        it("should be correct: (1 + 0i) + (3 + 2i) == (4 + 2i)", function () {
            expect(realInst.plus(testComp)).to.eql(new ComplexNumber(4, 2));
        });

        it("should be correct: (1 + 0i) + (0 + 0i) == (1 + 0i)", function () {
            expect(realInst.plus(testCompZero)).to.eql(realInst);
        });

        it("should be correct: (1 + 0i) + 0 == (1 + 0i)", function () {
            expect(realInst.plus(0)).to.eql(realInst);
        });

        it("should be correct: (0 + 2i) + 2 == (2 + 2i)", function () {
            expect(imagInst.plus(testNumber)).to.eql(new ComplexNumber(2, 2));
        });

        it("should be correct: (0 + 2i) + (1 + 0i) == (1 + 2i)", function () {
            expect(imagInst.plus(testReal)).to.eql(new ComplexNumber(1, 2));
        });

        it("should be correct: (0 + 2i) + (0 + 1i) == (0 + 3i)", function () {
            expect(imagInst.plus(testImag)).to.eql(new ComplexNumber(0, 3));
        });

        it("should be correct: (0 + 2i) + (3 + 2i) == (3 + 4i)", function () {
            expect(imagInst.plus(testComp)).to.eql(new ComplexNumber(3, 4));
        });

        it("should be correct: (0 + 2i) + (0 + 0i) == (0 + 2i)", function () {
            expect(imagInst.plus(testCompZero)).to.eql(imagInst);
        });

        it("should be correct: (0 + 2i) + 0 == (0 + 2i)", function () {
            expect(imagInst.plus(0)).to.eql(imagInst);
        });
    });

    describe("x - y -> x.minus(y)", function () {
        it("should be correct: (1 + 2i) - 2 == (-1 + 2i)", function () {
            expect(compInst.minus(testNumber)).to.eql(new ComplexNumber(-1, 2));
        });

        it("should be correct: (1 + 2i) - (1 + 0i) == (0 + 2i)", function () {
            expect(compInst.minus(testReal)).to.eql(new ComplexNumber(0, 2));
        });

        it("should be correct: (1 + 2i) - (0 + 2i) == (1 + 1i)", function () {
            expect(compInst.minus(testImag)).to.eql(new ComplexNumber(1, 1));
        });

        it("should be correct: (1 + 2i) - (3 + 2i) == (-2 + 0i)", function () {
            expect(compInst.minus(testComp)).to.eql(new ComplexNumber(-2, 0));
        });

        it("should be correct: (1 + 2i) - (0 + 0i) == (1 + 2i)", function () {
            expect(compInst.minus(testCompZero)).to.eql(compInst);
        });

        it("should be correct: (1 + 2i) - 0 == (1 + 2i)", function () {
            expect(compInst.minus(0)).to.eql(compInst);
        });

        it("should be correct: (1 + 0i) - 2 == (-1 + 0i)", function () {
            expect(realInst.minus(testNumber)).to.eql(new ComplexNumber(-1, 0));
        });

        it("should be correct: (1 + 0i) - (1 + 0i) == (0 + 0i)", function () {
            expect(realInst.minus(testReal)).to.eql(new ComplexNumber(0, 0));
        });

        it("should be correct: (1 + 0i) - (0 + 2i) == (1 - 1i)", function () {
            expect(realInst.minus(testImag)).to.eql(new ComplexNumber(1, -1));
        });

        it("should be correct: (1 + 0i) - (3 + 2i) == (-2 - 2i)", function () {
            expect(realInst.minus(testComp)).to.eql(new ComplexNumber(-2, -2));
        });

        it("should be correct: (1 + 0i) - (0 + 0i) == (1 + 0i)", function () {
            expect(realInst.minus(testCompZero)).to.eql(realInst);
        });

        it("should be correct: (1 + 0i) - 0 == (1 + 0i)", function () {
            expect(realInst.minus(0)).to.eql(realInst);
        });

        it("should be correct: (0 + 2i) - 2 == (-2 + 2i)", function () {
            expect(imagInst.minus(testNumber)).to.eql(new ComplexNumber(-2, 2));
        });

        it("should be correct: (0 + 2i) - (1 + 0i) == (-1 + 2i)", function () {
            expect(imagInst.minus(testReal)).to.eql(new ComplexNumber(-1, 2));
        });

        it("should be correct: (0 + 2i) - (0 + 2i) == (0 + 1i)", function () {
            expect(imagInst.minus(testImag)).to.eql(new ComplexNumber(0, 1));
        });

        it("should be correct: (0 + 2i) - (3 + 2i) == (-3 + 0i)", function () {
            expect(imagInst.minus(testComp)).to.eql(new ComplexNumber(-3, 0));
        });

        it("should be correct: (0 + 2i) - (0 + 0i) == (0 + 2i)", function () {
            expect(imagInst.minus(testCompZero)).to.eql(imagInst);
        });

        it("should be correct: (0 + 2i) - 0 == (0 + 2i)", function () {
            expect(imagInst.minus(0)).to.eql(imagInst);
        });
    });

    describe("x * y -> x.times(y)", function () {
        it("should be correct: (1 + 2i) * 2 == (2 + 4i)", function () {
            expect(compInst.times(testNumber)).to.eql(new ComplexNumber(2, 4));
        });

        it("should be correct: (1 + 2i) * (1 + 0i) == (1 + 2i)", function () {
            expect(compInst.times(testReal)).to.eql(new ComplexNumber(1, 2));
        });

        it("should be correct: (1 + 2i) * (0 + 2i) == (-2 + 1i)", function () {
            expect(compInst.times(testImag)).to.eql(new ComplexNumber(-2, 1));
        });

        it("should be correct: (1 + 2i) * (3 + 2i) ==", function () {
            expect(compInst.times(testComp)).to.eql(new ComplexNumber(-1, 8));
        });

        it("should be correct: (1 + 2i) * (0 + 0i) == (0 + 0i)", function () {
            expect(compInst.times(testCompZero)).to.eql(zeroInst);
        });

        it("should be correct: (1 + 2i) * 0 == (0 + 0i)", function () {
            expect(compInst.times(0)).to.eql(zeroInst);
        });

        it("should be correct: (1 + 0i) * 2 == (2 + 0i)", function () {
            expect(realInst.times(testNumber)).to.eql(new ComplexNumber(2, 0));
        });

        it("should be correct: (1 + 0i) * (1 + 0i) == (1 + 0i)", function () {
            expect(realInst.times(testReal)).to.eql(new ComplexNumber(1, 0));
        });

        it("should be correct: (1 + 0i) * (0 + 2i) == (0 + 1i)", function () {
            expect(realInst.times(testImag)).to.eql(new ComplexNumber(0, 1));
        });

        it("should be correct: (1 + 0i) * (3 + 2i) == (3 + 2i)", function () {
            expect(realInst.times(testComp)).to.eql(new ComplexNumber(3, 2));
        });

        it("should be correct: (1 + 0i) * (0 + 0i) == (0 + 0i)", function () {
            expect(realInst.times(testCompZero)).to.eql(zeroInst);
        });

        it("should be correct: (1 + 0i) * 0 == (0 + 0i)", function () {
            expect(realInst.times(0)).to.eql(zeroInst);
        });

        it("should be correct: (0 + 2i) * 2 == (0 + 4i)", function () {
            expect(imagInst.times(testNumber)).to.eql(new ComplexNumber(0, 4));
        });

        it("should be correct: (0 + 2i) * (1 + 0i) == (0 + 2i)", function () {
            expect(imagInst.times(testReal)).to.eql(new ComplexNumber(0, 2));
        });

        it("should be correct: (0 + 2i) * (0 + 2i) == (-2 + 0i)", function () {
            expect(imagInst.times(testImag)).to.eql(new ComplexNumber(-2, 0));
        });

        it("should be correct: (0 + 2i) * (3 + 2i) == (-4 + 6i)", function () {
            expect(imagInst.times(testComp)).to.eql(new ComplexNumber(-4, 6));
        });

        it("should be correct: (0 + 2i) * (0 + 0i) == (0 + 0i)", function () {
            expect(imagInst.times(testCompZero)).to.eql(zeroInst);
        });

        it("should be correct: (0 + 2i) * 0 == (0 + 0i)", function () {
            expect(imagInst.times(0)).to.eql(zeroInst);
        });
    });

    describe("x / y -> x.divide(y)", function () {
        it("should be correct: (1 + 2i) / 2 == (0.5 + 1i)", function () {
            expect(compInst.divide(testNumber)).to.eql(new ComplexNumber(0.5, 1));
        });

        it("should be correct: (1 + 2i) / (1 + 0i) == (1 + 2i)", function () {
            expect(compInst.divide(testReal)).to.eql(new ComplexNumber(1, 2));
        });

        it("should be correct: (1 + 2i) / (0 + 2i) == (1 - 0.5i)", function () {
            expect(compInst.divide(testImag)).to.eql(new ComplexNumber(1, -0.5));
        });

        it("should be correct: (1 + 2i) / (3 + 2i) == (1.4 + .8i)", function () {
            expect(compInst.divide(testComp)).to.eql(new ComplexNumber(1.4, 0.8));
        });

        it("should be correct: (1 + 2i) / (0 + 0i) == (NaN + NaN*i)", function () {
            var res = compInst.divide(testCompZero);

            expect(isNaN(res.real)).to.be(true);
            expect(isNaN(res.imag)).to.be(true);
        });

        it("should be correct: (1 + 2i) / 0 == (NaN + NaN*i)", function () {
            expect(compInst.divide(0)).to.eql(new ComplexNumber(NaN, NaN));
        });

        it("should be correct: (1 + 0i) / 2 == (0.5 + 0i)", function () {
            expect(realInst.divide(testNumber)).to.eql(new ComplexNumber(0.5, 0));
        });

        it("should be correct: (1 + 0i) / (1 + 0i) == (1 + 0i)", function () {
            expect(realInst.divide(testReal)).to.eql(new ComplexNumber(1, 0));
        });

        it("should be correct: (1 + 0i) / (0 + 2i) == (0 - 0.5i)", function () {
            expect(realInst.divide(testImag)).to.eql(new ComplexNumber(0, -0.5));
        });

        it("should be correct: (1 + 0i) / (3 + 2i) == (.6 - .4i)", function () {
            expect(realInst.divide(testComp)).to.eql(new ComplexNumber(0.6, -0.4));
        });

        it("should be correct: (1 + 0i) / (0 + 0i) == (NaN + NaN)", function () {
            var res = realInst.divide(testCompZero);

            expect(isNaN(res.real)).to.be(true);
            expect(isNaN(res.imag)).to.be(true);
        });

        it("should be correct: (1 + 0i) / 0 == (NaN + NaN)", function () {
            var res = realInst.divide(0);

            expect(isNaN(res.real)).to.be(true);
            expect(isNaN(res.imag)).to.be(true);
        });

        it("should be correct: (0 + 2i) / 2 == (0 + 1i)", function () {
            expect(imagInst.divide(testNumber)).to.eql(new ComplexNumber(0, 1));
        });

        it("should be correct: (0 + 2i) / (1 + 0i) == (0 + 2i)", function () {
            expect(imagInst.divide(testReal)).to.eql(new ComplexNumber(0, 2));
        });

        it("should be correct: (0 + 2i) / (0 + 2i) == (2 + 0i)", function () {
            expect(imagInst.divide(testImag)).to.eql(new ComplexNumber(2, 0));
        });

        it("should be correct: (0 + 2i) / (3 + 2i) == (.8 - .6i)", function () {
            expect(imagInst.divide(testComp)).to.eql(new ComplexNumber(0.8, -0.6));
        });

        it("should be correct: (0 + 2i) / (0 + 0i) == (NaN + NaN*i)", function () {
            var res = imagInst.divide(testCompZero);

            expect(isNaN(res.real)).to.be(true);
            expect(isNaN(res.imag)).to.be(true);
        });

        it("should be correct: (0 + 2i) / 0 == (NaN + NaN*i)", function () {
            var res = imagInst.divide(0);

            expect(isNaN(res.real)).to.be(true);
            expect(isNaN(res.imag)).to.be(true);
        });
    });

    describe("0 + 0i (special case)", function () {
        describe("x + y -> x.plus(y)", function () {
            it("should be correct: (0 + 0i) + 2 == (2 + 0i)", function () {
                expect(zeroInst.plus(testNumber)).to.eql(new ComplexNumber(testNumber, 0));
            });

            it("should be correct: (0 + 0i) + (1 + 0i) == (1 + 0i)", function () {
                expect(zeroInst.plus(testReal)).to.eql(testReal);
            });

            it("should be correct: (0 + 0i) + (0 + 2i) == (0 + 2i)", function () {
                expect(zeroInst.plus(testImag)).to.eql(testImag);
            });

            it("should be correct: (0 + 0i) + (3 + 2i) == (3 + 2i)", function () {
                expect(zeroInst.plus(testComp)).to.eql(testComp);
            });

            it("should be correct: (0 + 0i) + (0 + 0i) == (0 + 0i)", function () {
                expect(zeroInst.plus(testCompZero)).to.eql(testCompZero);
            });

            it("should be correct: (0 + 0i) + 0 == (0 + 0i)", function () {
                expect(zeroInst.plus(0)).to.eql(zeroInst);
            });
        });
        describe("x - y -> x.minus(y)", function () {
            it("should be correct: (0 + 0i) - 2 == (-2 + 0i)", function () {
                expect(zeroInst.minus(testNumber)).to.eql(new ComplexNumber(-testNumber, 0));
            });

            it("should be correct: (0 + 0i) - (1 + 0i) == (- 1 - 0i)", function () {
                expect(zeroInst.minus(testReal)).to.eql(testReal.negate());
            });

            it("should be correct: (0 + 0i) - (0 + 2i) == (- 0 - 2i)", function () {
                expect(zeroInst.minus(testImag)).to.eql(testImag.negate());
            });

            it("should be correct: (0 + 0i) - (3 + 2i) == (- 3 - 2i)", function () {
                expect(zeroInst.minus(testComp)).to.eql(testComp.negate());
            });

            it("should be correct: (0 + 0i) - (0 + 0i) == (0 + 0i)", function () {
                expect(zeroInst.minus(testCompZero)).to.eql(testCompZero);
            });

            it("should be correct: (0 + 0i) - 0 == (0 + 0i)", function () {
                expect(zeroInst.minus(0)).to.eql(zeroInst);
            });
        });
        describe("x * y -> x.times(y)", function () {
            it("should be correct: (0 + 0i) * 2 == (0 + 0i)", function () {
                expect(zeroInst.times(testNumber)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) * (1 + 0i) == (0 + 0i)", function () {
                expect(zeroInst.times(testReal)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) * (0 + 2i) == (0 + 0i)", function () {
                expect(zeroInst.times(testImag)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) * (3 + 2i) == (0 + 0i)", function () {
                expect(zeroInst.times(testComp)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) * (0 + 0i) == (0 + 0i)", function () {
                expect(zeroInst.times(testCompZero)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) * 0 == (0 + 0i)", function () {
                expect(zeroInst.times(0)).to.eql(zeroInst);
            });
        });
        describe("x / y -> x.divide(y)", function () {
            it("should be correct: (0 + 0i) + 2 == (0 + 0i)", function () {
                expect(zeroInst.divide(testNumber)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) / (1 + 0i) == (0 + 0i)", function () {
                expect(zeroInst.divide(testReal)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) / (0 + 2i) == (0 + 0i)", function () {
                expect(zeroInst.divide(testImag)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) / (3 + 2i) == (0 + 0i)", function () {
                expect(zeroInst.divide(testComp)).to.eql(zeroInst);
            });

            it("should be correct: (0 + 0i) / * (0 + 0i) == (NaN + NaN*i)", function () {
                var res = zeroInst.divide(testCompZero);

                expect(isNaN(res.real)).to.be(true);
                expect(isNaN(res.imag)).to.be(true);
            });

            it("should be correct: (0 + 0i) / * 0 == (NaN + NaN*i)", function () {
                var res = zeroInst.divide(0);

                expect(isNaN(res.real)).to.be(true);
                expect(isNaN(res.imag)).to.be(true);
            });
        });
    });
});
