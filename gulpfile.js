"use strict";

var gulp = require("gulp");
var mocha = require("gulp-mocha");
var eslint = require("gulp-eslint");

gulp.task("lint", function () {
    return gulp.src(["**/*.js", "!node_modules"]).pipe(eslint());
});

gulp.task("test", ["lint"], function () {
    return gulp.src("test/**").pipe(mocha());
});
