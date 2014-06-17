var type = {}.toString.call;

function e(errType) {
  switch (errType) {
  case 'testbug': return 'Incorrect type for required answer. Likely a bug in the unit test.';
  case 'typeof': return 'Incorrect internal constructor type assigned.';
  case 'type': return 'Incorrect type for found answer.';
  case 'num': return 'Incorrect numerical value.';
  case 'real': return 'Incorrect real part.';
  case 'imag': return 'Incorrect imaginary part.';
  case 'string': return 'Incorrect string value.';
  default: return 'assert.js: Error: No such error type is suported.';
  }
}

function m(errType, req, found) {
  if (errType === 'string') {
    req = '"' + req + '"';
    found = '"' + found + '"';
  }
  return e(errType) +
         '\nExpected: ' + req +
         '\nFound: ' + found +
         '\nFunction: ' + fn;
}

function fail(errType, req, found, fn) {
  throw new Error(m(errType, req, found, fn));
}

function assertNum(numType, found, req, fn) {
  if (found === req) return;
  // check for NaN
  if (found !== found && req !== req) return;
  fail(numType, req, found, fn);
}

exports.assert = function (found, req, reqType, fn) {
  if (reqType === 'typeof') {
    if (type(found) !== req) fail(reqType, req, found, fn);
    return;
  }
  reqType = '[object ' + reqType + ']';
  if (type(req) !== reqType) fail('testbug', req, found, fn);
  if (type(found) !== reqType) fail('type', reqType, type(found), fn);
  if (reqType === '[object Number]') return assertNum('num', found, req, fn);
  if (reqType === '[object String]') {
    if (found !== req) fail('string', req, found, fn);
    return;
  }
  if (reqType === '[object ComplexNumber]') {
    assertNum('real', found.real, req.real, fn);
    assertNum('imag', found.imag, req.imag, fn);
  }
}